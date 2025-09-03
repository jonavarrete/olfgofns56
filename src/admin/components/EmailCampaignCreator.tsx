import React, { useState } from 'react';
import Button from '../../components/UI/Button';
import { 
  X, 
  Send, 
  Save, 
  Mail,
  Users,
  Globe,
  Calendar,
  Eye,
  Settings,
  Target,
  BarChart3,
  Clock,
  Filter,
  Plus,
  Minus,
  FileText,
  Image,
  Link,
  Bold,
  Italic,
  List
} from 'lucide-react';

interface EmailCampaignCreatorProps {
  campaign?: any;
  onClose: () => void;
  onSave: (campaign: any) => void;
}

interface EmailCampaign {
  name: string;
  subject: string;
  content: string;
  htmlContent: string;
  targetAudience: 'all' | 'universe' | 'alliance' | 'inactive' | 'new_users';
  targetIds: string[];
  scheduledFor?: string;
  template: string;
  trackOpens: boolean;
  trackClicks: boolean;
  fromName: string;
  fromEmail: string;
  replyTo: string;
}

export default function EmailCampaignCreator({ campaign, onClose, onSave }: EmailCampaignCreatorProps) {
  const [formData, setFormData] = useState<EmailCampaign>({
    name: campaign?.name || '',
    subject: campaign?.subject || '',
    content: campaign?.content || '',
    htmlContent: campaign?.htmlContent || '',
    targetAudience: campaign?.targetAudience || 'all',
    targetIds: campaign?.targetIds || [],
    scheduledFor: campaign?.scheduledFor ? new Date(campaign.scheduledFor).toISOString().slice(0, 16) : '',
    template: campaign?.template || 'default',
    trackOpens: campaign?.trackOpens ?? true,
    trackClicks: campaign?.trackClicks ?? true,
    fromName: campaign?.fromName || 'Galactic Empire',
    fromEmail: campaign?.fromEmail || 'noreply@galaxy.com',
    replyTo: campaign?.replyTo || 'support@galaxy.com'
  });

  const [activeTab, setActiveTab] = useState<'content' | 'audience' | 'settings' | 'preview'>('content');
  const [saving, setSaving] = useState(false);

  const audiences = [
    { value: 'all', label: 'Todos los usuarios', description: 'Enviar a todos los usuarios registrados', count: '47.8K' },
    { value: 'universe', label: 'Universo específico', description: 'Usuarios de un universo particular', count: '3.2K' },
    { value: 'alliance', label: 'Miembros de alianza', description: 'Usuarios que pertenecen a alianzas', count: '28.5K' },
    { value: 'inactive', label: 'Usuarios inactivos', description: 'No han iniciado sesión en 7+ días', count: '12.1K' },
    { value: 'new_users', label: 'Usuarios nuevos', description: 'Registrados en los últimos 30 días', count: '5.6K' },
  ];

  const templates = [
    { value: 'default', label: 'Plantilla por Defecto', description: 'Diseño estándar de Galactic Empire' },
    { value: 'maintenance', label: 'Mantenimiento', description: 'Para anuncios de mantenimiento' },
    { value: 'event', label: 'Evento Especial', description: 'Para promocionar eventos del juego' },
    { value: 'welcome', label: 'Bienvenida', description: 'Para nuevos usuarios' },
    { value: 'newsletter', label: 'Newsletter', description: 'Boletín informativo semanal' },
  ];

  const handleSave = async (sendNow: boolean = false) => {
    setSaving(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const campaign = {
        ...formData,
        id: campaign?.id || Date.now().toString(),
        createdAt: campaign?.createdAt || Date.now(),
        status: sendNow ? 'sent' : formData.scheduledFor ? 'scheduled' : 'draft',
        sentAt: sendNow ? Date.now() : undefined,
      };

      onSave(campaign);
    } catch (error) {
      console.error('Error saving campaign:', error);
    } finally {
      setSaving(false);
    }
  };

  const insertVariable = (variable: string) => {
    const textarea = document.getElementById('email-content') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent = formData.content.substring(0, start) + `{{${variable}}}` + formData.content.substring(end);
      setFormData({ ...formData, content: newContent });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-space-600 p-6">
          <div>
            <h2 className="text-xl font-orbitron font-bold text-white">
              {campaign ? 'Editar Campaña de Email' : 'Crear Campaña de Email'}
            </h2>
            <p className="text-gray-400 mt-1">
              {campaign ? 'Modificar campaña de email existente' : 'Diseña y envía emails masivos a los usuarios'}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-space-600">
          <div className="flex space-x-1 p-2">
            {[
              { id: 'content', name: 'Contenido', icon: FileText },
              { id: 'audience', name: 'Audiencia', icon: Users },
              { id: 'settings', name: 'Configuración', icon: Settings },
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

        <div className="p-6">
          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                    Nombre de la Campaña
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                    placeholder="Nombre interno de la campaña"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                    Plantilla
                  </label>
                  <select
                    value={formData.template}
                    onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                    className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                  >
                    {templates.map(template => (
                      <option key={template.value} value={template.value}>
                        {template.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                  Asunto del Email
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                  placeholder="Asunto que verán los usuarios"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-rajdhani font-medium text-gray-400">
                    Contenido del Email
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Variables:</span>
                    {['username', 'email', 'universe', 'rank', 'points'].map(variable => (
                      <button
                        key={variable}
                        onClick={() => insertVariable(variable)}
                        className="px-2 py-1 bg-neon-blue/20 text-neon-blue rounded text-xs font-rajdhani font-medium hover:bg-neon-blue/30 transition-colors"
                      >
                        {variable}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  id="email-content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none resize-none"
                  rows={12}
                  placeholder="Escribe el contenido del email aquí... Usa {{variable}} para insertar datos dinámicos."
                  required
                />
              </div>
            </div>
          )}

          {/* Audience Tab */}
          {activeTab === 'audience' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-rajdhani font-semibold text-white mb-4">
                  Seleccionar Audiencia
                </h3>
                <div className="space-y-3">
                  {audiences.map((audience) => (
                    <button
                      key={audience.value}
                      onClick={() => setFormData({ ...formData, targetAudience: audience.value as any })}
                      className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                        formData.targetAudience === audience.value
                          ? 'bg-neon-green/20 border-neon-green/30 text-neon-green'
                          : 'bg-space-700/30 border-space-600 text-gray-400 hover:text-white hover:border-neon-blue/30'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <Target className="w-5 h-5" />
                        <div className="text-left">
                          <p className="font-rajdhani font-semibold">{audience.label}</p>
                          <p className="text-sm opacity-80">{audience.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-orbitron font-bold text-lg">{audience.count}</p>
                        <p className="text-xs">usuarios</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {formData.targetAudience !== 'all' && (
                <div>
                  <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                    IDs Específicos (opcional)
                  </label>
                  <textarea
                    value={formData.targetIds.join('\n')}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      targetIds: e.target.value.split('\n').filter(id => id.trim() !== '') 
                    })}
                    className="w-full px-3 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                    rows={4}
                    placeholder="Un ID por línea (universo, alianza o usuario según la audiencia seleccionada)"
                  />
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                    Nombre del Remitente
                  </label>
                  <input
                    type="text"
                    value={formData.fromName}
                    onChange={(e) => setFormData({ ...formData, fromName: e.target.value })}
                    className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                    Email del Remitente
                  </label>
                  <input
                    type="email"
                    value={formData.fromEmail}
                    onChange={(e) => setFormData({ ...formData, fromEmail: e.target.value })}
                    className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                    Email de Respuesta
                  </label>
                  <input
                    type="email"
                    value={formData.replyTo}
                    onChange={(e) => setFormData({ ...formData, replyTo: e.target.value })}
                    className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                  Programar Envío (opcional)
                </label>
                <input
                  type="datetime-local"
                  value={formData.scheduledFor}
                  onChange={(e) => setFormData({ ...formData, scheduledFor: e.target.value })}
                  className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-rajdhani font-semibold text-white">
                  Opciones de Seguimiento
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-space-700/30 rounded-lg border border-space-600">
                    <div>
                      <p className="font-rajdhani font-medium text-white">Rastrear Aperturas</p>
                      <p className="text-sm text-gray-400">Saber cuándo los usuarios abren el email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.trackOpens}
                        onChange={(e) => setFormData({ ...formData, trackOpens: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-space-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-blue"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-space-700/30 rounded-lg border border-space-600">
                    <div>
                      <p className="font-rajdhani font-medium text-white">Rastrear Clics</p>
                      <p className="text-sm text-gray-400">Saber qué enlaces hacen clic los usuarios</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.trackClicks}
                        onChange={(e) => setFormData({ ...formData, trackClicks: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-space-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-blue"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preview Tab */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                <h3 className="text-lg font-rajdhani font-semibold text-white mb-4">
                  Vista Previa del Email
                </h3>
                
                <div className="bg-white rounded-lg p-6 text-black">
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>De: {formData.fromName} &lt;{formData.fromEmail}&gt;</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mt-2">
                      {formData.subject || 'Asunto del email'}
                    </h2>
                  </div>
                  
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                      {formData.content.replace(/\{\{(\w+)\}\}/g, (match, variable) => {
                        const replacements: { [key: string]: string } = {
                          username: 'ComandanteEjemplo',
                          email: 'usuario@ejemplo.com',
                          universe: 'Galaxia Prima',
                          rank: '42',
                          points: '89,567'
                        };
                        return replacements[variable] || match;
                      }) || 'El contenido del email aparecerá aquí...'}
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500">
                    <p>© 2025 Galactic Empire. Todos los derechos reservados.</p>
                    <p className="mt-1">
                      Si no deseas recibir estos emails, puedes darte de baja 
                      <a href="#" className="text-blue-600 hover:underline ml-1">aquí</a>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <h4 className="font-rajdhani font-semibold text-white mb-2">Audiencia</h4>
                  <p className="text-2xl font-orbitron font-bold text-neon-blue">
                    {audiences.find(a => a.value === formData.targetAudience)?.count || '0'}
                  </p>
                  <p className="text-xs text-gray-400">destinatarios</p>
                </div>
                
                <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <h4 className="font-rajdhani font-semibold text-white mb-2">Costo Estimado</h4>
                  <p className="text-2xl font-orbitron font-bold text-neon-green">$0.05</p>
                  <p className="text-xs text-gray-400">por email</p>
                </div>
                
                <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <h4 className="font-rajdhani font-semibold text-white mb-2">Tiempo Estimado</h4>
                  <p className="text-2xl font-orbitron font-bold text-neon-orange">~15m</p>
                  <p className="text-xs text-gray-400">para envío completo</p>
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
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar Borrador
            </Button>
            <Button 
              variant="primary" 
              onClick={() => handleSave(true)}
              loading={saving}
              disabled={!formData.name || !formData.subject || !formData.content}
            >
              <Send className="w-4 h-4 mr-2" />
              {campaign ? 'Actualizar y Enviar' : formData.scheduledFor ? 'Programar Envío' : 'Enviar Ahora'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}