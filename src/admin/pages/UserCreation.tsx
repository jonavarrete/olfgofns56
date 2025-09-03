import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminData } from '../hooks/useAdminData';
import AdminCard from '../components/AdminCard';
import Button from '../../components/UI/Button';
import { 
  UserPlus, 
  Save, 
  User, 
  Mail, 
  Lock,
  Globe,
  Crown,
  Gem,
  Pickaxe,
  Zap,
  Battery,
  Building,
  FlaskConical,
  Rocket,
  ArrowLeft,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  Info,
  Shield
} from 'lucide-react';
import { PlayerAccount } from '../../types/admin';

export default function UserCreation() {
  const navigate = useNavigate();
  const { createItem } = useAdminData<PlayerAccount>('users');
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [formData, setFormData] = useState({
    // Basic Info
    username: '',
    email: '',
    password: '',
    universeId: 'universe_1',
    
    // Game Stats
    level: 1,
    experience: 0,
    rank: 1000,
    points: 0,
    alliance: '',
    
    // Resources
    metal: 500,
    crystal: 500,
    deuterium: 0,
    energy: 0,
    darkMatter: 0,
    
    // Status
    status: 'active' as PlayerAccount['status'],
    
    // Starting Planet
    planetName: 'Planeta Principal',
    planetCoordinates: '',
    planetSize: 163,
    planetTemperature: 25,
  });

  const universes = [
    { id: 'universe_1', name: 'Galaxia Prima' },
    { id: 'universe_2', name: 'Nebulosa Veloce' },
    { id: 'universe_3', name: 'Sector Pacífico' },
    { id: 'universe_4', name: 'Abismo Hardcore' },
    { id: 'universe_5', name: 'Nueva Frontera' },
    { id: 'universe_6', name: 'Legado Ancestral' },
  ];

  const generateRandomCoordinates = () => {
    const galaxy = Math.floor(Math.random() * 9) + 1;
    const system = Math.floor(Math.random() * 499) + 1;
    const position = Math.floor(Math.random() * 15) + 1;
    return `${galaxy}:${system}:${position}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      // Validation
      if (formData.username.length < 3) {
        throw new Error('El nombre de usuario debe tener al menos 3 caracteres');
      }
      
      if (!formData.email.includes('@')) {
        throw new Error('Email inválido');
      }
      
      if (formData.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      if (!formData.planetCoordinates) {
        setFormData(prev => ({ ...prev, planetCoordinates: generateRandomCoordinates() }));
      }

      // Create user account
      const newUser: Omit<PlayerAccount, 'id'> = {
        email: formData.email,
        username: formData.username,
        universeId: formData.universeId,
        level: formData.level,
        experience: formData.experience,
        rank: formData.rank,
        points: formData.points,
        alliance: formData.alliance || undefined,
        planets: [
          {
            id: '1',
            name: formData.planetName,
            coordinates: formData.planetCoordinates || generateRandomCoordinates(),
            type: 'main',
            temperature: formData.planetTemperature,
            size: formData.planetSize,
            fields: formData.planetSize,
            usedFields: 0,
            resources: {
              metal: formData.metal,
              crystal: formData.crystal,
              deuterium: formData.deuterium,
              energy: formData.energy,
              darkMatter: formData.darkMatter
            },
            buildings: {
              metalMine: 0,
              crystalMine: 0,
              deuteriumSynthesizer: 0,
              solarPlant: 0,
              fusionReactor: 0,
              roboticsFactory: 0,
              naniteFactory: 0,
              shipyard: 0,
              metalStorage: 0,
              crystalStorage: 0,
              deuteriumTank: 0,
              researchLab: 0,
              terraformer: 0,
              allianceDepot: 0,
              missileSilo: 0,
            },
            production: {
              metal: 30,
              crystal: 15,
              deuterium: 0,
              energy: 20,
            },
            debris: {
              metal: 0,
              crystal: 0,
              deuterium: 0,
              energy: 0,
              darkMatter: 0
            },
            moons: []
          }
        ],
        resources: {
          metal: formData.metal,
          crystal: formData.crystal,
          deuterium: formData.deuterium,
          energy: formData.energy,
          darkMatter: formData.darkMatter
        },
        research: {
          energyTechnology: 0,
          laserTechnology: 0,
          ionTechnology: 0,
          hyperspaceTechnology: 0,
          plasmaTechnology: 0,
          combustionDrive: 0,
          impulseDrive: 0,
          hyperspaceDrive: 0,
          espionageTechnology: 0,
          computerTechnology: 0,
          astrophysics: 0,
          intergalacticResearchNetwork: 0,
          gravitonTechnology: 0,
          weaponsTechnology: 0,
          shieldingTechnology: 0,
          armourTechnology: 0,
        },
        fleet: {
          smallCargo: 0,
          largeCargo: 0,
          lightFighter: 0,
          heavyFighter: 0,
          cruiser: 0,
          battleship: 0,
          colonyShip: 0,
          recycler: 0,
          espionageProbe: 0,
          bomber: 0,
          destroyer: 0,
          deathstar: 0,
          battlecruiser: 0,
        },
        officers: {
          darkMatter: formData.darkMatter,
          officers: []
        },
        status: formData.status,
        createdAt: Date.now(),
        lastLogin: Date.now(),
        ipAddress: '127.0.0.1',
        violations: [],
        timeline: [
          {
            id: '1',
            type: 'login',
            description: 'Cuenta creada por administrador',
            timestamp: Date.now(),
            metadata: { createdBy: 'admin' }
          }
        ]
      };

      await createItem(newUser as any);
      
      setMessage({ type: 'success', text: 'Usuario creado exitosamente' });
      
      // Reset form
      setTimeout(() => {
        navigate('/admin/users');
      }, 2000);

    } catch (error) {
      setMessage({ type: 'error', text: (error as Error).message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="secondary" onClick={() => navigate('/admin/users')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-3xl font-orbitron font-bold text-white">
              Crear Nuevo Usuario
            </h1>
            <p className="text-gray-400 font-rajdhani mt-1">
              Crear una nueva cuenta de jugador
            </p>
          </div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg border ${
          message.type === 'success' 
            ? 'bg-neon-green/10 border-neon-green/30' 
            : 'bg-neon-red/10 border-neon-red/30'
        }`}>
          <div className="flex items-center space-x-3">
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-neon-green" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-neon-red" />
            )}
            <span className={`font-rajdhani font-medium ${
              message.type === 'success' ? 'text-neon-green' : 'text-neon-red'
            }`}>
              {message.text}
            </span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <AdminCard title="Información Básica" icon={User} color="neon-blue">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Nombre de Usuario *
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                placeholder="SpaceCommander"
                required
                minLength={3}
                maxLength={20}
              />
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Correo Electrónico *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                placeholder="usuario@galaxy.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Contraseña *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Universo *
              </label>
              <select
                value={formData.universeId}
                onChange={(e) => setFormData({ ...formData, universeId: e.target.value })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                required
              >
                {universes.map(universe => (
                  <option key={universe.id} value={universe.id}>
                    {universe.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </AdminCard>

        {/* Game Statistics */}
        <AdminCard title="Estadísticas de Juego" icon={Crown} color="neon-purple">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Nivel
              </label>
              <input
                type="number"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) || 1 })}
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
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Rango Inicial
              </label>
              <input
                type="number"
                value={formData.rank}
                onChange={(e) => setFormData({ ...formData, rank: parseInt(e.target.value) || 1000 })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Puntos
              </label>
              <input
                type="number"
                value={formData.points}
                onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                min="0"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
              Alianza (opcional)
            </label>
            <input
              type="text"
              value={formData.alliance}
              onChange={(e) => setFormData({ ...formData, alliance: e.target.value })}
              className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
              placeholder="Nombre de la alianza"
            />
          </div>
        </AdminCard>

        {/* Starting Resources */}
        <AdminCard title="Recursos Iniciales" icon={Gem} color="neon-green">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                <Pickaxe className="w-4 h-4 inline mr-1" />
                Metal
              </label>
              <input
                type="number"
                value={formData.metal}
                onChange={(e) => setFormData({ ...formData, metal: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                <Gem className="w-4 h-4 inline mr-1" />
                Cristal
              </label>
              <input
                type="number"
                value={formData.crystal}
                onChange={(e) => setFormData({ ...formData, crystal: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                <Zap className="w-4 h-4 inline mr-1" />
                Deuterio
              </label>
              <input
                type="number"
                value={formData.deuterium}
                onChange={(e) => setFormData({ ...formData, deuterium: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                <Battery className="w-4 h-4 inline mr-1" />
                Energía
              </label>
              <input
                type="number"
                value={formData.energy}
                onChange={(e) => setFormData({ ...formData, energy: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                <Crown className="w-4 h-4 inline mr-1" />
                Materia Oscura
              </label>
              <input
                type="number"
                value={formData.darkMatter}
                onChange={(e) => setFormData({ ...formData, darkMatter: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                min="0"
              />
            </div>
          </div>
        </AdminCard>

        {/* Planet Configuration */}
        <AdminCard title="Configuración del Planeta Principal" icon={Globe} color="neon-orange">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Nombre del Planeta
              </label>
              <input
                type="text"
                value={formData.planetName}
                onChange={(e) => setFormData({ ...formData, planetName: e.target.value })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                placeholder="Planeta Principal"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Coordenadas (opcional)
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={formData.planetCoordinates}
                  onChange={(e) => setFormData({ ...formData, planetCoordinates: e.target.value })}
                  className="flex-1 px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                  placeholder="1:2:3"
                  pattern="\d{1,2}:\d{1,3}:\d{1,2}"
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setFormData({ ...formData, planetCoordinates: generateRandomCoordinates() })}
                >
                  Aleatorio
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Tamaño del Planeta
              </label>
              <input
                type="number"
                value={formData.planetSize}
                onChange={(e) => setFormData({ ...formData, planetSize: parseInt(e.target.value) || 163 })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                min="80"
                max="320"
              />
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Temperatura (°C)
              </label>
              <input
                type="number"
                value={formData.planetTemperature}
                onChange={(e) => setFormData({ ...formData, planetTemperature: parseInt(e.target.value) || 25 })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                min="-200"
                max="200"
              />
            </div>
          </div>
        </AdminCard>

        {/* Account Status */}
        <AdminCard title="Estado de la Cuenta" icon={Shield} color="neon-red">
          <div>
            <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
              Estado Inicial
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
            >
              <option value="active">Activo</option>
              <option value="vacation">Modo Vacaciones</option>
              <option value="suspended">Suspendido</option>
              <option value="banned">Baneado</option>
            </select>
          </div>

          <div className="mt-4 p-4 bg-neon-blue/10 border border-neon-blue/30 rounded-lg">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-neon-blue mt-0.5" />
              <div>
                <h4 className="font-rajdhani font-semibold text-white mb-1">
                  Información Importante
                </h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• El usuario recibirá un email de bienvenida automáticamente</li>
                  <li>• Las coordenadas se generarán aleatoriamente si no se especifican</li>
                  <li>• Los recursos iniciales pueden ajustarse según el tipo de universo</li>
                  <li>• El usuario podrá cambiar su contraseña en el primer login</li>
                </ul>
              </div>
            </div>
          </div>
        </AdminCard>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <Button 
            variant="secondary" 
            onClick={() => navigate('/admin/users')}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="primary"
            loading={saving}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Crear Usuario
          </Button>
        </div>
      </form>
    </div>
  );
}