import { AdminNotification } from '../../types/admin';

export class NotificationGenerator {
  private static notificationTemplates = {
    security: [
      {
        title: 'Múltiples Intentos de Login Fallidos',
        messageTemplate: 'IP {ip} ha realizado {attempts} intentos fallidos en {timespan} minutos',
        priority: 'high' as const,
        actionRequired: true
      },
      {
        title: 'Actividad de Bot Detectada',
        messageTemplate: 'Usuario "{username}" muestra patrones de actividad automatizada',
        priority: 'high' as const,
        actionRequired: true
      },
      {
        title: 'VPN/Proxy Detectado',
        messageTemplate: 'Acceso desde VPN/Proxy detectado en IP {ip}',
        priority: 'medium' as const,
        actionRequired: false
      },
      {
        title: 'Múltiples Cuentas Detectadas',
        messageTemplate: 'Posible operación de múltiples cuentas desde IP {ip}',
        priority: 'high' as const,
        actionRequired: true
      }
    ],
    user_action: [
      {
        title: 'Nuevo Usuario Registrado',
        messageTemplate: 'Usuario "{username}" se registró en {universe}',
        priority: 'low' as const,
        actionRequired: false
      },
      {
        title: 'Usuario Alcanzó Nivel Alto',
        messageTemplate: 'Usuario "{username}" alcanzó nivel {level}',
        priority: 'low' as const,
        actionRequired: false
      },
      {
        title: 'Cuenta Inactiva',
        messageTemplate: 'Usuario "{username}" inactivo por {days} días',
        priority: 'low' as const,
        actionRequired: false
      }
    ],
    system: [
      {
        title: 'Backup Completado',
        messageTemplate: 'Backup automático completado - Tamaño: {size}',
        priority: 'low' as const,
        actionRequired: false
      },
      {
        title: 'Actualización de Sistema',
        messageTemplate: 'Sistema actualizado a versión {version}',
        priority: 'medium' as const,
        actionRequired: false
      },
      {
        title: 'Reinicio de Servidor',
        messageTemplate: 'Servidor reiniciado - Tiempo de inactividad: {downtime}',
        priority: 'medium' as const,
        actionRequired: false
      }
    ],
    performance: [
      {
        title: 'Carga de CPU Alta',
        messageTemplate: 'Carga del CPU: {cpuLoad}% durante {duration} minutos',
        priority: 'medium' as const,
        actionRequired: true
      },
      {
        title: 'Memoria Insuficiente',
        messageTemplate: 'Uso de memoria: {memoryUsage}% - Considerar optimización',
        priority: 'high' as const,
        actionRequired: true
      },
      {
        title: 'Base de Datos Lenta',
        messageTemplate: 'Tiempo de consulta promedio: {queryTime}ms',
        priority: 'medium' as const,
        actionRequired: false
      }
    ],
    violation: [
      {
        title: 'Nueva Violación Reportada',
        messageTemplate: 'Usuario "{username}" reportado por {violationType}',
        priority: 'high' as const,
        actionRequired: true
      },
      {
        title: 'Violación Auto-Detectada',
        messageTemplate: 'Sistema detectó {violationType} en usuario "{username}"',
        priority: 'high' as const,
        actionRequired: true
      }
    ],
    maintenance: [
      {
        title: 'Mantenimiento Programado',
        messageTemplate: 'Mantenimiento programado para {date} - Duración: {duration}h',
        priority: 'medium' as const,
        actionRequired: false
      },
      {
        title: 'Mantenimiento Completado',
        messageTemplate: 'Mantenimiento completado - Duración real: {duration}',
        priority: 'low' as const,
        actionRequired: false
      }
    ]
  };

  static generateSecurityNotification(data: {
    type: 'failed_login' | 'bot_detected' | 'vpn_detected' | 'multi_account';
    ip?: string;
    username?: string;
    attempts?: number;
    timespan?: number;
  }): Omit<AdminNotification, 'id' | 'timestamp'> {
    const templates = this.notificationTemplates.security;
    let template;

    switch (data.type) {
      case 'failed_login':
        template = templates[0];
        break;
      case 'bot_detected':
        template = templates[1];
        break;
      case 'vpn_detected':
        template = templates[2];
        break;
      case 'multi_account':
        template = templates[3];
        break;
      default:
        template = templates[0];
    }

    let message = template.messageTemplate;
    if (data.ip) message = message.replace('{ip}', data.ip);
    if (data.username) message = message.replace('{username}', data.username);
    if (data.attempts) message = message.replace('{attempts}', data.attempts.toString());
    if (data.timespan) message = message.replace('{timespan}', data.timespan.toString());

    return {
      title: template.title,
      message,
      type: 'security',
      priority: template.priority,
      read: false,
      actionRequired: template.actionRequired,
      metadata: data
    };
  }

  static generateUserNotification(data: {
    type: 'registration' | 'level_up' | 'inactive';
    username: string;
    universe?: string;
    level?: number;
    days?: number;
  }): Omit<AdminNotification, 'id' | 'timestamp'> {
    const templates = this.notificationTemplates.user_action;
    let template;

    switch (data.type) {
      case 'registration':
        template = templates[0];
        break;
      case 'level_up':
        template = templates[1];
        break;
      case 'inactive':
        template = templates[2];
        break;
      default:
        template = templates[0];
    }

    let message = template.messageTemplate;
    message = message.replace('{username}', data.username);
    if (data.universe) message = message.replace('{universe}', data.universe);
    if (data.level) message = message.replace('{level}', data.level.toString());
    if (data.days) message = message.replace('{days}', data.days.toString());

    return {
      title: template.title,
      message,
      type: 'user_action',
      priority: template.priority,
      read: false,
      actionRequired: template.actionRequired,
      metadata: data
    };
  }

  static generateSystemNotification(data: {
    type: 'backup' | 'update' | 'restart';
    size?: string;
    version?: string;
    downtime?: string;
  }): Omit<AdminNotification, 'id' | 'timestamp'> {
    const templates = this.notificationTemplates.system;
    let template;

    switch (data.type) {
      case 'backup':
        template = templates[0];
        break;
      case 'update':
        template = templates[1];
        break;
      case 'restart':
        template = templates[2];
        break;
      default:
        template = templates[0];
    }

    let message = template.messageTemplate;
    if (data.size) message = message.replace('{size}', data.size);
    if (data.version) message = message.replace('{version}', data.version);
    if (data.downtime) message = message.replace('{downtime}', data.downtime);

    return {
      title: template.title,
      message,
      type: 'system',
      priority: template.priority,
      read: false,
      actionRequired: template.actionRequired,
      metadata: data
    };
  }

  static generatePerformanceNotification(data: {
    type: 'cpu_high' | 'memory_low' | 'db_slow';
    cpuLoad?: number;
    memoryUsage?: number;
    queryTime?: number;
    duration?: number;
  }): Omit<AdminNotification, 'id' | 'timestamp'> {
    const templates = this.notificationTemplates.performance;
    let template;

    switch (data.type) {
      case 'cpu_high':
        template = templates[0];
        break;
      case 'memory_low':
        template = templates[1];
        break;
      case 'db_slow':
        template = templates[2];
        break;
      default:
        template = templates[0];
    }

    let message = template.messageTemplate;
    if (data.cpuLoad) message = message.replace('{cpuLoad}', data.cpuLoad.toFixed(1));
    if (data.memoryUsage) message = message.replace('{memoryUsage}', data.memoryUsage.toFixed(1));
    if (data.queryTime) message = message.replace('{queryTime}', data.queryTime.toFixed(1));
    if (data.duration) message = message.replace('{duration}', data.duration.toString());

    return {
      title: template.title,
      message,
      type: 'performance',
      priority: template.priority,
      read: false,
      actionRequired: template.actionRequired,
      metadata: data
    };
  }
}