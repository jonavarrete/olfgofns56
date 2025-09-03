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
  Clock,
  Target,
  Plus,
  Minus,
  FileText,
  CheckCircle
} from 'lucide-react';

interface GlobalMessageCreatorProps {
  message?: GlobalMessage | null;
  onClose: () => void;
  onSave: (message: Omit<GlobalMessage, 'id' | 'sentAt' | 'readBy'>) => void;
}

export default function GlobalMessageCreator({ message, onClose, onSave }: GlobalMessageCreatorProps) {
  const [formData, setFormData] = useState({
    title: message?.title || '',
    content: message?.content || '',
    type: message?.type || 'announcement' as GlobalMessage['type'],
    priority: message?.priority || 'medium' as GlobalMessage['priority'],
    targetAudience: message?.targetAudience || 'all' as GlobalMessage['targetAudience'],
    targetIds: message?.targetIds || [] as string[],
    scheduledFor: message?.scheduledFor ? new Date(message.scheduledFor).toISOString().slice(0, 16) : '',
    expiresAt: message?.expiresAt ? new Date(message.expiresAt).toISOString().slice(0, 16) : '',
  });
  
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'audience' | 'schedule' | 'preview'>('content');

  const messageTypes = [
    { value: 'announcement', label: 'Anuncio', icon: MessageSquare, color: 'neon-blue', desc: 'Comunicación general' },
    { value: 'maintenance', label: 'Mantenimiento', icon: Settings, color: 'neon-orange', desc: 'Notificaciones de mantenimiento' },
    { value: 'event', label: 'Evento', icon: Star, color: 'neon-purple', desc: 'Eventos especiales del juego' },
    { value: 'warning', label: 'Advertencia', icon: AlertTriangle, color: 'neon-red', desc: 'Alertas importantes' },
    { value: 'celebration', label: 'Celebración', icon: Zap, color: 'neon-green', desc: 'Celebraciones y logros' },
  ];

  const priorities = [
    { value: 'low', label: 'Baja', color: 'text-gray-400', desc: 'Información general' },
    { value: 'medium', label: 'Media', color: 'text-neon-blue', desc: 'Información importante' },
    { value: 'high', label: 'Alta', color: 'text-neon-orange', desc: 'Requiere atención' },
    { value: 'critical', label: 'Crítica', color: 'text-neon-red', desc: 'Acción inmediata requerida' },
  ];

  const audiences = [
    { value: 'all', label: 'Todos los usuarios', icon: Globe, desc: 'Enviar a todos los usuarios registrados', count: '47.8K' },
    { value: 'universe', label: 'Universo específico', icon: Globe, desc: 'Usuarios de un universo particular', count: '3.2K' },
    { value: 'alliance', label: 'Miembros de alianza', icon: Users, desc: 'Usuarios que pertenecen a alianzas', count: '28.5K' },
    { value: 'specific_users', label: 'Usuarios específicos', icon: Target, desc: 'Lista específica de usuarios', count: 'Variable' },
  ];

  const handleSave = async (sendNow: boolean = false) => {
    setSaving(true);
    
    try {
      const messageData: Omit<GlobalMessage, 'id' | 'sentAt' | 'readBy'> = {
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
      onSave(messageData);
    } catch (error) {
      console.error('Error saving message:', error);
    } finally {
      setSaving(false);
    }
  };

  const addTargetId = () => {
    setFormData(prev => ({
      ...prev,
      targetIds: [...prev.targetIds, '']
    }));
  };

  const removeTargetId = (index: number) => {
    setFormData(prev => ({
      ...prev,
      targetIds: prev.targetIds.filter((_, i) => i !== index)
    }));
  };

  const updateTargetId = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      targetIds: prev.targetIds.map((id, i) => i === index ? value : id)
    }));
  };

  const selectedType = messageTypes.find(t => t.value === formData.type);
  const selectedPriority = priorities.find(p => p.value === formData.priority);
  const selectedAudience = audiences.find(a => a.value === formData.targetAudience);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-5xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-space-600 p-6">
          <div>
            <h2 className="text-xl font-orbitron font-bold text-white">
              {message ? 'Editar Mensaje Global' : 'Crear Mensaje Global'}
            </h2>
            <p className="text-gray-400 mt-1">
              Comunicación masiva para usuarios de la plataforma
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-space-600">
          <div className="flex space-x-1 p-2">
            {[
              { id: 'content', name: 'Contenido', icon: FileText },
              { id: 'audience', name: 'Audiencia', icon: Users },
              { id: 'schedule', name: 'Programación', icon: Calendar },
              { id: 'preview', name: 'Vista Previa', icon: Eye },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-rajdhani font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-neon-blue text-white'
                    : 'text-gray-400 hover:text-white hover:bg-space-700/50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                  Título del Mensaje
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                  placeholder="Título que verán los usuarios..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-3">
                    Tipo de Mensaje
                  </label>
                  <div className="space-y-2">
                    {messageTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, type: type.value as any })}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                          formData.type === type.value
                            ? `bg-${type.color}/20 border-${type.color}/30 text-${type.color}`
                            : 'bg-space-700/30 border-space-600 text-gray-400 hover:text-white hover:border-neon-blue/30'
                        }`}
                      >
                        <type.icon className="w-5 h-5" />
                        <div className="text-left flex-1">
                          <p className="font-rajdhani font-medium">{type.label}</p>
                          <p className="text-xs opacity-80">{type.desc}</p>
                        </div>
                        {formData.type === type.value && (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-3">
                    Prioridad
                  </label>
                  <div className="space-y-2">
                    {priorities.map((priority) => (
                      <button
                        key={priority.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, priority: priority.value as any })}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                          formData.priority === priority.value
                            ? 'bg-neon-purple/20 border-neon-purple/30 text-neon-purple'
                            : 'bg-space-700/30 border-space-600 text-gray-400 hover:text-white hover:border-neon-blue/30'
                        }`}
                      >
                        <div className="text-left">
                          <p className="font-rajdhani font-medium">{priority.label}</p>
                          <p className="text-xs opacity-80">{priority.desc}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs ${priority.color}`}>●</span>
                          {formData.priority === priority.value && (
                            <CheckCircle className="w-4 h-4" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                  Contenido del Mensaje
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none resize-none"
                  rows={10}
                  placeholder="Escribe el contenido del mensaje aquí..."
                  required
                />
                <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                  <span>Usa saltos de línea para separar párrafos</span>
                  <span>{formData.content.length} caracteres</span>
                </div>
              </div>
            </div>
          )}

          {/* Audience Tab */}
          {activeTab === 'audience' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-rajdhani font-semibold text-white mb-4">
                  Seleccionar Audiencia Objetivo
                </h3>
                <div className="space-y-3">
                  {audiences.map((audience) => (
                    <button
                      key={audience.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, targetAudience: audience.value as any })}
                      className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                        formData.targetAudience === audience.value
                          ? 'bg-neon-green/20 border-neon-green/30 text-neon-green'
                          : 'bg-space-700/30 border-space-600 text-gray-400 hover:text-white hover:border-neon-blue/30'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <audience.icon className="w-6 h-6" />
                        <div className="text-left">
                          <p className="font-rajdhani font-semibold text-lg">{audience.label}</p>
                          <p className="text-sm opacity-80">{audience.desc}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-orbitron font-bold text-xl">{audience.count}</p>
                        <p className="text-xs">destinatarios</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {formData.targetAudience !== 'all' && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-rajdhani font-medium text-gray-400">
                      IDs Específicos
                    </label>
                    <button
                      type="button"
                      onClick={addTargetId}
                      className="p-1 text-gray-400 hover:text-neon-green transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.targetIds.map((id, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={id}
                          onChange={(e) => updateTargetId(index, e.target.value)}
                          className="flex-1 px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                          placeholder={
                            formData.targetAudience === 'universe' ? 'universe_1' :
                            formData.targetAudience === 'alliance' ? 'alliance_name' :
                            'user_id'
                          }
                        />
                        <button
                          type="button"
                          onClick={() => removeTargetId(index)}
                          className="p-2 text-gray-400 hover:text-neon-red transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {formData.targetIds.length === 0 && (
                      <div className="p-4 bg-space-700/30 rounded-lg border border-space-600 text-center">
                        <p className="text-gray-400 text-sm">
                          Haz clic en + para agregar IDs específicos
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                    Programar Envío (opcional)
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.scheduledFor}
                    onChange={(e) => setFormData({ ...formData, scheduledFor: e.target.value })}
                    className="w-full px-3 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    Dejar vacío para envío inmediato
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                    Fecha de Expiración (opcional)
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.expiresAt}
                    onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                    className="w-full px-3 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    El mensaje se ocultará automáticamente después de esta fecha
                  </p>
                </div>
              </div>

              <div className="p-4 bg-neon-blue/10 border border-neon-blue/30 rounded-lg">
                <h4 className="font-rajdhani font-semibold text-white mb-3">
                  Resumen de Programación
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Estado del mensaje:</span>
                    <span className="text-white font-rajdhani font-medium">
                      {formData.scheduledFor ? 'Programado' : 'Envío inmediato'}
                    </span>
                  </div>
                  {formData.scheduledFor && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Fecha de envío:</span>
                      <span className="text-neon-blue font-rajdhani font-medium">
                        {new Date(formData.scheduledFor).toLocaleString('es-ES')}
                      </span>
                    </div>
                  )}
                  {formData.expiresAt && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Expira:</span>
                      <span className="text-neon-orange font-rajdhani font-medium">
                        {new Date(formData.expiresAt).toLocaleString('es-ES')}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Destinatarios:</span>
                    <span className="text-white font-rajdhani font-medium">
                      {selectedAudience?.count} usuarios
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preview Tab */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              <div className="p-6 bg-space-700/30 rounded-lg border border-space-600">
                <h3 className="text-lg font-rajdhani font-semibold text-white mb-4">
                  Vista Previa del Mensaje
                </h3>
                
                {/* Message Preview */}
                <div className="p-4 bg-space-800/50 rounded-lg border border-space-600">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className={`p-3 rounded-lg border ${selectedType ? `bg-${selectedType.color}/20 border-${selectedType.color}/30 text-${selectedType.color}` : 'bg-space-600 border-space-500 text-gray-400'}`}>
                      {selectedType ? (
                        <selectedType.icon className="w-6 h-6" />
                      ) : (
                        <MessageSquare className="w-6 h-6" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-3 py-1 rounded text-xs font-rajdhani font-bold ${selectedType ? `bg-${selectedType.color}/20 text-${selectedType.color} border border-${selectedType.color}/30` : 'bg-space-600 text-gray-400'}`}>
                          {selectedType?.label || 'TIPO NO SELECCIONADO'}
                        </span>
                        <span className={`px-3 py-1 rounded text-xs font-rajdhani font-bold ${selectedPriority?.color || 'text-gray-400'} bg-current/10`}>
                          PRIORIDAD {selectedPriority?.label.toUpperCase() || 'NO SELECCIONADA'}
                        </span>
                      </div>
                      <h2 className="text-xl font-orbitron font-bold text-white mb-3">
                        {formData.title || 'Título del mensaje aparecerá aquí'}
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                          {formData.content || 'El contenido del mensaje aparecerá aquí...'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-space-600 flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center space-x-4">
                      <span>Enviado por: Administrador</span>
                      <span>Fecha: {new Date().toLocaleString('es-ES')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-3 h-3" />
                      <span>Para: {selectedAudience?.label}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <Users className="w-8 h-8 text-neon-blue mx-auto mb-2" />
                  <p className="text-2xl font-orbitron font-bold text-white">
                    {selectedAudience?.count || '0'}
                  </p>
                  <p className="text-xs text-gray-400">Destinatarios</p>
                </div>
                
                <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <Clock className="w-8 h-8 text-neon-green mx-auto mb-2" />
                  <p className="text-2xl font-orbitron font-bold text-white">
                    {formData.scheduledFor ? 'Programado' : 'Inmediato'}
                  </p>
                  <p className="text-xs text-gray-400">Tipo de Envío</p>
                </div>
                
                <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <Star className="w-8 h-8 text-neon-orange mx-auto mb-2" />
                  <p className="text-2xl font-orbitron font-bold text-white">
                    {selectedPriority?.label || 'N/A'}
                  </p>
                  <p className="text-xs text-gray-400">Prioridad</p>
                </div>
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
              disabled={!formData.title || !formData.content}
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
              {message ? 'Actualizar y Enviar' : formData.scheduledFor ? 'Programar Envío' : 'Enviar Ahora'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}