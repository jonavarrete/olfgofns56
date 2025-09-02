import React, { useState } from 'react';
import { PlayerAccount } from '../../types/admin';
import Button from '../../components/UI/Button';
import { 
  X, 
  Save, 
  User, 
  Mail, 
  Globe,
  Trophy,
  Rocket,
  Building,
  FlaskConical,
  Gem,
  Pickaxe,
  Zap,
  Battery,
  Crown,
  Shield,
  Target,
  Package,
  Eye,
  AlertTriangle,
  Plus,
  Minus
} from 'lucide-react';

interface UserEditorProps {
  user: PlayerAccount;
  onClose: () => void;
  onSave: (user: PlayerAccount) => void;
}

type EditorTab = 'profile' | 'resources' | 'buildings' | 'research' | 'fleet' | 'officers';

export default function UserEditor({ user, onClose, onSave }: UserEditorProps) {
  const [activeTab, setActiveTab] = useState<EditorTab>('profile');
  const [editedUser, setEditedUser] = useState<PlayerAccount>({ ...user });
  const [saving, setSaving] = useState(false);

  const tabs = [
    { id: 'profile', name: 'Perfil', icon: User },
    { id: 'resources', name: 'Recursos', icon: Gem },
    { id: 'buildings', name: 'Edificios', icon: Building },
    { id: 'research', name: 'Investigación', icon: FlaskConical },
    { id: 'fleet', name: 'Flota', icon: Rocket },
    { id: 'officers', name: 'Oficiales', icon: Crown },
  ];

  const handleSave = async () => {
    setSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSave(editedUser);
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: string, value: any) => {
    setEditedUser(prev => ({ ...prev, [field]: value }));
  };

  const updateNestedField = (parent: string, field: string, value: any) => {
    setEditedUser(prev => ({
      ...prev,
      [parent]: { ...prev[parent as keyof PlayerAccount], [field]: value }
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-6xl w-full max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-space-600 p-6">
          <div>
            <h2 className="text-xl font-orbitron font-bold text-white">
              Editor de Usuario
            </h2>
            <p className="text-gray-400 mt-1">
              Editando: {user.username} ({user.email})
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex h-[calc(95vh-140px)]">
          {/* Sidebar */}
          <div className="w-64 border-r border-space-600 p-4">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as EditorTab)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-neon-blue text-white'
                      : 'text-gray-400 hover:text-white hover:bg-space-700/50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="font-rajdhani font-medium">{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="text-lg font-rajdhani font-semibold text-white">
                  Información del Perfil
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                      Nombre de Usuario
                    </label>
                    <input
                      type="text"
                      value={editedUser.username}
                      onChange={(e) => updateField('username', e.target.value)}
                      className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editedUser.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                      Nivel
                    </label>
                    <input
                      type="number"
                      value={editedUser.level}
                      onChange={(e) => updateField('level', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                      min="1"
                      max="100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                      Experiencia
                    </label>
                    <input
                      type="number"
                      value={editedUser.experience}
                      onChange={(e) => updateField('experience', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                      min="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                      Puntos
                    </label>
                    <input
                      type="number"
                      value={editedUser.points}
                      onChange={(e) => updateField('points', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                      min="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                      Estado
                    </label>
                    <select
                      value={editedUser.status}
                      onChange={(e) => updateField('status', e.target.value)}
                      className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                    >
                      <option value="active">Activo</option>
                      <option value="banned">Baneado</option>
                      <option value="suspended">Suspendido</option>
                      <option value="vacation">Vacaciones</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-6">
                <h3 className="text-lg font-rajdhani font-semibold text-white">
                  Gestión de Recursos
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { key: 'metal', name: 'Metal', icon: Pickaxe, color: 'text-gray-400' },
                    { key: 'crystal', name: 'Cristal', icon: Gem, color: 'text-neon-blue' },
                    { key: 'deuterium', name: 'Deuterio', icon: Zap, color: 'text-neon-green' },
                    { key: 'energy', name: 'Energía', icon: Battery, color: 'text-neon-orange' },
                    { key: 'darkMatter', name: 'Materia Oscura', icon: Crown, color: 'text-neon-purple' },
                  ].map(({ key, name, icon: Icon, color }) => (
                    <div key={key} className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                      <div className="flex items-center space-x-2 mb-3">
                        <Icon className={`w-4 h-4 ${color}`} />
                        <span className="text-sm font-rajdhani font-medium text-white">
                          {name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateNestedField('resources', key, Math.max(0, editedUser.resources[key as keyof typeof editedUser.resources] - 10000))}
                          className="p-1 text-gray-400 hover:text-neon-red transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          value={editedUser.resources[key as keyof typeof editedUser.resources]}
                          onChange={(e) => updateNestedField('resources', key, parseInt(e.target.value) || 0)}
                          className="flex-1 px-2 py-1 bg-space-600 border border-space-500 rounded text-white text-sm focus:border-neon-blue focus:outline-none"
                          min="0"
                        />
                        <button
                          onClick={() => updateNestedField('resources', key, editedUser.resources[key as keyof typeof editedUser.resources] + 10000)}
                          className="p-1 text-gray-400 hover:text-neon-green transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add other tabs content here */}
            {activeTab !== 'profile' && activeTab !== 'resources' && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-space-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-rajdhani font-semibold text-gray-400 mb-2">
                  {tabs.find(t => t.id === activeTab)?.name} - En Desarrollo
                </h3>
                <p className="text-gray-500">
                  Esta sección estará disponible próximamente
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-space-600 p-6">
          <div className="flex justify-end space-x-3">
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