import React, { useState, useEffect } from 'react';
import { useAdminData } from '../hooks/useAdminData';
import AdminCard from '../components/AdminCard';
import Button from '../../components/UI/Button';
import { 
  Settings, 
  Save, 
  Plus, 
  Edit, 
  Trash2,
  Search,
  Filter,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Info,
  Globe,
  Gamepad2,
  Shield,
  MessageSquare,
  Zap,
  X
} from 'lucide-react';
import { PlatformConfig } from '../../types/admin';

export default function PlatformConfigs() {
  const { data: configs, loading, createItem, updateItem, deleteItem } = useAdminData<PlatformConfig>('config');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | PlatformConfig['category']>('all');
  const [editingConfig, setEditingConfig] = useState<PlatformConfig | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const categories = [
    { value: 'general', label: 'General', icon: Settings },
    { value: 'gameplay', label: 'Gameplay', icon: Gamepad2 },
    { value: 'security', label: 'Seguridad', icon: Shield },
    { value: 'communication', label: 'Comunicación', icon: MessageSquare },
    { value: 'features', label: 'Características', icon: Zap },
  ];

  const filteredConfigs = configs.filter(config => {
    const matchesSearch = config.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         config.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || config.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSaveConfig = async (configData: Partial<PlatformConfig>) => {
    try {
      if (editingConfig) {
        await updateItem(editingConfig.id, configData);
        setEditingConfig(null);
      } else {
        await createItem({
          ...configData,
          updatedBy: 'current_admin_id',
          updatedAt: Date.now()
        } as any);
        setShowCreateForm(false);
      }
    } catch (error) {
      console.error('Error saving config:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            Configuración de Plataforma
          </h1>
          <p className="text-gray-400 font-rajdhani mt-1">
            Gestionar configuraciones del sistema
          </p>
        </div>
        
        <Button 
          variant="primary"
          onClick={() => setShowCreateForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nueva Configuración
        </Button>
      </div>

      {/* Filters */}
      <AdminCard title="Filtros" icon={Filter} color="neon-blue">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar configuraciones..."
              className="w-full pl-10 pr-4 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
            />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as any)}
            className="px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
          >
            <option value="all">Todas las categorías</option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
      </AdminCard>

      {/* Configurations List */}
      <AdminCard title="Configuraciones del Sistema" icon={Settings} color="neon-purple">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="animate-pulse p-4 bg-space-700/30 rounded border border-space-600">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-space-600 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-space-600 rounded w-1/3"></div>
                    <div className="h-3 bg-space-600 rounded w-2/3"></div>
                  </div>
                  <div className="w-20 h-8 bg-space-600 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredConfigs.map((config) => (
              <div key={config.id} className="p-4 bg-space-700/30 rounded-lg border border-space-600 hover:border-neon-blue/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded border ${
                      categories.find(c => c.value === config.category)?.value === 'security' ? 'bg-neon-red/20 border-neon-red/30 text-neon-red' :
                      categories.find(c => c.value === config.category)?.value === 'gameplay' ? 'bg-neon-green/20 border-neon-green/30 text-neon-green' :
                      'bg-neon-blue/20 border-neon-blue/30 text-neon-blue'
                    }`}>
                      {React.createElement(categories.find(c => c.value === config.category)?.icon || Settings, {
                        className: "w-4 h-4"
                      })}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-rajdhani font-semibold text-white">
                          {config.key}
                        </h4>
                        <span className="px-2 py-1 bg-space-600 text-gray-300 rounded text-xs font-rajdhani">
                          {config.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">
                        {config.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>Categoría: {categories.find(c => c.value === config.category)?.label}</span>
                        <span>Actualizado: {new Date(config.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-rajdhani font-medium text-white">
                        {config.type === 'boolean' ? (config.value ? 'Activado' : 'Desactivado') : String(config.value)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setEditingConfig(config)}
                        className="p-1 text-gray-400 hover:text-neon-blue transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteItem(config.id)}
                        className="p-1 text-gray-400 hover:text-neon-red transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>

      {/* Create/Edit Form Modal */}
      {(showCreateForm || editingConfig) && (
        <ConfigEditor
          config={editingConfig}
          onSave={handleSaveConfig}
          onClose={() => {
            setShowCreateForm(false);
            setEditingConfig(null);
          }}
        />
      )}
    </div>
  );
}

interface ConfigEditorProps {
  config?: PlatformConfig | null;
  onSave: (config: Partial<PlatformConfig>) => void;
  onClose: () => void;
}

function ConfigEditor({ config, onSave, onClose }: ConfigEditorProps) {
  const [formData, setFormData] = useState({
    category: config?.category || 'general' as PlatformConfig['category'],
    key: config?.key || '',
    value: config?.value || '',
    description: config?.description || '',
    type: config?.type || 'string' as PlatformConfig['type'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let processedValue = formData.value;
    if (formData.type === 'number') {
      processedValue = parseFloat(formData.value);
    } else if (formData.type === 'boolean') {
      processedValue = formData.value === 'true';
    } else if (formData.type === 'json') {
      try {
        processedValue = JSON.parse(formData.value);
      } catch (error) {
        alert('JSON inválido');
        return;
      }
    }

    onSave({
      ...formData,
      value: processedValue
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-2xl w-full">
        <div className="p-6 border-b border-space-600">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-orbitron font-bold text-white">
              {config ? 'Editar Configuración' : 'Nueva Configuración'}
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
                Categoría
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                required
              >
                <option value="general">General</option>
                <option value="gameplay">Gameplay</option>
                <option value="security">Seguridad</option>
                <option value="communication">Comunicación</option>
                <option value="features">Características</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Tipo de Valor
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                required
              >
                <option value="string">Texto</option>
                <option value="number">Número</option>
                <option value="boolean">Booleano</option>
                <option value="json">JSON</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
              Clave de Configuración
            </label>
            <input
              type="text"
              value={formData.key}
              onChange={(e) => setFormData({ ...formData, key: e.target.value })}
              className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
              placeholder="config_key"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
              Descripción
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
              placeholder="Descripción de la configuración"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
              Valor
            </label>
            {formData.type === 'boolean' ? (
              <select
                value={String(formData.value)}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
              >
                <option value="true">Verdadero</option>
                <option value="false">Falso</option>
              </select>
            ) : formData.type === 'json' ? (
              <textarea
                value={typeof formData.value === 'object' ? JSON.stringify(formData.value, null, 2) : formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none font-mono"
                rows={4}
                placeholder='{"key": "value"}'
                required
              />
            ) : (
              <input
                type={formData.type === 'number' ? 'number' : 'text'}
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                placeholder="Valor de configuración"
                required
              />
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-space-600">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              <Save className="w-4 h-4 mr-2" />
              {config ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}