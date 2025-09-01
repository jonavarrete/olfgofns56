import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { useGNN } from '../hooks/useGNN';
import Card from '../components/UI/Card';
import GNNNewsItem from '../components/GNN/GNNNewsItem';
import GNNPanel from '../components/GNN/GNNPanel';
import { 
  TrendingUp, 
  Activity, 
  Zap, 
  Users, 
  Rocket, 
  Building, 
  FlaskConical,
  Target,
  Clock,
  AlertTriangle,
  Wrench,
  Hammer,
  Factory,
  Radio,
  Eye
} from 'lucide-react';

export default function Dashboard() {
  const { state } = useGame();
  const { player, selectedPlanet, missions, constructionQueues } = state;
  
  // Get current universe and GNN data
  const currentUniverse = localStorage.getItem('selected_universe') || 'universe_1';
  const { state: gnnState, getBreakingNewsItems, markAsRead } = useGNN(currentUniverse, player.id);
  
  const [showGNNPanel, setShowGNNPanel] = useState(false);
  
  // Listen for GNN button clicks from header
  useEffect(() => {
    const handleOpenGNN = () => setShowGNNPanel(true);
    window.addEventListener('openGNN', handleOpenGNN);
    return () => window.removeEventListener('openGNN', handleOpenGNN);
  }, []);
  
  const breakingNews = getBreakingNewsItems();
  const recentNews = gnnState.news.slice(0, 3);

  const activeMissions = missions.filter(m => m.status === 'outbound' || m.status === 'returning');
  const totalFleetSize = Object.values(player.fleet).reduce((sum, count) => sum + count, 0);
  
  const productionPerHour = {
    metal: selectedPlanet.production.metal,
    crystal: selectedPlanet.production.crystal,
    deuterium: selectedPlanet.production.deuterium,
  };

  const researchLevel = Object.values(player.research).reduce((sum, level) => sum + level, 0);

  // Get active construction items
  const activeBuildings = constructionQueues.buildings.filter(item => 
    item.endTime > Date.now()
  );
  const activeResearch = constructionQueues.research.filter(item => 
    item.endTime > Date.now()
  );
  const activeShipyard = constructionQueues.shipyard.filter(item => 
    item.endTime > Date.now()
  );

  const formatTimeRemaining = (endTime: number) => {
    const remaining = Math.max(0, endTime - Date.now());
    const hours = Math.floor(remaining / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  const getProgressPercentage = (startTime: number, endTime: number) => {
    const total = endTime - startTime;
    const elapsed = Date.now() - startTime;
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  };

  const getBuildingName = (building: string) => {
    const names: { [key: string]: string } = {
      metalMine: 'Mina de Metal',
      crystalMine: 'Mina de Cristal',
      deuteriumSynthesizer: 'Sintetizador de Deuterio',
      solarPlant: 'Planta Solar',
      fusionReactor: 'Planta de Fusión',
      roboticsFactory: 'Fábrica de Robots',
      naniteFactory: 'Fábrica de Nanitas',
      shipyard: 'Hangar',
      metalStorage: 'Almacén de Metal',
      crystalStorage: 'Almacén de Cristal',
      deuteriumTank: 'Tanque de Deuterio',
      researchLab: 'Laboratorio de Investigación',
      terraformer: 'Terraformador',
      allianceDepot: 'Depósito de Alianza',
      missileSilo: 'Silo de Misiles'
    };
    return names[building] || building;
  };

  const getResearchName = (research: string) => {
    const names: { [key: string]: string } = {
      energyTechnology: 'Tecnología de Energía',
      laserTechnology: 'Tecnología Láser',
      ionTechnology: 'Tecnología Iónica',
      hyperspaceTechnology: 'Tecnología Hiperespacio',
      plasmaTechnology: 'Tecnología de Plasma',
      combustionDrive: 'Motor de Combustión',
      impulseDrive: 'Motor de Impulso',
      hyperspaceDrive: 'Motor Hiperespacio',
      espionageTechnology: 'Tecnología de Espionaje',
      computerTechnology: 'Tecnología de Computación',
      astrophysics: 'Astrofísica',
      intergalacticResearchNetwork: 'Red de Investigación Intergaláctica',
      gravitonTechnology: 'Tecnología Gravitón',
      weaponsTechnology: 'Tecnología de Armas',
      shieldingTechnology: 'Tecnología de Escudos',
      armourTechnology: 'Tecnología de Blindaje'
    };
    return names[research] || research;
  };

  const getShipName = (ship: string) => {
    const names: { [key: string]: string } = {
      smallCargo: 'Nave de Carga Pequeña',
      largeCargo: 'Nave de Carga Grande',
      lightFighter: 'Cazador Ligero',
      heavyFighter: 'Cazador Pesado',
      cruiser: 'Crucero',
      battleship: 'Nave de Batalla',
      colonyShip: 'Nave Colonizadora',
      recycler: 'Reciclador',
      espionageProbe: 'Sonda de Espionaje',
      bomber: 'Bombardero',
      destroyer: 'Destructor',
      deathstar: 'Estrella de la Muerte',
      battlecruiser: 'Crucero de Batalla'
    };
    return names[ship] || ship;
  };
  
  const formatTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    
    if (hours > 0) return `${hours}h`;
    return `${minutes}m`;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            Imperio Galáctico
          </h1>
          <p className="text-gray-400 mt-1">
            Comandante {player.username} • Rango #{player.rank}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="px-4 py-2 bg-neon-blue/20 rounded-lg border border-neon-blue/30">
            <span className="text-neon-blue font-rajdhani font-medium">
              Puntos: {player.points.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:scale-105 transition-transform duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-neon-blue/20 rounded-lg">
              <Building className="w-6 h-6 text-neon-blue" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-400">Campos Usados</p>
              <p className="text-2xl font-orbitron font-bold text-white">
                {selectedPlanet.usedFields}/{selectedPlanet.fields}
              </p>
            </div>
          </div>
        </Card>

        <Card className="hover:scale-105 transition-transform duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-neon-green/20 rounded-lg">
              <Rocket className="w-6 h-6 text-neon-green" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-400">Naves Totales</p>
              <p className="text-2xl font-orbitron font-bold text-white">
                {totalFleetSize.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        <Card className="hover:scale-105 transition-transform duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-neon-purple/20 rounded-lg">
              <FlaskConical className="w-6 h-6 text-neon-purple" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-400">Investigación</p>
              <p className="text-2xl font-orbitron font-bold text-white">
                {researchLevel}
              </p>
            </div>
          </div>
        </Card>

        <Card className="hover:scale-105 transition-transform duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-neon-orange/20 rounded-lg">
              <Target className="w-6 h-6 text-neon-orange" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-400">Misiones Activas</p>
              <p className="text-2xl font-orbitron font-bold text-white">
                {activeMissions.length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Construction Queues */}
      {(activeBuildings.length > 0 || activeResearch.length > 0 || activeShipyard.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Building Queue */}
          {activeBuildings.length > 0 && (
            <Card title="Cola de Construcción" glowing>
              <div className="space-y-3">
                {activeBuildings.slice(0, 3).map((item) => {
                  const progress = getProgressPercentage(item.startTime, item.endTime);
                  const isActive = Date.now() >= item.startTime;
                  
                  return (
                    <div key={item.id} className="p-3 bg-space-700/50 rounded-lg border border-space-600">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Building className="w-4 h-4 text-neon-blue" />
                          <div>
                            <p className="text-sm font-rajdhani font-medium text-white">
                              {getBuildingName(item.building)} Nv.{item.level}
                            </p>
                            <p className="text-xs text-gray-400">{item.planetName}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>{formatTimeRemaining(item.endTime)}</span>
                          </div>
                          {!isActive && (
                            <p className="text-xs text-neon-orange">En cola</p>
                          )}
                        </div>
                      </div>
                      {isActive && (
                        <div className="w-full bg-space-600 rounded-full h-2">
                          <div 
                            className="bg-neon-blue h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
                {activeBuildings.length > 3 && (
                  <p className="text-xs text-gray-400 text-center">
                    +{activeBuildings.length - 3} más en cola
                  </p>
                )}
              </div>
            </Card>
          )}

          {/* Research Queue */}
          {activeResearch.length > 0 && (
            <Card title="Cola de Investigación" glowing>
              <div className="space-y-3">
                {activeResearch.slice(0, 3).map((item) => {
                  const progress = getProgressPercentage(item.startTime, item.endTime);
                  const isActive = Date.now() >= item.startTime;
                  
                  return (
                    <div key={item.id} className="p-3 bg-space-700/50 rounded-lg border border-space-600">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <FlaskConical className="w-4 h-4 text-neon-purple" />
                          <div>
                            <p className="text-sm font-rajdhani font-medium text-white">
                              {getResearchName(item.research)} Nv.{item.level}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>{formatTimeRemaining(item.endTime)}</span>
                          </div>
                          {!isActive && (
                            <p className="text-xs text-neon-orange">En cola</p>
                          )}
                        </div>
                      </div>
                      {isActive && (
                        <div className="w-full bg-space-600 rounded-full h-2">
                          <div 
                            className="bg-neon-purple h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
                {activeResearch.length > 3 && (
                  <p className="text-xs text-gray-400 text-center">
                    +{activeResearch.length - 3} más en cola
                  </p>
                )}
              </div>
            </Card>
          )}

          {/* Shipyard Queue */}
          {activeShipyard.length > 0 && (
            <Card title="Cola del Astillero" glowing>
              <div className="space-y-3">
                {activeShipyard.slice(0, 3).map((item) => {
                  const progress = getProgressPercentage(item.startTime, item.endTime);
                  const isActive = Date.now() >= item.startTime;
                  
                  return (
                    <div key={item.id} className="p-3 bg-space-700/50 rounded-lg border border-space-600">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Factory className="w-4 h-4 text-neon-green" />
                          <div>
                            <p className="text-sm font-rajdhani font-medium text-white">
                              {item.quantity}x {getShipName(item.ship)}
                            </p>
                            <p className="text-xs text-gray-400">{item.planetName}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>{formatTimeRemaining(item.endTime)}</span>
                          </div>
                          {!isActive && (
                            <p className="text-xs text-neon-orange">En cola</p>
                          )}
                        </div>
                      </div>
                      {isActive && (
                        <div className="w-full bg-space-600 rounded-full h-2">
                          <div 
                            className="bg-neon-green h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
                {activeShipyard.length > 3 && (
                  <p className="text-xs text-gray-400 text-center">
                    +{activeShipyard.length - 3} más en cola
                  </p>
                )}
              </div>
            </Card>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Production Overview */}
        <Card title="Producción por Hora" glowing>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-gray-300">Metal</span>
              </div>
              <span className="font-rajdhani font-medium text-white">
                +{productionPerHour.metal.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-neon-blue rounded-full"></div>
                <span className="text-gray-300">Cristal</span>
              </div>
              <span className="font-rajdhani font-medium text-white">
                +{productionPerHour.crystal.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-neon-green rounded-full"></div>
                <span className="text-gray-300">Deuterio</span>
              </div>
              <span className="font-rajdhani font-medium text-white">
                +{productionPerHour.deuterium.toLocaleString()}
              </span>
            </div>
          </div>
        </Card>

        {/* Active Missions */}
        <Card title="Misiones Activas">
          <div className="space-y-4">
            {activeMissions.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No hay misiones activas</p>
              </div>
            ) : (
              activeMissions.slice(0, 3).map((mission) => (
                <div
                  key={mission.id}
                  className="flex items-center justify-between p-3 bg-space-700/50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      mission.status === 'outbound' ? 'bg-neon-orange' : 'bg-neon-blue'
                    } animate-pulse`}></div>
                    <div>
                      <p className="text-sm text-white capitalize">
                        {mission.type === 'attack' ? 'Ataque' : 
                         mission.type === 'transport' ? 'Transporte' : mission.type}
                      </p>
                      <p className="text-xs text-gray-400">
                        {mission.from} → {mission.to}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>
                        {Math.floor((mission.arrivalTime - Date.now()) / 60000)}m
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
        
        {/* GNN Breaking News */}
        <Card title="Galactic News Network" glowing>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 pb-3 border-b border-space-600">
              <div className="w-6 h-6 bg-neon-red/20 rounded flex items-center justify-center animate-pulse">
                <Radio className="w-4 h-4 text-neon-red" />
              </div>
              <div>
                <h4 className="font-rajdhani font-semibold text-white">GNN Live</h4>
                <p className="text-xs text-gray-400">Noticias galácticas en tiempo real</p>
              </div>
              <div className="flex-1 flex justify-end">
                <div className="w-1.5 h-1.5 bg-neon-red rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {gnnState.loading ? (
              <div className="text-center py-4">
                <Radio className="w-8 h-8 text-gray-600 mx-auto mb-2 animate-pulse" />
                <p className="text-xs text-gray-400">Cargando noticias...</p>
              </div>
            ) : recentNews.length === 0 ? (
              <div className="text-center py-4">
                <Radio className="w-8 h-8 text-gray-600 mx-auto mb-2 opacity-50" />
                <p className="text-xs text-gray-400">Sin noticias recientes</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentNews.map((news) => {
                  const isRead = news.readBy?.includes(player.id) || false;
                  return (
                    <div
                      key={news.id}
                      onClick={() => {
                        markAsRead(news.id);
                        setShowGNNPanel(true);
                      }}
                      className="p-3 bg-space-700/30 rounded border border-space-600 hover:border-neon-blue/30 cursor-pointer transition-all duration-200 group"
                    >
                      <div className="flex items-start space-x-2">
                        <div className={`w-1.5 h-1.5 rounded-full mt-2 ${
                          isRead ? 'bg-gray-600' : 'bg-neon-blue animate-pulse'
                        }`}></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`px-2 py-0.5 rounded text-xs font-rajdhani font-bold ${
                              news.priority === 'breaking' ? 'bg-neon-red/20 text-neon-red' :
                              news.priority === 'high' ? 'bg-neon-orange/20 text-neon-orange' :
                              'bg-neon-blue/20 text-neon-blue'
                            }`}>
                              {news.priority === 'breaking' ? 'ÚLTIMA HORA' :
                               news.priority === 'high' ? 'IMPORTANTE' : 'DESTACADO'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatTimeAgo(news.timestamp)}
                            </span>
                          </div>
                          <p className={`text-sm font-rajdhani font-medium line-clamp-2 group-hover:text-neon-blue transition-colors ${
                            isRead ? 'text-gray-400' : 'text-white'
                          }`}>
                            {news.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {gnnState.unreadCount > 3 && (
                  <div className="text-center pt-2 border-t border-space-600">
                    <p className="text-xs text-neon-blue font-rajdhani font-medium">
                      +{gnnState.unreadCount - 3} noticias más sin leer
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Planet Overview */}
      <Card title="Planetas del Imperio">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {player.planets.map((planet) => (
            <div
              key={planet.id}
              className={`p-4 rounded-lg border transition-all duration-200 hover:scale-105 ${
                planet.id === selectedPlanet.id
                  ? 'bg-neon-blue/10 border-neon-blue/50'
                  : 'bg-space-700/50 border-space-500 hover:border-neon-purple/50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-lg font-rajdhani font-medium text-white">
                    {planet.name}
                  </h4>
                  <p className="text-sm text-gray-400">{planet.coordinates}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {planet.usedFields}/{planet.fields} campos • {planet.temperature}°C
                  </p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${
                  planet.type === 'main'
                    ? 'bg-neon-blue/20 text-neon-blue'
                    : 'bg-neon-purple/20 text-neon-purple'
                }`}>
                  {planet.type === 'main' ? 'Principal' : 'Colonia'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      {/* GNN Panel Modal */}
      {showGNNPanel && (
        <GNNPanel
          onClose={() => setShowGNNPanel(false)}
          onNavigate={(type, data) => {
            // Handle navigation based on news type
            console.log('Navigate to:', type, data);
            setShowGNNPanel(false);
          }}
        />
      )}
    </div>
  );
}