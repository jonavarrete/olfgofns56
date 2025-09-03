import React, { useState } from 'react';
import Button from '../../components/UI/Button';
import { 
  X, 
  Save, 
  Bot,
  Settings,
  Activity,
  Users,
  MessageSquare,
  Send,
  TestTube,
  CheckCircle,
  AlertTriangle,
  Globe,
  Shield,
  Bell,
  Eye,
  Plus,
  Trash2,
  Edit,
  Copy,
  Zap,
  BarChart3,
  Clock,
  Target,
  Info,
  ExternalLink,
  RefreshCw,
  Hash,
  Key,
  Webhook
} from 'lucide-react';

interface TelegramBotManagerProps {
  onClose: () => void;
  onSave: (config: any) => void;
}

interface TelegramConfig {
  botToken: string;
  chatId: string;
  webhookUrl: string;
  notifications: {
    maintenance: boolean;
    events: boolean;
    violations: boolean;
    system_alerts: boolean;
    user_reports: boolean;
  };
  commands: TelegramCommand[];
  autoResponses: AutoResponse[];
  settings: {
    enableCommands: boolean;
    enableAutoResponses: boolean;
    adminOnly: boolean;
    rateLimitEnabled: boolean;
    rateLimitPerMinute: number;
  };
}

interface TelegramCommand {
  id: string;
  command: string;
  description: string;
  response: string;
  adminOnly: boolean;
  enabled: boolean;
}

interface AutoResponse {
  id: string;
  trigger: string;
  response: string;
  enabled: boolean;
}

export default function TelegramBotManager({ onClose, onSave }: TelegramBotManagerProps) {
  const [config, setConfig] = useState<TelegramConfig>({
    botToken: '',
    chatId: '',
    webhookUrl: 'https://api.galaxy.com/webhook/telegram',
    notifications: {
      maintenance: true,
      events: true,
      violations: true,
      system_alerts: true,
      user_reports: false,
    },
    commands: [
      {
        id: '1',
        command: '/status',
        description: 'Ver estado del servidor',
        response: '🟢 Servidor operativo\n📊 Carga: {{system_load}}%\n👥 Usuarios activos: {{active_users}}',
        adminOnly: false,
        enabled: true,
      },
      {
        id: '2',
        command: '/universes',
        description: 'Lista de universos activos',
        response: '🌌 Universos Activos:\n{{universe_list}}',
        adminOnly: false,
        enabled: true,
      },
      {
        id: '3',
        command: '/stats',
        description: 'Estadísticas globales (solo admins)',
        response: '📈 Estadísticas Globales:\n👥 Jugadores: {{total_players}}\n⚔️ Batallas: {{total_battles}}\n🏆 Alianzas: {{total_alliances}}',
        adminOnly: true,
        enabled: true,
      },
    ],
    autoResponses: [
      {
        id: '1',
        trigger: 'ayuda',
        response: '🤖 ¡Hola! Soy el bot de Galactic Empire.\n\nComandos disponibles:\n/status - Estado del servidor\n/universes - Lista de universos\n/help - Esta ayuda',
        enabled: true,
      },
    ],
    settings: {
      enableCommands: true,
      enableAutoResponses: true,
      adminOnly: false,
      rateLimitEnabled: true,
      rateLimitPerMinute: 10,
    }
  });

  const [activeTab, setActiveTab] = useState<'config' | 'commands' | 'responses' | 'stats'>('config');
  const [testMessage, setTestMessage] = useState('');
  const [testing, setTesting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'testing'>('disconnected');
  const [editingCommand, setEditingCommand] = useState<TelegramCommand | null>(null);
  const [editingResponse, setEditingResponse] = useState<AutoResponse | null>(null);

  const handleTestConnection = async () => {
    if (!config.botToken || !config.chatId) {
      alert('Por favor, configura el token del bot y el chat ID primero');
      return;
    }

    setTesting(true);
    setConnectionStatus('testing');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setConnectionStatus('connected');
    } catch (error) {
      setConnectionStatus('disconnected');
    } finally {
      setTesting(false);
    }
  };

  const handleSendTestMessage = async () => {
    if (!testMessage.trim()) return;
    
    setTesting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Mensaje de prueba enviado exitosamente');
      setTestMessage('');
    } catch (error) {
      alert('Error al enviar mensaje de prueba');
    } finally {
      setTesting(false);
    }
  };

  const addCommand = () => {
    const newCommand: TelegramCommand = {
      id: Date.now().toString(),
      command: '',
      description: '',
      response: '',
      adminOnly: false,
      enabled: true,
    };
    setEditingCommand(newCommand);
  };

  const editCommand = (command: TelegramCommand) => {
    setEditingCommand({ ...command });
  };

  const saveCommand = () => {
    if (!editingCommand) return;

    if (editingCommand.command && editingCommand.description && editingCommand.response) {
      setConfig(prev => ({
        ...prev,
        commands: prev.commands.find(c => c.id === editingCommand.id)
          ? prev.commands.map(c => c.id === editingCommand.id ? editingCommand : c)
          : [...prev.commands, editingCommand]
      }));
      setEditingCommand(null);
    }
  };

  const deleteCommand = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este comando?')) {
      setConfig(prev => ({
        ...prev,
        commands: prev.commands.filter(cmd => cmd.id !== id)
      }));
    }
  };

  const addAutoResponse = () => {
    const newResponse: AutoResponse = {
      id: Date.now().toString(),
      trigger: '',
      response: '',
      enabled: true,
    };
    setEditingResponse(newResponse);
  };

  const editAutoResponse = (response: AutoResponse) => {
    setEditingResponse({ ...response });
  };

  const saveAutoResponse = () => {
    if (!editingResponse) return;

    if (editingResponse.trigger && editingResponse.response) {
      setConfig(prev => ({
        ...prev,
        autoResponses: prev.autoResponses.find(r => r.id === editingResponse.id)
          ? prev.autoResponses.map(r => r.id === editingResponse.id ? editingResponse : r)
          : [...prev.autoResponses, editingResponse]
      }));
      setEditingResponse(null);
    }
  };

  const deleteAutoResponse = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta respuesta automática?')) {
      setConfig(prev => ({
        ...prev,
        autoResponses: prev.autoResponses.filter(resp => resp.id !== id)
      }));
    }
  };

  const handleSaveConfig = () => {
    onSave(config);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-space-600 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-neon-purple/20 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-neon-purple" />
            </div>
            <div>
              <h2 className="text-xl font-orbitron font-bold text-white">
                Configuración del Bot de Telegram
              </h2>
              <div className="flex items-center space-x-3 mt-1">
                <div className={`flex items-center space-x-2 ${
                  connectionStatus === 'connected' ? 'text-neon-green' :
                  connectionStatus === 'testing' ? 'text-neon-blue' : 'text-neon-red'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    connectionStatus === 'connected' ? 'bg-neon-green animate-pulse' :
                    connectionStatus === 'testing' ? 'bg-neon-blue animate-pulse' : 'bg-neon-red'
                  }`}></div>
                  <span className="text-sm font-rajdhani font-medium">
                    {connectionStatus === 'connected' ? 'CONECTADO' :
                     connectionStatus === 'testing' ? 'PROBANDO...' : 'DESCONECTADO'}
                  </span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400 text-sm">892 usuarios suscritos</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-space-600">
          <div className="flex space-x-1 p-2">
            {[
              { id: 'config', name: 'Configuración', icon: Settings },
              { id: 'commands', name: 'Comandos', icon: MessageSquare },
              { id: 'responses', name: 'Respuestas Auto', icon: Zap },
              { id: 'stats', name: 'Estadísticas', icon: BarChart3 },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-rajdhani font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-neon-purple text-white'
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
          {/* Configuration Tab */}
          {activeTab === 'config' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                      Token del Bot
                    </label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="password"
                        value={config.botToken}
                        onChange={(e) => setConfig({ ...config, botToken: e.target.value })}
                        className="w-full pl-10 pr-10 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none font-mono"
                        placeholder="123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefgh"
                      />
                      <button
                        type="button"
                        onClick={() => navigator.clipboard.writeText(config.botToken)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors"
                        title="Copiar token"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Obtén el token desde @BotFather en Telegram
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                      Chat ID
                    </label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={config.chatId}
                        onChange={(e) => setConfig({ ...config, chatId: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none font-mono"
                        placeholder="-1001234567890"
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      ID del grupo o canal donde enviar notificaciones
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                      Webhook URL
                    </label>
                    <div className="relative">
                      <Webhook className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="url"
                        value={config.webhookUrl}
                        onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                        placeholder="https://api.galaxy.com/webhook/telegram"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button 
                      variant="secondary" 
                      onClick={handleTestConnection}
                      loading={testing}
                      disabled={!config.botToken || !config.chatId}
                      className="flex-1"
                    >
                      <TestTube className="w-4 h-4 mr-2" />
                      Probar Conexión
                    </Button>
                    
                    <Button 
                      variant="primary" 
                      onClick={handleSaveConfig}
                      disabled={!config.botToken || !config.chatId}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Guardar
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-rajdhani font-semibold text-white">
                    Configuración General
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-space-700/30 rounded-lg border border-space-600">
                      <div>
                        <p className="font-rajdhani font-medium text-white">Comandos Habilitados</p>
                        <p className="text-sm text-gray-400">Permitir uso de comandos del bot</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.settings.enableCommands}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            settings: { ...prev.settings, enableCommands: e.target.checked }
                          }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-space-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-purple"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-space-700/30 rounded-lg border border-space-600">
                      <div>
                        <p className="font-rajdhani font-medium text-white">Respuestas Automáticas</p>
                        <p className="text-sm text-gray-400">Responder automáticamente a palabras clave</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.settings.enableAutoResponses}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            settings: { ...prev.settings, enableAutoResponses: e.target.checked }
                          }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-space-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-purple"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-space-700/30 rounded-lg border border-space-600">
                      <div>
                        <p className="font-rajdhani font-medium text-white">Limitación de Velocidad</p>
                        <p className="text-sm text-gray-400">Limitar mensajes por minuto</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.settings.rateLimitEnabled}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            settings: { ...prev.settings, rateLimitEnabled: e.target.checked }
                          }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-space-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-purple"></div>
                      </label>
                    </div>

                    {config.settings.rateLimitEnabled && (
                      <div className="p-3 bg-space-700/30 rounded-lg border border-space-600">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-400">Mensajes por minuto</span>
                          <span className="text-neon-blue font-rajdhani font-medium">
                            {config.settings.rateLimitPerMinute}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="30"
                          value={config.settings.rateLimitPerMinute}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            settings: { ...prev.settings, rateLimitPerMinute: parseInt(e.target.value) }
                          }))}
                          className="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-rajdhani font-semibold text-white">
                    Notificaciones Automáticas
                  </h3>
                  
                  <div className="space-y-3">
                    {Object.entries(config.notifications).map(([key, enabled]) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-space-700/30 rounded-lg border border-space-600">
                        <div>
                          <p className="font-rajdhani font-medium text-white capitalize">
                            {key.replace('_', ' ')}
                          </p>
                          <p className="text-sm text-gray-400">
                            {key === 'maintenance' ? 'Notificar sobre mantenimientos programados' :
                             key === 'events' ? 'Alertas sobre eventos especiales' :
                             key === 'violations' ? 'Reportes de violaciones de seguridad' :
                             key === 'system_alerts' ? 'Alertas críticas del sistema' :
                             'Reportes de usuarios problemáticos'}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={enabled}
                            onChange={(e) => setConfig(prev => ({
                              ...prev,
                              notifications: {
                                ...prev.notifications,
                                [key]: e.target.checked
                              }
                            }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-space-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-purple"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Test Message */}
              <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                <h3 className="text-lg font-rajdhani font-semibold text-white mb-4">
                  Enviar Mensaje de Prueba
                </h3>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    className="flex-1 px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                    placeholder="Escribe un mensaje de prueba..."
                  />
                  <Button 
                    variant="primary" 
                    onClick={handleSendTestMessage}
                    loading={testing}
                    disabled={!testMessage.trim() || connectionStatus !== 'connected'}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Commands Tab */}
          {activeTab === 'commands' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-rajdhani font-semibold text-white">
                  Comandos del Bot ({config.commands.length})
                </h3>
                <Button variant="primary" onClick={addCommand}>
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Comando
                </Button>
              </div>

              <div className="space-y-4">
                {config.commands.map((command) => (
                  <div key={command.id} className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <code className="px-2 py-1 bg-neon-purple/20 text-neon-purple rounded font-mono text-sm">
                            {command.command || '/comando'}
                          </code>
                          <span className="text-white font-rajdhani font-medium">
                            {command.description || 'Sin descripción'}
                          </span>
                          <div className="flex items-center space-x-2">
                            {command.adminOnly && (
                              <span className="px-2 py-0.5 bg-neon-red/20 text-neon-red rounded text-xs font-rajdhani font-medium">
                                ADMIN
                              </span>
                            )}
                            <span className={`px-2 py-0.5 rounded text-xs font-rajdhani font-medium ${
                              command.enabled ? 'bg-neon-green/20 text-neon-green' : 'bg-gray-500/20 text-gray-400'
                            }`}>
                              {command.enabled ? 'ACTIVO' : 'INACTIVO'}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 bg-space-800/50 p-2 rounded font-mono">
                          {command.response || 'Sin respuesta configurada'}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => editCommand(command)}
                          className="p-2 text-gray-400 hover:text-neon-blue transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteCommand(command.id)}
                          className="p-2 text-gray-400 hover:text-neon-red transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Command Editor Modal */}
              {editingCommand && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
                  <div className="bg-card-gradient border border-space-600 rounded-lg max-w-2xl w-full">
                    <div className="p-6 border-b border-space-600">
                      <h3 className="text-lg font-orbitron font-bold text-white">
                        {config.commands.find(c => c.id === editingCommand.id) ? 'Editar Comando' : 'Nuevo Comando'}
                      </h3>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                            Comando
                          </label>
                          <input
                            type="text"
                            value={editingCommand.command}
                            onChange={(e) => setEditingCommand({ ...editingCommand, command: e.target.value })}
                            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none font-mono"
                            placeholder="/comando"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                            Descripción
                          </label>
                          <input
                            type="text"
                            value={editingCommand.description}
                            onChange={(e) => setEditingCommand({ ...editingCommand, description: e.target.value })}
                            className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                            placeholder="Descripción del comando"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                          Respuesta
                        </label>
                        <textarea
                          value={editingCommand.response}
                          onChange={(e) => setEditingCommand({ ...editingCommand, response: e.target.value })}
                          className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                          rows={4}
                          placeholder="Respuesta del bot (usa {{variable}} para datos dinámicos)"
                        />
                      </div>

                      <div className="flex items-center space-x-6">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingCommand.adminOnly}
                            onChange={(e) => setEditingCommand({ ...editingCommand, adminOnly: e.target.checked })}
                            className="rounded border-space-600 bg-space-700 text-neon-red focus:ring-neon-red"
                          />
                          <span className="text-sm text-gray-300">Solo Administradores</span>
                        </label>

                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingCommand.enabled}
                            onChange={(e) => setEditingCommand({ ...editingCommand, enabled: e.target.checked })}
                            className="rounded border-space-600 bg-space-700 text-neon-green focus:ring-neon-green"
                          />
                          <span className="text-sm text-gray-300">Habilitado</span>
                        </label>
                      </div>
                    </div>

                    <div className="p-6 border-t border-space-600 flex justify-end space-x-3">
                      <Button variant="secondary" onClick={() => setEditingCommand(null)}>
                        Cancelar
                      </Button>
                      <Button 
                        variant="primary" 
                        onClick={saveCommand}
                        disabled={!editingCommand.command || !editingCommand.description || !editingCommand.response}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Guardar Comando
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Auto Responses Tab */}
          {activeTab === 'responses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-rajdhani font-semibold text-white">
                  Respuestas Automáticas ({config.autoResponses.length})
                </h3>
                <Button variant="primary" onClick={addAutoResponse}>
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Respuesta
                </Button>
              </div>

              <div className="space-y-4">
                {config.autoResponses.map((response) => (
                  <div key={response.id} className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="px-2 py-1 bg-neon-orange/20 text-neon-orange rounded font-mono text-sm">
                            {response.trigger || 'palabra_clave'}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-xs font-rajdhani font-medium ${
                            response.enabled ? 'bg-neon-green/20 text-neon-green' : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {response.enabled ? 'ACTIVO' : 'INACTIVO'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 bg-space-800/50 p-2 rounded">
                          {response.response || 'Sin respuesta configurada'}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => editAutoResponse(response)}
                          className="p-2 text-gray-400 hover:text-neon-blue transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteAutoResponse(response.id)}
                          className="p-2 text-gray-400 hover:text-neon-red transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Auto Response Editor Modal */}
              {editingResponse && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
                  <div className="bg-card-gradient border border-space-600 rounded-lg max-w-2xl w-full">
                    <div className="p-6 border-b border-space-600">
                      <h3 className="text-lg font-orbitron font-bold text-white">
                        {config.autoResponses.find(r => r.id === editingResponse.id) ? 'Editar Respuesta' : 'Nueva Respuesta'}
                      </h3>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <div>
                        <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                          Palabra Clave
                        </label>
                        <input
                          type="text"
                          value={editingResponse.trigger}
                          onChange={(e) => setEditingResponse({ ...editingResponse, trigger: e.target.value })}
                          className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                          placeholder="palabra clave que activará la respuesta"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                          Respuesta Automática
                        </label>
                        <textarea
                          value={editingResponse.response}
                          onChange={(e) => setEditingResponse({ ...editingResponse, response: e.target.value })}
                          className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                          rows={4}
                          placeholder="Respuesta que enviará el bot automáticamente"
                        />
                      </div>

                      <div className="flex items-center space-x-3">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingResponse.enabled}
                            onChange={(e) => setEditingResponse({ ...editingResponse, enabled: e.target.checked })}
                            className="rounded border-space-600 bg-space-700 text-neon-green focus:ring-neon-green"
                          />
                          <span className="text-sm text-gray-300">Habilitado</span>
                        </label>
                      </div>
                    </div>

                    <div className="p-6 border-t border-space-600 flex justify-end space-x-3">
                      <Button variant="secondary" onClick={() => setEditingResponse(null)}>
                        Cancelar
                      </Button>
                      <Button 
                        variant="primary" 
                        onClick={saveAutoResponse}
                        disabled={!editingResponse.trigger || !editingResponse.response}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Guardar Respuesta
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <Users className="w-8 h-8 text-neon-blue mx-auto mb-2" />
                  <p className="text-2xl font-orbitron font-bold text-white">892</p>
                  <p className="text-xs text-gray-400">Usuarios Totales</p>
                </div>
                
                <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <Activity className="w-8 h-8 text-neon-green mx-auto mb-2" />
                  <p className="text-2xl font-orbitron font-bold text-white">645</p>
                  <p className="text-xs text-gray-400">Activos (24h)</p>
                </div>
                
                <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <MessageSquare className="w-8 h-8 text-neon-purple mx-auto mb-2" />
                  <p className="text-2xl font-orbitron font-bold text-white">1.2K</p>
                  <p className="text-xs text-gray-400">Mensajes Enviados</p>
                </div>
                
                <div className="text-center p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <Zap className="w-8 h-8 text-neon-orange mx-auto mb-2" />
                  <p className="text-2xl font-orbitron font-bold text-white">156</p>
                  <p className="text-xs text-gray-400">Comandos Hoy</p>
                </div>
              </div>

              <div className="p-6 bg-space-700/30 rounded-lg border border-space-600">
                <h3 className="text-lg font-rajdhani font-semibold text-white mb-4">
                  Comandos Más Utilizados
                </h3>
                <div className="space-y-3">
                  {[
                    { command: '/status', uses: 234, description: 'Estado del servidor' },
                    { command: '/universes', uses: 189, description: 'Lista de universos' },
                    { command: '/help', uses: 156, description: 'Ayuda general' },
                    { command: '/stats', uses: 89, description: 'Estadísticas (admin)' },
                  ].map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-space-800/50 rounded border border-space-600">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-neon-purple/20 rounded flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-neon-purple" />
                        </div>
                        <div>
                          <p className="font-rajdhani font-medium text-white font-mono">{stat.command}</p>
                          <p className="text-xs text-gray-400">{stat.description}</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-white font-rajdhani font-bold">{stat.uses}</p>
                        <p className="text-xs text-gray-400">usos</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <h4 className="font-rajdhani font-semibold text-white mb-3">
                    Actividad por Hora
                  </h4>
                  <div className="space-y-2">
                    {Array.from({ length: 6 }, (_, i) => {
                      const hour = new Date().getHours() - i;
                      const activity = Math.floor(Math.random() * 50) + 10;
                      return (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            {hour >= 0 ? hour : 24 + hour}:00
                          </span>
                          <div className="flex-1 mx-3">
                            <div className="w-full bg-space-600 rounded-full h-1">
                              <div 
                                className="h-1 bg-neon-blue rounded-full"
                                style={{ width: `${activity}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-xs text-white font-rajdhani font-medium">
                            {activity}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <h4 className="font-rajdhani font-semibold text-white mb-3">
                    Tipos de Mensaje
                  </h4>
                  <div className="space-y-2">
                    {[
                      { type: 'Comandos', count: 456, color: 'neon-purple' },
                      { type: 'Notificaciones', count: 234, color: 'neon-blue' },
                      { type: 'Respuestas Auto', count: 123, color: 'neon-green' },
                      { type: 'Mensajes Admin', count: 67, color: 'neon-orange' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">{item.type}:</span>
                        <span className={`text-${item.color} font-rajdhani font-medium`}>
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}