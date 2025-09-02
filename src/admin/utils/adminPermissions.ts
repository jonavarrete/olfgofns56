import { AdminUser, AdminPermission } from '../../types/admin';

export const ADMIN_PERMISSIONS: AdminPermission[] = [
  // User Management
  { id: 'users.view', name: 'Ver Usuarios', description: 'Ver lista y detalles de usuarios', category: 'users' },
  { id: 'users.create', name: 'Crear Usuarios', description: 'Crear nuevas cuentas de usuario', category: 'users' },
  { id: 'users.edit', name: 'Editar Usuarios', description: 'Modificar datos de usuarios existentes', category: 'users' },
  { id: 'users.delete', name: 'Eliminar Usuarios', description: 'Eliminar cuentas de usuario', category: 'users' },
  { id: 'users.ban', name: 'Banear Usuarios', description: 'Banear y suspender usuarios', category: 'users' },
  { id: 'users.timeline', name: 'Ver Timeline', description: 'Acceder al historial de actividad de usuarios', category: 'users' },

  // Content Management
  { id: 'content.view', name: 'Ver Contenido', description: 'Ver misiones, razas alienígenas y noticias', category: 'content' },
  { id: 'content.create', name: 'Crear Contenido', description: 'Crear nuevo contenido del juego', category: 'content' },
  { id: 'content.edit', name: 'Editar Contenido', description: 'Modificar contenido existente', category: 'content' },
  { id: 'content.delete', name: 'Eliminar Contenido', description: 'Eliminar contenido del juego', category: 'content' },
  { id: 'content.publish', name: 'Publicar Contenido', description: 'Publicar contenido en el juego', category: 'content' },

  // Security
  { id: 'security.view', name: 'Ver Seguridad', description: 'Ver logs y reportes de seguridad', category: 'security' },
  { id: 'security.manage', name: 'Gestionar Seguridad', description: 'Gestionar violaciones y penalizaciones', category: 'security' },
  { id: 'security.ban_ip', name: 'Banear IPs', description: 'Banear direcciones IP', category: 'security' },
  { id: 'security.penalties', name: 'Aplicar Penalizaciones', description: 'Aplicar penalizaciones a usuarios', category: 'security' },

  // System
  { id: 'system.config', name: 'Configurar Sistema', description: 'Modificar configuración de la plataforma', category: 'system' },
  { id: 'system.universes', name: 'Gestionar Universos', description: 'Crear y modificar universos', category: 'system' },
  { id: 'system.apis', name: 'Gestionar APIs', description: 'Configurar APIs externas', category: 'system' },
  { id: 'system.backup', name: 'Gestionar Backups', description: 'Crear y restaurar backups', category: 'system' },

  // Communication
  { id: 'comm.messages', name: 'Mensajes Globales', description: 'Enviar mensajes globales', category: 'communication' },
  { id: 'comm.email', name: 'Email Masivo', description: 'Enviar emails masivos', category: 'communication' },
  { id: 'comm.telegram', name: 'Bot Telegram', description: 'Gestionar bot de Telegram', category: 'communication' },
  { id: 'comm.templates', name: 'Plantillas', description: 'Crear y gestionar plantillas', category: 'communication' },
];

export class AdminPermissions {
  static getRolePermissions(role: AdminUser['role']): string[] {
    switch (role) {
      case 'super_admin':
        return ADMIN_PERMISSIONS.map(p => p.id);
      
      case 'admin':
        return ADMIN_PERMISSIONS
          .filter(p => !['system.backup', 'system.config'].includes(p.id))
          .map(p => p.id);
      
      case 'moderator':
        return ADMIN_PERMISSIONS
          .filter(p => p.category === 'users' || p.category === 'security' || p.category === 'communication')
          .filter(p => !['users.delete', 'security.ban_ip'].includes(p.id))
          .map(p => p.id);
      
      case 'support':
        return ADMIN_PERMISSIONS
          .filter(p => ['users.view', 'users.timeline', 'comm.messages'].includes(p.id))
          .map(p => p.id);
      
      default:
        return [];
    }
  }

  static hasPermission(admin: AdminUser, permission: string): boolean {
    const rolePermissions = this.getRolePermissions(admin.role);
    return rolePermissions.includes(permission);
  }

  static canAccessSection(admin: AdminUser, section: string): boolean {
    const sectionPermissions = {
      users: ['users.view'],
      content: ['content.view'],
      security: ['security.view'],
      communication: ['comm.messages'],
      system: ['system.config'],
    };

    const requiredPermissions = sectionPermissions[section as keyof typeof sectionPermissions] || [];
    return requiredPermissions.some(permission => this.hasPermission(admin, permission));
  }

  static getPermissionsByCategory(category: AdminPermission['category']): AdminPermission[] {
    return ADMIN_PERMISSIONS.filter(p => p.category === category);
  }

  static validateAction(admin: AdminUser, action: string, targetUserId?: string): { allowed: boolean; reason?: string } {
    if (!this.hasPermission(admin, action)) {
      return { allowed: false, reason: 'Permisos insuficientes' };
    }

    // Additional validation for sensitive actions
    if (action === 'users.delete' && admin.role !== 'super_admin') {
      return { allowed: false, reason: 'Solo super administradores pueden eliminar usuarios' };
    }

    if (action === 'system.config' && admin.role !== 'super_admin') {
      return { allowed: false, reason: 'Solo super administradores pueden modificar la configuración del sistema' };
    }

    // Prevent self-targeting for certain actions
    if (targetUserId === admin.id && ['users.ban', 'users.delete'].includes(action)) {
      return { allowed: false, reason: 'No puedes aplicar esta acción a tu propia cuenta' };
    }

    return { allowed: true };
  }
}