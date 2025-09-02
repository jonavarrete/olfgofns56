import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminCard from '../components/AdminCard';
import Button from '../../components/UI/Button';
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
            const routes = {
              missions: '/admin/content/missions/create',
              aliens: '/admin/content/aliens/create',
              news: '/admin/content/news/create'
            };
            navigate(routes[activeTab]);
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="p-4 bg-space-700/30 rounded-lg border border-space-600 hover:border-neon-blue/30 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-rajdhani font-semibold text-white">
                        Misión de Ejemplo {i + 1}
                      </h4>
                      <p className="text-xs text-gray-400">Exploración • Dificultad Media</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button className="p-1 text-gray-400 hover:text-neon-blue transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-neon-red transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-3">
                    Explora un sector desconocido en busca de nuevos recursos...
                  </p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Creada hace 2d</span>
                    <span className="px-2 py-1 bg-neon-green/20 text-neon-green rounded">
                      Activa
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="p-4 bg-space-700/30 rounded-lg border border-space-600 hover:border-neon-blue/30 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-rajdhani font-semibold text-white">
                        Raza Ejemplo {i + 1}
                      </h4>
                      <p className="text-xs text-gray-400">Pacífica • Tecnológica</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button className="p-1 text-gray-400 hover:text-neon-blue transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-neon-red transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-3">
                    Una civilización avanzada especializada en tecnología...
                  </p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Creada hace 1w</span>
                    <span className="px-2 py-1 bg-neon-green/20 text-neon-green rounded">
                      Activa
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
    </div>
  );
}