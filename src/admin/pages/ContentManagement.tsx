import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminCard from '../components/AdminCard';
import Button from '../../components/UI/Button';
import PvEMissionEditor from '../components/PvEMissionEditor';
import AlienRaceEditor from '../components/AlienRaceEditor';
import GNNNewsEditor from '../components/GNNNewsEditor';
import { 
  Target, 
  Crown, 
  Radio, 
  Plus,
  Edit,
  Eye,
  Trash2,
  Search,
  Filter,
  Globe,
  Star,
  Sword,
  Package,
  Calendar,
  Activity
} from 'lucide-react';
import { AdminPvEMission, AdminAlienRace } from '../../types/admin';

type ContentTab = 'missions' | 'aliens' | 'news';

export default function ContentManagement() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ContentTab>('missions');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMissionEditor, setShowMissionEditor] = useState(false);
  const [showAlienEditor, setShowAlienEditor] = useState(false);
  const [showNewsEditor, setShowNewsEditor] = useState(false);
  const [editingMission, setEditingMission] = useState<AdminPvEMission | null>(null);
  const [editingAlien, setEditingAlien] = useState<AdminAlienRace | null>(null);
  const [missions, setMissions] = useState<AdminPvEMission[]>([]);
  const [aliens, setAliens] = useState<AdminAlienRace[]>([]);
  const [news, setNews] = useState<any[]>([]);

  React.useEffect(() => {
    loadContentData();
  }, [activeTab]);

  const loadContentData = async () => {
    // Load mock data based on active tab
    if (activeTab === 'missions') {
      const mockMissions: AdminPvEMission[] = [
        {
          id: '1',
          name: 'Primer Contacto',
          description: 'Establece comunicación con una civilización alienígena',
          type: 'diplomacy',
          difficulty: 'easy',
          requirements: { level: 5 },
          rewards: { experience: 1000 },
          duration: 30,
          cooldown: 24,
          location: 'Sector Alfa-7',
          lore: 'Una nueva civilización ha sido detectada...',
          image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
          active: true,
          createdBy: 'admin_1',
          createdAt: Date.now() - 86400000
        }
      ];
      setMissions(mockMissions);
    } else if (activeTab === 'aliens') {
      const mockAliens: AdminAlienRace[] = [
        {
          id: '1',
          name: 'Zephyrianos',
          description: 'Una raza antigua de seres energéticos',
          homeworld: 'Zephyr Prime',
          type: 'peaceful',
          traits: { technology: 9, military: 4, diplomacy: 8, trade: 7, expansion: 3 },
          specialties: ['Tecnología de Cristales'],
          weaknesses: ['Vulnerable a campos electromagnéticos'],
          preferredDiplomacy: 'alliance',
          rarity: 'uncommon',
          rewards: { technology: ['energyTechnology'] },
          lore: 'Los Zephyrianos evolucionaron en un mundo de cristales...',
          image: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
          active: true,
          createdBy: 'admin_1',
          createdAt: Date.now() - 86400000 * 2
        }
      ];
      setAliens(mockAliens);
    }
  };

  const tabs = [
    { id: 'missions', name: 'Misiones PvE', icon: Target, count: 45 },
    { id: 'aliens', name: 'Razas Alienígenas', icon: Crown, count: 23 },
    { id: 'news', name: 'Noticias GNN', icon: Radio, count: 156 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            Gestión de Contenido
          </h1>
          <p className="text-gray-400 font-rajdhani mt-1">
            Crear y administrar contenido del juego
          </p>
        </div>
        
        <Button 
          variant="primary"
          onClick={() => {
            if (activeTab === 'missions') setShowMissionEditor(true);
            else if (activeTab === 'aliens') setShowAlienEditor(true);
            else if (activeTab === 'news') setShowNewsEditor(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Crear {tabs.find(t => t.id === activeTab)?.name.slice(0, -1)}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-space-700/50 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as ContentTab)}
            className={`flex items-center space-x-2 flex-1 py-3 px-4 rounded-md font-rajdhani font-medium transition-all duration-200 ${
              activeTab === tab.id 
                ? 'bg-neon-blue text-white shadow-lg' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.name}</span>
            <span className="px-2 py-0.5 bg-current/20 rounded-full text-xs">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <AdminCard title="Filtros" icon={Filter} color="neon-green">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Buscar ${tabs.find(t => t.id === activeTab)?.name.toLowerCase()}...`}
              className="w-full pl-10 pr-4 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
            />
          </div>
          
          <select className="px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none">
            <option value="all">Todos</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
        </div>
      </AdminCard>

      {/* Content based on active tab */}
      {activeTab === 'missions' && (
        <AdminCard title="Misiones PvE" icon={Target} color="neon-purple">
          <div className="space-y-4">
            {/* Mission List */}
            <div className="space-y-3">
              {missions.map((mission) => (
                <div key={mission.id} className="p-4 bg-space-700/30 rounded-lg border border-space-600 hover:border-neon-blue/30 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-rajdhani font-semibold text-white">
                        {mission.name}
                      </h4>
                      <p className="text-xs text-gray-400">{mission.type} • {mission.difficulty}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={() => {
                          setEditingMission(mission);
                          setShowMissionEditor(true);
                        }}
                        className="p-1 text-gray-400 hover:text-neon-blue transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setMissions(prev => prev.filter(m => m.id !== mission.id))}
                        className="p-1 text-gray-400 hover:text-neon-red transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-3">
                    {mission.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">
                      Creada hace {Math.floor((Date.now() - mission.createdAt) / 86400000)}d
                    </span>
                    <span className={`px-2 py-1 rounded ${
                      mission.active ? 'bg-neon-green/20 text-neon-green' : 'bg-neon-red/20 text-neon-red'
                    }`}>
                      {mission.active ? 'Activa' : 'Inactiva'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AdminCard>
      )}

      {activeTab === 'aliens' && (
        <AdminCard title="Razas Alienígenas" icon={Crown} color="neon-orange">
          <div className="space-y-4">
            {/* Alien Race List */}
            <div className="space-y-3">
              {aliens.map((alien) => (
                <div key={alien.id} className="p-4 bg-space-700/30 rounded-lg border border-space-600 hover:border-neon-blue/30 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-rajdhani font-semibold text-white">
                        {alien.name}
                      </h4>
                      <p className="text-xs text-gray-400">{alien.type} • {alien.rarity}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={() => {
                          setEditingAlien(alien);
                          setShowAlienEditor(true);
                        }}
                        className="p-1 text-gray-400 hover:text-neon-blue transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setAliens(prev => prev.filter(a => a.id !== alien.id))}
                        className="p-1 text-gray-400 hover:text-neon-red transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-3">
                    {alien.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">
                      Creada hace {Math.floor((Date.now() - alien.createdAt) / 86400000)}d
                    </span>
                    <span className={`px-2 py-1 rounded ${
                      alien.active ? 'bg-neon-green/20 text-neon-green' : 'bg-neon-red/20 text-neon-red'
                    }`}>
                      {alien.active ? 'Activa' : 'Inactiva'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AdminCard>
      )}

      {activeTab === 'news' && (
        <AdminCard title="Noticias GNN" icon={Radio} color="neon-red">
          <div className="space-y-4">
            {/* News List */}
            <div className="space-y-3">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 bg-space-700/30 rounded-lg border border-space-600 hover:border-neon-blue/30 transition-colors">
                  <div className="w-10 h-10 bg-neon-red/20 rounded-lg flex items-center justify-center">
                    <Radio className="w-5 h-5 text-neon-red" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-rajdhani font-semibold text-white">
                          Noticia de Ejemplo {i + 1}
                        </h4>
                        <p className="text-sm text-gray-400">
                          Batalla épica en el sector Omega-7 deja 150K naves destruidas...
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-neon-red/20 text-neon-red rounded text-xs font-rajdhani font-medium">
                          ÚLTIMA HORA
                        </span>
                        <div className="flex items-center space-x-1">
                          <button className="p-1 text-gray-400 hover:text-neon-blue transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-neon-red transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>Universo: Galaxia Prima</span>
                      <span>Publicada hace 2h</span>
                      <span>Vistas: 1.2K</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AdminCard>
      )}

      {/* Editors */}
      {showMissionEditor && (
        <PvEMissionEditor
          mission={editingMission}
          onSave={(missionData) => {
            if (editingMission) {
              setMissions(prev => prev.map(m => m.id === editingMission.id ? { ...m, ...missionData } : m));
            } else {
              const newMission: AdminPvEMission = {
                id: Date.now().toString(),
                ...missionData,
                createdBy: 'current_admin_id',
                createdAt: Date.now()
              } as AdminPvEMission;
              setMissions(prev => [newMission, ...prev]);
            }
            setShowMissionEditor(false);
            setEditingMission(null);
          }}
          onClose={() => {
            setShowMissionEditor(false);
            setEditingMission(null);
          }}
        />
      )}

      {showAlienEditor && (
        <AlienRaceEditor
          alien={editingAlien}
          onSave={(alienData) => {
            if (editingAlien) {
              setAliens(prev => prev.map(a => a.id === editingAlien.id ? { ...a, ...alienData } : a));
            } else {
              const newAlien: AdminAlienRace = {
                id: Date.now().toString(),
                ...alienData,
                createdBy: 'current_admin_id',
                createdAt: Date.now()
              } as AdminAlienRace;
              setAliens(prev => [newAlien, ...prev]);
            }
            setShowAlienEditor(false);
            setEditingAlien(null);
          }}
          onClose={() => {
            setShowAlienEditor(false);
            setEditingAlien(null);
          }}
        />
      )}

      {showNewsEditor && (
        <GNNNewsEditor
          onSave={(newsData) => {
            console.log('Saving news:', newsData);
            setShowNewsEditor(false);
          }}
          onClose={() => setShowNewsEditor(false)}
        />
      )}
    </div>
  );
}