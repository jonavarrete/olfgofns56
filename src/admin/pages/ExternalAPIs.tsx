import React, { useState } from 'react';
import { useAdminData } from '../hooks/useAdminData';
import AdminCard from '../components/AdminCard';
import Button from '../../components/UI/Button';
import { 
  ExternalLink, 
  Plus, 
  Edit, 
  Trash2,
  Eye,
  EyeOff,
  TestTube,
  CheckCircle,
  AlertTriangle,
  Bot,
  Mail,
  Webhook,
  BarChart3,
  Globe,
  Save,
  X
} from 'lucide-react';
import { ExternalAPI } from '../../types/admin';

export default function ExternalAPIs() {
  const { data: apis, loading, createItem, updateItem, deleteItem } = useAdminData<ExternalAPI>('apis');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingAPI, setEditingAPI] = useState<ExternalAPI | null>(null);
  const [showApiKey, setShowApiKey] = useState<{ [key: string]: boolean }>({});

  const apiTypes = [
    { value: 'telegram', label: 'Telegram Bot', icon: Bot, color: 'neon-blue' },
    { value: 'discord', label: 'Discord Bot', icon: Bot, color: 'neon-purple' },
    { value: 'email', label: 'Servicio Email', icon: Mail, color: 'neon-green' },
    { value: 'webhook', label: 'Webhook', icon: Webhook, color: 'neon-orange' },
    { value: 'analytics', label: 'Analytics', icon: BarChart3, color: 'neon-red' },
  ];

  const toggleApiKeyVisibility = (apiId: string) => {
    setShowApiKey(prev => ({ ...prev, [apiId]: !prev[apiId] }));
  };

  const testAPI = async (api: ExternalAPI) => {
    try {
      // Simulate API test
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`Conexión exitosa con ${api.name}`);
    } catch (error) {
      alert(`Error al conectar con ${api.name}`);
    }
  };

  const handleSaveAPI = async (apiData: Partial<ExternalAPI>) => {
    try {
      if (editingAPI) {
        await updateItem(editingAPI.id, apiData);
        setEditingAPI(null);
      } else {
        await createItem({
          ...apiData,
          createdBy: 'current_admin_id',
          createdAt: Date.now()
        } as any);
        setShowCreateForm(false);
      }
    } catch (error) {
      console.error('Error saving API:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            APIs Externas
          </h1>
          <p className="text-gray-400 font-rajdhani mt-1">
            Gestionar integraciones con servicios externos
          </p>
        </div>
        
        <Button 
          variant="primary"
          onClick={() => setShowCreateForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nueva API
        </Button>
      </div>

      {/* API Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AdminCard
          title="APIs Activas"
          value={apis.filter(api => api.active).length.toString()}
          icon={CheckCircle}
          color="neon-green"
          subtitle={`de ${apis.length} totales`}
        />
        
        <AdminCard
          title="Telegram Bots"
          value={apis.filter(api => api.type === 'telegram').length.toString()}
          icon={Bot}
          color="neon-blue"
          subtitle="Configurados"
        />
        
        <AdminCard
          title="Servicios Email"
          value={apis.filter(api => api.type === 'email').length.toString()}
          icon={Mail}
          color="neon-green"
          subtitle="Configurados"
        />
        
        <AdminCard
          title="Webhooks"
          value={apis.filter(api => api.type === 'webhook').length.toString()}
          icon={Webhook}
          color="neon-orange"
          subtitle="Configurados"
        />
      </div>

      {/* APIs List */}
      <AdminCard title="Lista de APIs" icon={ExternalLink} color="neon-purple">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="animate-pulse p-4 bg-space-700/30 rounded border border-space-600">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-space-600 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-space-600 rounded w-1/3"></div>
                    <div className="h-3 bg-space-600 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {apis.map((api) => {
              const apiType = apiTypes.find(t => t.value === api.type);
              return (
                <div key={api.id} className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg border bg-${apiType?.color}/20 border-${apiType?.color}/30`}>
                        {apiType && React.createElement(apiType.icon, {
                          className: `w-5 h-5 text-${apiType.color}`
                        })}
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-3">
                          <h4 className="font-rajdhani font-semibold text-white">
                            {api.name}
                          </h4>
                          <span className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${
                            api.active ? 'bg-neon-green/20 text-neon-green' : 'bg-neon-red/20 text-neon-red'
                          }`}>
                            {api.active ? 'ACTIVA' : 'INACTIVA'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          {apiType?.label} • {api.endpoint}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">API Key:</span>
                            <span className="text-xs text-gray-300 font-mono">
                              {showApiKey[api.id] ? api.apiKey : '••••••••••••••••'}
                            </span>
                            <button
                              onClick={() => toggleApiKeyVisibility(api.id)}
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              {showApiKey[api.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                            </button>
                          </div>
                          {api.lastUsed && (
                            <span className="text-xs text-gray-500">
                              Último uso: {new Date(api.lastUsed).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => testAPI(api)}
                        className="p-2 text-gray-400 hover:text-neon-green transition-colors"
                        title="Probar conexión"
                      >
                        <TestTube className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingAPI(api)}
                        className="p-2 text-gray-400 hover:text-neon-blue transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteItem(api.id)}
                        className="p-2 text-gray-400 hover:text-neon-red transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </AdminCard>

      {/* Create/Edit Form */}
      {(showCreateForm || editingAPI) && (
        <APIEditor
          api={editingAPI}
          onSave={handleSaveAPI}
          onClose={() => {
            setShowCreateForm(false);
            setEditingAPI(null);
          }}
        />
      )}
    </div>
  );
}

interface APIEditorProps {
  api?: ExternalAPI | null;
  onSave: (api: Partial<ExternalAPI>) => void;
  onClose: () => void;
}

function APIEditor({ api, onSave, onClose }: APIEditorProps) {
  const [formData, setFormData] = useState({
    name: api?.name || '',
    type: api?.type || 'telegram' as ExternalAPI['type'],
    endpoint: api?.endpoint || '',
    apiKey: api?.apiKey || '',
    active: api?.active ?? true,
    settings: api?.settings || {},
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-space-600">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-orbitron font-bold text-white">
              {api ? 'Editar API' : 'Nueva API Externa'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Nombre
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                placeholder="Nombre de la API"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Tipo
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                required
              >
                <option value="telegram">Telegram</option>
                <option value="discord">Discord</option>
                <option value="email">Email</option>
                <option value="webhook">Webhook</option>
                <option value="analytics">Analytics</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
              Endpoint
            </label>
            <input
              type="url"
              value={formData.endpoint}
              onChange={(e) => setFormData({ ...formData, endpoint: e.target.value })}
              className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
              placeholder="https://api.example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
              API Key
            </label>
            <input
              type="password"
              value={formData.apiKey}
              onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
              className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none font-mono"
              placeholder="API Key o Token"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
              Configuración (JSON)
            </label>
            <textarea
              value={JSON.stringify(formData.settings, null, 2)}
              onChange={(e) => {
                try {
                  setFormData({ ...formData, settings: JSON.parse(e.target.value) });
                } catch (error) {
                  // Invalid JSON, keep typing
                }
              }}
              className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none font-mono"
              rows={6}
              placeholder='{"setting1": "value1", "setting2": "value2"}'
            />
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="rounded border-space-600 bg-space-700 text-neon-blue focus:ring-neon-blue"
            />
            <label htmlFor="active" className="text-sm font-rajdhani font-medium text-gray-300">
              API Activa
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-space-600">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              <Save className="w-4 h-4 mr-2" />
              {api ? 'Actualizar' : 'Crear'} API
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}