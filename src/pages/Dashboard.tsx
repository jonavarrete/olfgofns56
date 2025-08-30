import React from 'react';
import { useGame } from '../context/GameContext';
import Card from '../components/UI/Card';
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
  AlertTriangle
} from 'lucide-react';

export default function Dashboard() {
  const { state } = useGame();
  const { player, selectedPlanet, missions } = state;

  const activeMissions = missions.filter(m => m.status === 'outbound' || m.status === 'returning');
  const totalFleetSize = Object.values(player.fleet).reduce((sum, count) => sum + count, 0);
  
  const productionPerHour = {
    metal: selectedPlanet.production.metal,
    crystal: selectedPlanet.production.crystal,
    deuterium: selectedPlanet.production.deuterium,
  };

  const researchLevel = Object.values(player.research).reduce((sum, level) => sum + level, 0);

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
    </div>
  );
}