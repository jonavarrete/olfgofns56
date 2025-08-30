import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { 
  Rocket, 
  Send, 
  ArrowRight, 
  Target, 
  Package, 
  Eye, 
  MapPin,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { Mission } from '../types/game';

export default function Fleet() {
  const { state, addMission } = useGame();
  const { player, selectedPlanet, missions } = state;
  const [selectedMissionType, setSelectedMissionType] = useState<Mission['type']>('attack');
  const [targetCoordinates, setTargetCoordinates] = useState('');
  const [selectedShips, setSelectedShips] = useState<{ [key: string]: number }>({});

  const missionTypes = [
    { type: 'attack' as const, name: 'Atacar', icon: Target, color: 'neon-red' },
    { type: 'transport' as const, name: 'Transportar', icon: Package, color: 'neon-blue' },
    { type: 'spy' as const, name: 'Espionar', icon: Eye, color: 'neon-purple' },
    { type: 'colonize' as const, name: 'Colonizar', icon: MapPin, color: 'neon-green' },
  ];

  const formatTimeRemaining = (timestamp: number) => {
    const remaining = timestamp - Date.now();
    if (remaining <= 0) return 'Completada';
    
    const hours = Math.floor(remaining / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  const getMissionStatusColor = (status: Mission['status']) => {
    switch (status) {
      case 'outbound': return 'text-neon-orange';
      case 'returning': return 'text-neon-blue';
      case 'completed': return 'text-neon-green';
      default: return 'text-gray-400';
    }
  };

  const updateShipQuantity = (shipKey: string, quantity: number) => {
    setSelectedShips(prev => ({
      ...prev,
      [shipKey]: Math.max(0, Math.min(quantity, player.fleet[shipKey as keyof typeof player.fleet] || 0))
    }));
  };

  const getTotalFleetSize = () => {
    return Object.values(selectedShips).reduce((sum, count) => sum + count, 0);
  };

  const handleSendMission = () => {
    if (!targetCoordinates || getTotalFleetSize() === 0) return;

    const newMission: Mission = {
      id: Date.now().toString(),
      type: selectedMissionType,
      from: selectedPlanet.coordinates,
      to: targetCoordinates,
      fleet: {
        smallCargo: selectedShips.smallCargo || 0,
        largeCargo: selectedShips.largeCargo || 0,
        lightFighter: selectedShips.lightFighter || 0,
        heavyFighter: selectedShips.heavyFighter || 0,
        cruiser: selectedShips.cruiser || 0,
        battleship: selectedShips.battleship || 0,
        colonyShip: selectedShips.colonyShip || 0,
        recycler: selectedShips.recycler || 0,
        espionageProbe: selectedShips.espionageProbe || 0,
        bomber: selectedShips.bomber || 0,
        destroyer: selectedShips.destroyer || 0,
        deathstar: selectedShips.deathstar || 0,
        battlecruiser: selectedShips.battlecruiser || 0,
      },
      arrivalTime: Date.now() + 3600000, // 1 hour
      returnTime: Date.now() + 7200000, // 2 hours
      status: 'outbound',
    };

    addMission(newMission);
    setSelectedShips({});
    setTargetCoordinates('');
  };

  const availableShips = Object.entries(player.fleet).filter(([_, count]) => count > 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            Gestión de Flotas
          </h1>
          <p className="text-gray-400 mt-1">
            {selectedPlanet.name} • {Object.values(player.fleet).reduce((sum, count) => sum + count, 0).toLocaleString()} naves totales
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Send Fleet */}
        <Card title="Enviar Flota" glowing>
          <div className="space-y-4">
            {/* Mission Type */}
            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-300 mb-2">
                Tipo de Misión
              </label>
              <div className="grid grid-cols-2 gap-2">
                {missionTypes.map(({ type, name, icon: Icon, color }) => (
                  <button
                    key={type}
                    onClick={() => setSelectedMissionType(type)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                      selectedMissionType === type
                        ? `bg-${color}/20 border-${color}/50 text-${color}`
                        : 'bg-space-700/50 border-space-600 text-gray-400 hover:border-space-500'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-rajdhani font-medium">{name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Target Coordinates */}
            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-300 mb-2">
                Coordenadas Objetivo
              </label>
              <input
                type="text"
                value={targetCoordinates}
                onChange={(e) => setTargetCoordinates(e.target.value)}
                placeholder="1:2:3"
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-blue/50 focus:outline-none"
              />
            </div>

            {/* Ship Selection */}
            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-300 mb-2">
                Seleccionar Naves ({getTotalFleetSize()} seleccionadas)
              </label>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {availableShips.map(([shipKey, available]) => (
                  <div key={shipKey} className="flex items-center justify-between p-3 bg-space-700/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Rocket className="w-4 h-4 text-neon-blue" />
                      <div>
                        <p className="text-sm font-rajdhani font-medium text-white">
                          {shipKey}
                        </p>
                        <p className="text-xs text-gray-400">
                          Disponibles: {available.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="0"
                        max={available}
                        value={selectedShips[shipKey] || 0}
                        onChange={(e) => updateShipQuantity(shipKey, parseInt(e.target.value) || 0)}
                        className="w-20 px-2 py-1 bg-space-600 border border-space-500 rounded text-white text-sm focus:border-neon-blue/50 focus:outline-none"
                      />
                      <button
                        onClick={() => updateShipQuantity(shipKey, available)}
                        className="px-2 py-1 bg-neon-blue/20 text-neon-blue rounded text-xs hover:bg-neon-blue/30 transition-colors"
                      >
                        Max
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="success"
              onClick={handleSendMission}
              disabled={!targetCoordinates || getTotalFleetSize() === 0}
              className="w-full"
            >
              <Send className="w-4 h-4 mr-2" />
              Enviar Misión
            </Button>
          </div>
        </Card>

        {/* Active Missions */}
        <Card title="Misiones Activas">
          <div className="space-y-4">
            {missions.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No hay misiones activas</p>
              </div>
            ) : (
              missions.map((mission) => (
                <div
                  key={mission.id}
                  className="p-4 bg-space-700/50 rounded-lg border border-space-600"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        mission.type === 'attack' ? 'bg-neon-red/20' :
                        mission.type === 'transport' ? 'bg-neon-blue/20' :
                        mission.type === 'spy' ? 'bg-neon-purple/20' :
                        'bg-neon-green/20'
                      }`}>
                        {mission.type === 'attack' ? <Target className="w-4 h-4 text-neon-red" /> :
                         mission.type === 'transport' ? <Package className="w-4 h-4 text-neon-blue" /> :
                         mission.type === 'spy' ? <Eye className="w-4 h-4 text-neon-purple" /> :
                         <MapPin className="w-4 h-4 text-neon-green" />}
                      </div>
                      <div>
                        <h4 className="font-rajdhani font-semibold text-white">
                          {mission.type === 'attack' ? 'Ataque' :
                           mission.type === 'transport' ? 'Transporte' :
                           mission.type === 'spy' ? 'Espionaje' :
                           mission.type === 'colonize' ? 'Colonización' : mission.type}
                        </h4>
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                          <span>{mission.from}</span>
                          <ArrowRight className="w-3 h-3" />
                          <span>{mission.to}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${
                      mission.status === 'outbound' ? 'bg-neon-orange/20 text-neon-orange' :
                      mission.status === 'returning' ? 'bg-neon-blue/20 text-neon-blue' :
                      'bg-neon-green/20 text-neon-green'
                    }`}>
                      {mission.status === 'outbound' ? 'En ruta' :
                       mission.status === 'returning' ? 'Regresando' :
                       'Completada'}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>
                          {mission.status === 'outbound' ? 
                            formatTimeRemaining(mission.arrivalTime) :
                            formatTimeRemaining(mission.returnTime)
                          }
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">
                        Naves: {Object.values(mission.fleet).reduce((sum, count) => sum + count, 0)}
                      </div>
                    </div>
                    {mission.status === 'outbound' && (
                      <Button variant="danger" size="sm">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Retirar
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Fleet Overview */}
      <Card title="Flota Actual">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {availableShips.map(([shipKey, count]) => (
            <div key={shipKey} className="text-center p-3 bg-space-700/30 rounded-lg">
              <Rocket className="w-8 h-8 mx-auto mb-2 text-neon-blue" />
              <p className="text-xs text-gray-400 mb-1">{shipKey}</p>
              <p className="text-lg font-rajdhani font-bold text-white">
                {count.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}