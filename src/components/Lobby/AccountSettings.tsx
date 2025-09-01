import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { 
  X, 
  User, 
  Mail, 
  Globe, 
  Bell, 
  Palette, 
  Save,
  Eye,
  EyeOff,
  Lock,
  Info,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { User as UserType } from '../../types/auth';

interface AccountSettingsProps {
  onClose: () => void;
}

export default function AccountSettings({ onClose }: AccountSettingsProps) {
  const { state, updateUser } = useAuth();
  const { user } = state;
  
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    language: user?.preferences.language || 'es',
    theme: user?.preferences.theme || 'dark',
    notifications: user?.preferences.notifications || true,
  });
  
  const [showPasswords, setShowPasswords] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      // Validate form
      if (formData.username.length < 3) {
        throw new Error('El nombre de usuario debe tener al menos 3 caracteres');
      }

      if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }

      if (formData.newPassword && formData.newPassword.length < 6) {
        throw new Error('La nueva contraseña debe tener al menos 6 caracteres');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedUser: Partial<UserType> = {
        username: formData.username,
        email: formData.email,
        preferences: {
          language: formData.language as 'es' | 'en' | 'fr' | 'de',
          theme: formData.theme as 'dark' | 'light' | 'auto',
          notifications: formData.notifications,
        },
      };

      updateUser(updatedUser);
      setMessage({ type: 'success', text: 'Configuración guardada exitosamente' });
      
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));

    } catch (error) {
      setMessage({ type: 'error', text: (error as Error).message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-2xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-6 border-b border-space-600">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-orbitron font-bold text-white">
                Configuración de Cuenta
              </h2>
              <p className="text-gray-400 mt-1">
                Gestiona tu perfil y preferencias
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Message */}
          {message && (
            <div className={`p-3 rounded-lg border ${
              message.type === 'success' 
                ? 'bg-neon-green/10 border-neon-green/30 text-neon-green' 
                : 'bg-neon-red/10 border-neon-red/30 text-neon-red'
            }`}>
              <div className="flex items-center space-x-2">
                {message.type === 'success' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertTriangle className="w-4 h-4" />
                )}
                <span className="text-sm font-rajdhani font-medium">
                  {message.text}
                </span>
              </div>
            </div>
          )}

          {/* Profile Information */}
          <div>
            <h3 className="text-lg font-rajdhani font-semibold text-white mb-4">
              Información del Perfil
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                  Nombre de Usuario
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none transition-colors"
                    placeholder="Nombre de usuario"
                    minLength={3}
                    maxLength={20}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none transition-colors"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Password Change */}
          <div>
            <h3 className="text-lg font-rajdhani font-semibold text-white mb-4">
              Cambiar Contraseña
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                  Contraseña Actual
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPasswords ? 'text' : 'password'}
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none transition-colors"
                    placeholder="Contraseña actual"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(!showPasswords)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                    Nueva Contraseña
                  </label>
                  <input
                    type={showPasswords ? 'text' : 'password'}
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="w-full px-3 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none transition-colors"
                    placeholder="Nueva contraseña"
                    minLength={6}
                  />
                </div>

                <div>
                  <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                    Confirmar Contraseña
                  </label>
                  <input
                    type={showPasswords ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-3 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none transition-colors"
                    placeholder="Confirmar contraseña"
                    minLength={6}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div>
            <h3 className="text-lg font-rajdhani font-semibold text-white mb-4">
              Preferencias
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                  Idioma
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value as any })}
                    className="w-full pl-10 pr-4 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none transition-colors appearance-none"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                  Tema
                </label>
                <div className="relative">
                  <Palette className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={formData.theme}
                    onChange={(e) => setFormData({ ...formData, theme: e.target.value as any })}
                    className="w-full pl-10 pr-4 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none transition-colors appearance-none"
                  >
                    <option value="dark">Oscuro</option>
                    <option value="light">Claro</option>
                    <option value="auto">Automático</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                  Notificaciones
                </label>
                <div className="flex items-center space-x-3 py-3">
                  <Bell className="w-4 h-4 text-gray-400" />
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.notifications}
                      onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
                      className="rounded border-space-600 bg-space-700 text-neon-blue focus:ring-neon-blue focus:ring-offset-space-800"
                    />
                    <span className="text-sm text-gray-300">
                      {formData.notifications ? 'Activadas' : 'Desactivadas'}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
            <h4 className="font-rajdhani font-semibold text-white mb-3">
              Información de la Cuenta
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">ID de Usuario:</span>
                <span className="text-gray-300 font-mono">{user?.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Cuenta creada:</span>
                <span className="text-gray-300">
                  {new Date(user?.createdAt || 0).toLocaleDateString('es-ES')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Última conexión:</span>
                <span className="text-gray-300">
                  {new Date(user?.lastLogin || 0).toLocaleDateString('es-ES')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Estado:</span>
                <span className="text-neon-green font-rajdhani font-medium">Activo</span>
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="p-4 bg-neon-blue/10 border border-neon-blue/30 rounded-lg">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-neon-blue mt-0.5" />
              <div>
                <h4 className="font-rajdhani font-semibold text-white mb-1">
                  Privacidad y Seguridad
                </h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Tu información personal está protegida y encriptada</li>
                  <li>• Los cambios de contraseña requieren verificación</li>
                  <li>• Las preferencias se sincronizan entre dispositivos</li>
                  <li>• Puedes exportar tus datos en cualquier momento</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-space-600">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSave}
              loading={saving}
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}