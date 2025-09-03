import React, { useState } from 'react';
import { useAdminData } from '../hooks/useAdminData';
import AdminCard from '../components/AdminCard';
import Button from '../../components/UI/Button';
import { 
  Globe, 
  Plus, 
  Edit, 
  Trash2,
  Eye,
  Play,
  Pause,
  Settings,
  Users,
  Activity,
  Calendar,
  Zap,
  Shield,
  Sword,
  Crown,
  Package,
  Save,
  X,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { UniverseConfig } from '../../types/admin';

export default function UniverseManagement() {
  const { data: universes, loading, createItem, updateItem, deleteItem } = useAdminData<UniverseConfig>('universes');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUniverse, setEditingUniverse] = useState<UniverseConfig | null>(null);

  const getStatusColor = (status: UniverseConfig['status']) => {
    switch (status) {
      case 'active': return 'text-neon-green bg-neon-green/10 border-neon-green/30';
      case 'new': return 'text-neon-blue bg-neon-blue/10 border-neon-blue/30';
      case 'ending': return 'text-neon-orange bg-neon-orange/10 border-neon-orange/30';
      case 'maintenance': return 'text-neon-red bg-neon-red/10 border-neon-red/30';
    }
  };

  const getTypeColor = (type: UniverseConfig['type']) => {
    switch (type) {
      case 'standard': return 'text-gray-400';
      case 'speed': return 'text-neon-orange';
      case 'peaceful': return 'text-neon-green';
      case 'hardcore': return 'text-neon-red';
    }
  };

  const handleSaveUniverse = async (universeData: Partial<UniverseConfig>) => {
    try {
      if (editingUniverse) {
        await updateItem(editingUniverse.id, universeData);
        setEditingUniverse(null);
      } else {
        await createItem({
          ...universeData,
          createdBy: 'current_admin_id',
          createdAt: Date.now()
        } as any);
        setShowCreateForm(false);
      }
    } catch (error) {
      console.error('Error saving universe:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            Gestión de Universos
          </h1>
          <p className="text-gray-400 font-rajdhani mt-1">
            Crear y administrar universos de juego
          </p>
        </div>
        
        <Button 
          variant="primary"
          onClick={() => setShowCreateForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Crear Universo
        </Button>
      </div>

      {/* Universe Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AdminCard
          title="Universos Totales"
          value={universes.length.toString()}
          icon={Globe}
          color="neon-blue"
          subtitle="Configurados"
        />
        
        <AdminCard
          title="Activos"
          value={universes.filter(u => u.status === 'active').length.toString()}
          icon={CheckCircle}
          color="neon-green"
          subtitle="En funcionamiento"
        />
        
        <AdminCard
          title="En Mantenimiento"
          value={universes.filter(u => u.status === 'maintenance').length.toString()}
          icon={Settings}
          color="neon-orange"
          subtitle="Temporalmente cerrados"
        />
        
        <AdminCard
          title="Jugadores Totales"
          value="47.8K"
          icon={Users}
          color="neon-purple"
          subtitle="En todos los universos"
        />
      </div>

      {/* Universes List */}
      <AdminCard title="Lista de Universos" icon={Globe} color="neon-purple">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="animate-pulse p-4 bg-space-700/30 rounded border border-space-600">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-space-600 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-space-600 rounded w-1/3"></div>
                    <div className="h-3 bg-space-600 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {universes.map((universe) => (
              <div key={universe.id} className="p-4 bg-space-700/30 rounded-lg border border-space-600 hover:border-neon-blue/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-neon-blue/20 rounded-lg flex items-center justify-center">
                      <Globe className="w-6 h-6 text-neon-blue" />
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-rajdhani font-semibold text-white text-lg">
                          {universe.name}
                        </h4>
                        <span className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${getStatusColor(universe.status)}`}>
                          {universe.status.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${getTypeColor(universe.type)} bg-current/10`}>
                          {universe.type.toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-400 mb-2">
                        {universe.description}
                      </p>
                      
                      <div className="grid grid-cols-4 gap-4 text-xs">
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-400">
                            {universe.maxPlayers.toLocaleString()} max
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Zap className="w-3 h-3 text-neon-orange" />
                          <span className="text-gray-400">Velocidad x{universe.speed}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-400">
                            {new Date(universe.startDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Activity className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-400">
                            {Object.values(universe.features).filter(Boolean).length} características
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setEditingUniverse(universe)}
                      className="p-2 text-gray-400 hover:text-neon-blue transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-neon-green transition-colors"
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteItem(universe.id)}
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
        )}
      </AdminCard>

      {/* Create/Edit Form */}
      {(showCreateForm || editingUniverse) && (
        <UniverseEditor
          universe={editingUniverse}
          onSave={handleSaveUniverse}
          onClose={() => {
            setShowCreateForm(false);
            setEditingUniverse(null);
          }}
        />
      )}
    </div>
  );
}

interface UniverseEditorProps {
  universe?: UniverseConfig | null;
  onSave: (universe: Partial<UniverseConfig>) => void;
  onClose: () => void;
}

function UniverseEditor({ universe, onSave, onClose }: UniverseEditorProps) {
  const [formData, setFormData] = useState({
    name: universe?.name || '',
    description: universe?.description || '',
    type: universe?.type || 'standard' as UniverseConfig['type'],
    speed: universe?.speed || 1,
    maxPlayers: universe?.maxPlayers || 5000,
    status: universe?.status || 'new' as UniverseConfig['status'],
    startDate: universe?.startDate ? new Date(universe.startDate).toISOString().slice(0, 16) : '',
    endDate: universe?.endDate ? new Date(universe.endDate).toISOString().slice(0, 16) : '',
    features: universe?.features || {
      alliances: true,
      officers: true,
      expeditions: true,
      acs: true,
      trade: true,
    },
    settings: universe?.settings || {
      newbieProtection: 7,
      fleetSpeed: 1,
      economySpeed: 1,
      researchSpeed: 1,
      rapidFire: true,
      debrisField: 30,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSave({
      ...formData,
      startDate: new Date(formData.startDate).getTime(),
      endDate: formData.endDate ? new Date(formData.endDate).getTime() : undefined,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-6 border-b border-space-600">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-orbitron font-bold text-white">
              {universe ? 'Editar Universo' : 'Crear Nuevo Universo'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Nombre del Universo
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Tipo de Universo
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
              >
                <option value="standard">Estándar</option>
                <option value="speed">Velocidad</option>
                <option value="peaceful">Pacífico</option>
                <option value="hardcore">Hardcore</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
              rows={3}
              required
            />
          </div>

          {/* Settings */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Velocidad
              </label>
              <input
                type="number"
                value={formData.speed}
                onChange={(e) => setFormData({ ...formData, speed: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                min="1"
                max="10"
              />
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Máx. Jugadores
              </label>
              <input
                type="number"
                value={formData.maxPlayers}
                onChange={(e) => setFormData({ ...formData, maxPlayers: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                min="100"
                max="10000"
              />
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Estado
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
              >
                <option value="new">Nuevo</option>
                <option value="active">Activo</option>
                <option value="maintenance">Mantenimiento</option>
                <option value="ending">Finalizando</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Protección (días)
              </label>
              <input
                type="number"
                value={formData.settings.newbieProtection}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  settings: { ...formData.settings, newbieProtection: parseInt(e.target.value) }
                })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                min="0"
                max="30"
              />
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-rajdhani font-semibold text-white mb-4">
              Características del Universo
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { key: 'alliances', label: 'Alianzas', icon: Users },
                { key: 'officers', label: 'Oficiales', icon: Crown },
                { key: 'expeditions', label: 'Expediciones', icon: Globe },
                { key: 'acs', label: 'ACS', icon: Sword },
                { key: 'trade', label: 'Comercio', icon: Package },
              ].map(({ key, label, icon: Icon }) => (
                <div key={key} className="flex items-center space-x-3 p-3 bg-space-700/30 rounded border border-space-600">
                  <Icon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300 flex-1">{label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.features[key as keyof typeof formData.features]}
                      onChange={(e) => setFormData({
                        ...formData,
                        features: { ...formData.features, [key]: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-space-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Fecha de Inicio
              </label>
              <input
                type="datetime-local"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Fecha de Fin (opcional)
              </label>
              <input
                type="datetime-local"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-space-600">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              <Save className="w-4 h-4 mr-2" />
              {universe ? 'Actualizar' : 'Crear'} Universo
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}