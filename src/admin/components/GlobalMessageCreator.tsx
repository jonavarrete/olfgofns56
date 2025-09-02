import React, { useState } from 'react';
import { GlobalMessage } from '../../types/admin';
import Button from '../../components/UI/Button';
import { 
  X, 
  Send, 
  Save, 
  Calendar,
  Users,
  Globe,
  MessageSquare,
  AlertTriangle,
  Info,
  Zap,
  Settings,
  Star,
  Eye,
  Clock
} from 'lucide-react';

interface GlobalMessageCreatorProps {
  onClose: () => void;
  onSave: (message: Omit<GlobalMessage, 'id' | 'sentAt' | 'readBy'>) => void;
}

export default function GlobalMessageCreator({ onClose, onSave }: GlobalMessageCreatorProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'announcement' as GlobalMessage['type'],
    priority: 'medium' as GlobalMessage['priority'],
    targetAudience: 'all' as GlobalMessage['targetAudience'],
    targetIds: [] as string[],
    scheduledFor: '',
    expiresAt: '',
  });
  
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);

  const messageTypes = [
    { value: 'announcement', label: 'Anuncio', icon: MessageSquare, color: 'neon-blue' },
    { value: 'maintenance', label: 'Mantenimiento', icon: Settings, color: 'neon-orange' },
    { value: 'event', label: 'Evento', icon: Star, color: 'neon-purple' },
    { value: 'warning', label: 'Advertencia', icon: AlertTriangle, color: 'neon-red' },
    { value: 'celebration', label: 'Celebración', icon: Zap, color: 'neon-green' },
  ];

  const priorities = [
    { value: 'low', label: 'Baja', color: 'text-gray-400' },
    { value: 'medium', label: 'Media', color: 'text-neon-blue' },
    { value: 'high', label: 'Alta', color: 'text-neon-orange' },
    { value: 'critical', label: 'Crítica', color: 'text-neon-red' },
  ];

  const audiences = [
    { value: 'all', label: 'Todos los usuarios', icon: Globe },
    { value: 'universe', label: 'Universo específico', icon: Globe },
    { value: 'alliance', label: 'Alianza específica', icon: Users },
    { value: 'specific_users', label: 'Usuarios específicos', icon: Users },
  ];

  const handleSave = async (sendNow: boolean = false) => {
    setSaving(true);
    
    try {
      const message: Omit<GlobalMessage, 'id' | 'sentAt' | 'readBy'> = {
        title: formData.title,
        content: formData.content,
        type: formData.type,
        priority: formData.priority,
        targetAudience: formData.targetAudience,
        targetIds: formData.targetIds,
        scheduledFor: formData.scheduledFor ? new Date(formData.scheduledFor).getTime() : undefined,
        expiresAt: formData.expiresAt ? new Date(formData.expiresAt).getTime() : undefined,
        sentBy: 'current_admin_id',
        status: sendNow ? 'sent' : formData.scheduledFor ? 'scheduled' : 'draft',
      };

      await new Promise(resolve => setTimeout(resolve, 1000));
      onSave(message);
    } catch (error) {
      console.error('Error saving message:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-space-600 p-6">
          <div>
            <h2 className="text-xl font-orbitron font-bold text-white">
              Crear Mensaje Global
            </h2>
            <p className="text-gray-400 mt-1">
              Enviar comunicación masiva a usuarios
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setPreview(!preview)}
              className={`p-2 rounded transition-colors ${
                preview ? 'text-neon-blue bg-neon-blue/20' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {!preview ? (
            <>
              {/* Message Configuration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                      Título del Mensaje
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                      placeholder="Título del mensaje..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                      Tipo de Mensaje
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {messageTypes.map((type) => (
                        <button
                          key={type.value}
                          onClick={() => setFormData({ ...formData, type: type.value as any })}
                          className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 ${
                            formData.type === type.value
                              ? `bg-${type.color}/20 border-${type.color}/30 text-${type.color}`
                              : 'bg-space-700/30 border-space-600 text-gray-400 hover:text-white'
                          }`}
                        >
                          <type.icon className="w-4 h-4" />
                          <span className="text-sm font-rajdhani font-medium">{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                      Prioridad
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                      className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                    >
                      {priorities.map((priority) => (
                        <option key={priority.value} value={priority.value}>
                          {priority.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                      Audiencia Objetivo
                    </label>
                    <div className="space-y-2">
                      {audiences.map((audience) => (
                        <button
                          key={audience.value}
                          onClick={() => setFormData({ ...formData, targetAudience: audience.value as any })}
                          className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                            formData.targetAudience === audience.value
                              ? 'bg-neon-green/20 border-neon-green/30 text-neon-green'
                              : 'bg-space-700/30 border-space-600 text-gray-400 hover:text-white'
                          }`}
                        >
                          <audience.icon className="w-4 h-4" />
                          <span className="text-sm font-rajdhani font-medium">{audience.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                        Programar Envío
                      </label>
                      <input
                        type="datetime-local"
                        value={formData.scheduledFor}
                        onChange={(e) => setFormData({ ...formData, scheduledFor: e.target.value })}
                        className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                        Fecha de Expiración
                      </label>
                      <input
                        type="datetime-local"
                        value={formData.expiresAt}
                        onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                        className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                  Contenido del Mensaje
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none resize-none"
                  rows={8}
                  placeholder="Escribe el contenido del mensaje aquí..."
                  required
                />
              </div>
            </>
          ) : (
            /* Preview */
            <div className="space-y-4">
              <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded border ${getMessageTypeColor(formData.type)}`}>
                    {React.createElement(messageTypes.find(t => t.value === formData.type)?.icon || MessageSquare, {
                      className: "w-4 h-4"
                    })}
                  </div>
                  <div>
                    <h3 className="font-rajdhani font-semibold text-white">
                      {formData.title || 'Título del mensaje'}
                    </h3>
                    <div className="flex items-center space-x-3 text-xs text-gray-400">
                      <span>Tipo: {messageTypes.find(t => t.value === formData.type)?.label}</span>
                      <span>Prioridad: {priorities.find(p => p.value === formData.priority)?.label}</span>
                      <span>Audiencia: {audiences.find(a => a.value === formData.targetAudience)?.label}</span>
                    </div>
                  </div>
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {formData.content || 'Contenido del mensaje aparecerá aquí...'}
                  </p>
                </div>
                
                {(formData.scheduledFor || formData.expiresAt) && (
                  <div className="mt-4 pt-4 border-t border-space-600 flex items-center space-x-4 text-xs text-gray-400">
                    {formData.scheduledFor && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>Programado: {new Date(formData.scheduledFor).toLocaleString()}</span>
                      </div>
                    )}
                    {formData.expiresAt && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>Expira: {new Date(formData.expiresAt).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-space-600 p-6">
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => handleSave(false)}
              loading={saving}
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar Borrador
            </Button>
            <Button 
              variant="primary" 
              onClick={() => handleSave(true)}
              loading={saving}
              disabled={!formData.title || !formData.content}
            >
              <Send className="w-4 h-4 mr-2" />
              {formData.scheduledFor ? 'Programar Envío' : 'Enviar Ahora'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}