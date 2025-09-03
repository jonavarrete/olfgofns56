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
  Minus,
  Factory,
  Warehouse,
  Cpu,
  Sword,
  Star,
  Award,
  Settings,
  Users
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

  const updateBuildingLevel = (building: string, level: number) => {
    setEditedUser(prev => ({
      ...prev,
      buildings: { ...prev.buildings, [building]: Math.max(0, level) }
    }));
  };

  const updateResearchLevel = (research: string, level: number) => {
    setEditedUser(prev => ({
      ...prev,
      research: { ...prev.research, [research]: Math.max(0, level) }
    }));
  };

  const updateFleetCount = (ship: string, count: number) => {
    setEditedUser(prev => ({
      ...prev,
      fleet: { ...prev.fleet, [ship]: Math.max(0, count) }
    }));
  };

  // Building definitions
  const buildings = [
    { key: 'metalMine', name: 'Mina de Metal', icon: Pickaxe, color: 'text-gray-400' },
    { key: 'crystalMine', name: 'Mina de Cristal', icon: Gem, color: 'text-neon-blue' },
    { key: 'deuteriumSynthesizer', name: 'Sintetizador de Deuterio', icon: Zap, color: 'text-neon-green' },
    { key: 'solarPlant', name: 'Planta Solar', icon: Battery, color: 'text-neon-orange' },
    { key: 'fusionReactor', name: 'Planta de Fusión', icon: Zap, color: 'text-neon-purple' },
    { key: 'roboticsFactory', name: 'Fábrica de Robots', icon: Factory, color: 'text-neon-blue' },
    { key: 'naniteFactory', name: 'Fábrica de Nanitas', icon: Cpu, color: 'text-neon-purple' },
    { key: 'shipyard', name: 'Hangar', icon: Rocket, color: 'text-neon-green' },
    { key: 'metalStorage', name: 'Almacén de Metal', icon: Warehouse, color: 'text-gray-400' },
    { key: 'crystalStorage', name: 'Almacén de Cristal', icon: Warehouse, color: 'text-neon-blue' },
    { key: 'deuteriumTank', name: 'Tanque de Deuterio', icon: Warehouse, color: 'text-neon-green' },
    { key: 'researchLab', name: 'Laboratorio', icon: FlaskConical, color: 'text-neon-purple' },
    { key: 'terraformer', name: 'Terraformador', icon: Globe, color: 'text-neon-orange' },
    { key: 'allianceDepot', name: 'Depósito de Alianza', icon: Users, color: 'text-neon-blue' },
    { key: 'missileSilo', name: 'Silo de Misiles', icon: Target, color: 'text-neon-red' },
  ];

  // Research definitions
  const research = [
    { key: 'energyTechnology', name: 'Tecnología de Energía', icon: Battery, color: 'text-neon-orange' },
    { key: 'laserTechnology', name: 'Tecnología Láser', icon: Zap, color: 'text-neon-red' },
    { key: 'ionTechnology', name: 'Tecnología Iónica', icon: Zap, color: 'text-neon-blue' },
    { key: 'hyperspaceTechnology', name: 'Tecnología Hiperespacio', icon: Star, color: 'text-neon-purple' },
    { key: 'plasmaTechnology', name: 'Tecnología de Plasma', icon: Zap, color: 'text-neon-green' },
    { key: 'combustionDrive', name: 'Motor de Combustión', icon: Rocket, color: 'text-neon-orange' },
    { key: 'impulseDrive', name: 'Motor de Impulso', icon: Rocket, color: 'text-neon-blue' },
    { key: 'hyperspaceDrive', name: 'Motor Hiperespacio', icon: Rocket, color: 'text-neon-purple' },
    { key: 'espionageTechnology', name: 'Tecnología de Espionaje', icon: Eye, color: 'text-neon-green' },
    { key: 'computerTechnology', name: 'Tecnología de Computación', icon: Cpu, color: 'text-neon-blue' },
    { key: 'astrophysics', name: 'Astrofísica', icon: Globe, color: 'text-neon-purple' },
    { key: 'intergalacticResearchNetwork', name: 'Red de Investigación', icon: Globe, color: 'text-neon-blue' },
    { key: 'gravitonTechnology', name: 'Tecnología Gravitón', icon: Star, color: 'text-neon-purple' },
    { key: 'weaponsTechnology', name: 'Tecnología de Armas', icon: Sword, color: 'text-neon-red' },
    { key: 'shieldingTechnology', name: 'Tecnología de Escudos', icon: Shield, color: 'text-neon-blue' },
    { key: 'armourTechnology', name: 'Tecnología de Blindaje', icon: Shield, color: 'text-gray-400' },
  ];

  // Fleet definitions
  const fleet = [
    { key: 'smallCargo', name: 'Nave de Carga Pequeña', icon: Package, color: 'text-gray-400' },
    { key: 'largeCargo', name: 'Nave de Carga Grande', icon: Package, color: 'text-neon-blue' },
    { key: 'lightFighter', name: 'Cazador Ligero', icon: Rocket, color: 'text-neon-green' },
    { key: 'heavyFighter', name: 'Cazador Pesado', icon: Rocket, color: 'text-neon-orange' },
    { key: 'cruiser', name: 'Crucero', icon: Rocket, color: 'text-neon-blue' },
    { key: 'battleship', name: 'Nave de Batalla', icon: Rocket, color: 'text-neon-red' },
    { key: 'colonyShip', name: 'Nave Colonizadora', icon: Globe, color: 'text-neon-green' },
    { key: 'recycler', name: 'Reciclador', icon: Package, color: 'text-neon-purple' },
    { key: 'espionageProbe', name: 'Sonda de Espionaje', icon: Eye, color: 'text-neon-green' },
    { key: 'bomber', name: 'Bombardero', icon: Target, color: 'text-neon-red' },
    { key: 'destroyer', name: 'Destructor', icon: Sword, color: 'text-neon-red' },
    { key: 'deathstar', name: 'Estrella de la Muerte', icon: Star, color: 'text-neon-purple' },
    { key: 'battlecruiser', name: 'Crucero de Batalla', icon: Crown, color: 'text-neon-orange' },
  ];

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

                  <div>
                    <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                      Alianza
                    </label>
                    <input
                      type="text"
                      value={editedUser.alliance || ''}
                      onChange={(e) => updateField('alliance', e.target.value)}
                      className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                      placeholder="Nombre de la alianza"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                      Rango
                    </label>
                    <input
                      type="number"
                      value={editedUser.rank}
                      onChange={(e) => updateField('rank', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                      min="1"
                    />
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

            {activeTab === 'buildings' && (
              <div className="space-y-6">
                <h3 className="text-lg font-rajdhani font-semibold text-white">
                  Gestión de Edificios
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {buildings.map(({ key, name, icon: Icon, color }) => (
                    <div key={key} className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                      <div className="flex items-center space-x-2 mb-3">
                        <Icon className={`w-4 h-4 ${color}`} />
                        <span className="text-sm font-rajdhani font-medium text-white">
                          {name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateBuildingLevel(key, (editedUser.buildings[key as keyof typeof editedUser.buildings] || 0) - 1)}
                          className="p-1 text-gray-400 hover:text-neon-red transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          value={editedUser.buildings[key as keyof typeof editedUser.buildings] || 0}
                          onChange={(e) => updateBuildingLevel(key, parseInt(e.target.value) || 0)}
                          className="flex-1 px-2 py-1 bg-space-600 border border-space-500 rounded text-white text-sm focus:border-neon-blue focus:outline-none text-center"
                          min="0"
                          max="50"
                        />
                        <button
                          onClick={() => updateBuildingLevel(key, (editedUser.buildings[key as keyof typeof editedUser.buildings] || 0) + 1)}
                          className="p-1 text-gray-400 hover:text-neon-green transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-center mt-2">
                        <span className="text-xs text-gray-400">
                          Nivel {editedUser.buildings[key as keyof typeof editedUser.buildings] || 0}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'research' && (
              <div className="space-y-6">
                <h3 className="text-lg font-rajdhani font-semibold text-white">
                  Gestión de Investigación
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {research.map(({ key, name, icon: Icon, color }) => (
                    <div key={key} className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                      <div className="flex items-center space-x-2 mb-3">
                        <Icon className={`w-4 h-4 ${color}`} />
                        <span className="text-sm font-rajdhani font-medium text-white">
                          {name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateResearchLevel(key, (editedUser.research[key as keyof typeof editedUser.research] || 0) - 1)}
                          className="p-1 text-gray-400 hover:text-neon-red transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          value={editedUser.research[key as keyof typeof editedUser.research] || 0}
                          onChange={(e) => updateResearchLevel(key, parseInt(e.target.value) || 0)}
                          className="flex-1 px-2 py-1 bg-space-600 border border-space-500 rounded text-white text-sm focus:border-neon-blue focus:outline-none text-center"
                          min="0"
                          max="25"
                        />
                        <button
                          onClick={() => updateResearchLevel(key, (editedUser.research[key as keyof typeof editedUser.research] || 0) + 1)}
                          className="p-1 text-gray-400 hover:text-neon-green transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-center mt-2">
                        <span className="text-xs text-gray-400">
                          Nivel {editedUser.research[key as keyof typeof editedUser.research] || 0}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'fleet' && (
              <div className="space-y-6">
                <h3 className="text-lg font-rajdhani font-semibold text-white">
                  Gestión de Flota
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fleet.map(({ key, name, icon: Icon, color }) => (
                    <div key={key} className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                      <div className="flex items-center space-x-2 mb-3">
                        <Icon className={`w-4 h-4 ${color}`} />
                        <span className="text-sm font-rajdhani font-medium text-white">
                          {name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateFleetCount(key, (editedUser.fleet[key as keyof typeof editedUser.fleet] || 0) - 1)}
                          className="p-1 text-gray-400 hover:text-neon-red transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          value={editedUser.fleet[key as keyof typeof editedUser.fleet] || 0}
                          onChange={(e) => updateFleetCount(key, parseInt(e.target.value) || 0)}
                          className="flex-1 px-2 py-1 bg-space-600 border border-space-500 rounded text-white text-sm focus:border-neon-blue focus:outline-none text-center"
                          min="0"
                        />
                        <button
                          onClick={() => updateFleetCount(key, (editedUser.fleet[key as keyof typeof editedUser.fleet] || 0) + 1)}
                          className="p-1 text-gray-400 hover:text-neon-green transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-center mt-2">
                        <span className="text-xs text-gray-400">
                          {editedUser.fleet[key as keyof typeof editedUser.fleet] || 0} unidades
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'officers' && (
              <div className="space-y-6">
                <h3 className="text-lg font-rajdhani font-semibold text-white">
                  Gestión de Oficiales
                </h3>
                
                {/* Dark Matter */}
                <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                  <div className="flex items-center space-x-2 mb-3">
                    <Crown className="w-5 h-5 text-neon-purple" />
                    <span className="text-lg font-rajdhani font-semibold text-white">
                      Materia Oscura
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateNestedField('officers', 'darkMatter', Math.max(0, editedUser.officers.darkMatter - 100))}
                      className="p-2 text-gray-400 hover:text-neon-red transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <input
                      type="number"
                      value={editedUser.officers.darkMatter}
                      onChange={(e) => updateNestedField('officers', 'darkMatter', parseInt(e.target.value) || 0)}
                      className="flex-1 px-4 py-2 bg-space-600 border border-space-500 rounded-lg text-white text-center focus:border-neon-purple focus:outline-none"
                      min="0"
                    />
                    <button
                      onClick={() => updateNestedField('officers', 'darkMatter', editedUser.officers.darkMatter + 100)}
                      className="p-2 text-gray-400 hover:text-neon-green transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-center text-sm text-gray-400 mt-2">
                    {editedUser.officers.darkMatter.toLocaleString()} unidades disponibles
                  </p>
                </div>

                {/* Officers List */}
                <div>
                  <h4 className="font-rajdhani font-semibold text-white mb-4">
                    Oficiales Contratados
                  </h4>
                  
                  {editedUser.officers.officers && editedUser.officers.officers.length > 0 ? (
                    <div className="space-y-3">
                      {editedUser.officers.officers.map((officer, index) => (
                        <div key={officer.id || index} className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-neon-purple/20 rounded-lg flex items-center justify-center">
                                <Crown className="w-5 h-5 text-neon-purple" />
                              </div>
                              <div>
                                <p className="font-rajdhani font-semibold text-white">
                                  {officer.type || 'Oficial'}
                                </p>
                                <div className="flex items-center space-x-3 text-xs text-gray-400">
                                  <span>Rango {officer.rank || 1}</span>
                                  <span>{officer.experience || 0} XP</span>
                                  <span className={officer.active ? 'text-neon-green' : 'text-neon-red'}>
                                    {officer.active ? 'Activo' : 'Inactivo'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => {
                                  const updatedOfficers = editedUser.officers.officers.map((off, i) => 
                                    i === index ? { ...off, active: !off.active } : off
                                  );
                                  updateNestedField('officers', 'officers', updatedOfficers);
                                }}
                                className={`p-2 rounded transition-colors ${
                                  officer.active 
                                    ? 'text-neon-green hover:text-neon-red' 
                                    : 'text-neon-red hover:text-neon-green'
                                }`}
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  const updatedOfficers = editedUser.officers.officers.filter((_, i) => i !== index);
                                  updateNestedField('officers', 'officers', updatedOfficers);
                                }}
                                className="p-2 text-gray-400 hover:text-neon-red transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Crown className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-400">No hay oficiales contratados</p>
                      <Button
                        variant="secondary"
                        className="mt-4"
                        onClick={() => {
                          const newOfficer = {
                            id: Date.now().toString(),
                            type: 'Comandante',
                            rank: 1,
                            active: true,
                            experience: 0
                          };
                          updateNestedField('officers', 'officers', [newOfficer]);
                        }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Agregar Oficial
                      </Button>
                    </div>
                  )}
                </div>

                {/* Add Officer Button */}
                {editedUser.officers.officers && editedUser.officers.officers.length > 0 && (
                  <div className="flex justify-center">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        const officerTypes = ['Comandante', 'Almirante', 'Ingeniero', 'Científico', 'Espía', 'Comerciante', 'Explorador', 'Tecnócrata'];
                        const randomType = officerTypes[Math.floor(Math.random() * officerTypes.length)];
                        const newOfficer = {
                          id: Date.now().toString(),
                          type: randomType,
                          rank: 1,
                          active: false,
                          experience: 0
                        };
                        updateNestedField('officers', 'officers', [...editedUser.officers.officers, newOfficer]);
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar Oficial
                    </Button>
                  </div>
                )}
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