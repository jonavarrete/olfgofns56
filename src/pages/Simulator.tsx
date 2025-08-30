import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { 
  Calculator, 
  Sword, 
  Shield, 
  Target, 
  TrendingUp,
  BarChart3,
  Zap,
  Plus,
  Minus,
  Play,
  RotateCcw
} from 'lucide-react';
import { FleetShips, DefenseStructures, SimulationResult } from '../types/game';
import { CombatEngine } from '../utils/combatEngine';

export default function Simulator() {
  const { state } = useGame();
  const [attackerFleet, setAttackerFleet] = useState<FleetShips>({} as FleetShips);
  const [defenderFleet, setDefenderFleet] = useState<FleetShips>({} as FleetShips);
  const [defenderDefenses, setDefenderDefenses] = useState<DefenseStructures>({} as DefenseStructures);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const shipTypes = [
    { key: 'lightFighter', name: 'Cazador Ligero', attack: 50, shield: 10, armor: 400 },
    { key: 'heavyFighter', name: 'Cazador Pesado', attack: 150, shield: 25, armor: 1000 },
    { key: 'cruiser', name: 'Crucero', attack: 400, shield: 50, armor: 2700 },
    { key: 'battleship', name: 'Nave de Batalla', attack: 1000, shield: 200, armor: 6000 },
    { key: 'battlecruiser', name: 'Acorazado', attack: 700, shield: 400, armor: 7000 },
    { key: 'bomber', name: 'Bombardero', attack: 1000, shield: 500, armor: 7500 },
    { key: 'destroyer', name: 'Destructor', attack: 2000, shield: 500, armor: 11000 },
    { key: 'deathstar', name: 'Estrella de la Muerte', attack: 200000, shield: 50000, armor: 900000 },
  ];

  const defenseTypes = [
    { key: 'rocketLauncher', name: 'Lanzamisiles', attack: 80, shield: 20, armor: 200 },
    { key: 'lightLaser', name: 'Láser Ligero', attack: 100, shield: 25, armor: 200 },
    { key: 'heavyLaser', name: 'Láser Pesado', attack: 250, shield: 100, armor: 800 },
    { key: 'gaussCannon', name: 'Cañón Gauss', attack: 1100, shield: 200, armor: 3500 },
    { key: 'ionCannon', name: 'Cañón Iónico', attack: 150, shield: 500, armor: 800 },
    { key: 'plasmaTurret', name: 'Torreta de Plasma', attack: 3000, shield: 300, armor: 10000 },
  ];

  const updateFleetCount = (
    fleet: FleetShips,
    setFleet: React.Dispatch<React.SetStateAction<FleetShips>>,
    shipKey: string,
    delta: number
  ) => {
    setFleet(prev => ({
      ...prev,
      [shipKey]: Math.max(0, (prev[shipKey as keyof FleetShips] || 0) + delta)
    }));
  };

  const updateDefenseCount = (defenseKey: string, delta: number) => {
    setDefenderDefenses(prev => ({
      ...prev,
      [defenseKey]: Math.max(0, (prev[defenseKey as keyof DefenseStructures] || 0) + delta)
    }));
  };

  const runSimulation = async () => {
    setIsSimulating(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = CombatEngine.simulateCombat(
      attackerFleet,
      defenderFleet,
      defenderDefenses,
      1000
    );
    
    setSimulationResult(result);
    setIsSimulating(false);
  };

  const resetSimulator = () => {
    setAttackerFleet({} as FleetShips);
    setDefenderFleet({} as FleetShips);
    setDefenderDefenses({} as DefenseStructures);
    setSimulationResult(null);
  };

  const loadPlayerFleet = () => {
    setAttackerFleet(state.player.fleet);
  };

  const getTotalPower = (fleet: FleetShips, defenses?: DefenseStructures) => {
    let power = 0;
    
    Object.entries(fleet).forEach(([ship, count]) => {
      const shipData = shipTypes.find(s => s.key === ship);
      if (shipData && count > 0) {
        power += count * (shipData.attack + shipData.shield + shipData.armor);
      }
    });

    if (defenses) {
      Object.entries(defenses).forEach(([defense, count]) => {
        const defenseData = defenseTypes.find(d => d.key === defense);
        if (defenseData && count > 0) {
          power += count * (defenseData.attack + defenseData.shield + defenseData.armor);
        }
      });
    }

    return power;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            Simulador de Combate
          </h1>
          <p className="text-gray-400 mt-1">
            Simula batallas espaciales y calcula probabilidades de victoria
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary" onClick={resetSimulator}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reiniciar
          </Button>
          <Button variant="primary" onClick={loadPlayerFleet}>
            <Target className="w-4 h-4 mr-2" />
            Cargar Mi Flota
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Attacker Fleet */}
        <Card title="Flota Atacante" className="border-neon-red/30">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400">Poder Total:</span>
              <span className="font-orbitron font-bold text-neon-red">
                {getTotalPower(attackerFleet).toLocaleString()}
              </span>
            </div>
            
            {shipTypes.map((ship) => (
              <div key={ship.key} className="flex items-center justify-between p-3 bg-space-700/30 rounded-lg">
                <div>
                  <p className="text-sm font-rajdhani font-medium text-white">{ship.name}</p>
                  <p className="text-xs text-gray-400">
                    A:{ship.attack} • E:{ship.shield} • B:{ship.armor}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateFleetCount(attackerFleet, setAttackerFleet, ship.key, -1)}
                    className="w-6 h-6 bg-space-600 hover:bg-space-500 rounded flex items-center justify-center"
                  >
                    <Minus className="w-3 h-3 text-white" />
                  </button>
                  <span className="w-12 text-center text-sm font-rajdhani font-medium text-white">
                    {attackerFleet[ship.key as keyof FleetShips] || 0}
                  </span>
                  <button
                    onClick={() => updateFleetCount(attackerFleet, setAttackerFleet, ship.key, 1)}
                    className="w-6 h-6 bg-space-600 hover:bg-space-500 rounded flex items-center justify-center"
                  >
                    <Plus className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Defender */}
        <Card title="Defensor" className="border-neon-blue/30">
          <div className="space-y-6">
            {/* Defender Fleet */}
            <div>
              <h4 className="text-sm font-rajdhani font-semibold text-white mb-3">
                Flota Defensora
              </h4>
              <div className="space-y-2">
                {shipTypes.slice(0, 4).map((ship) => (
                  <div key={ship.key} className="flex items-center justify-between p-2 bg-space-700/20 rounded">
                    <span className="text-xs text-gray-300">{ship.name}</span>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => updateFleetCount(defenderFleet, setDefenderFleet, ship.key, -1)}
                        className="w-5 h-5 bg-space-600 hover:bg-space-500 rounded flex items-center justify-center"
                      >
                        <Minus className="w-2 h-2 text-white" />
                      </button>
                      <span className="w-8 text-center text-xs font-rajdhani text-white">
                        {defenderFleet[ship.key as keyof FleetShips] || 0}
                      </span>
                      <button
                        onClick={() => updateFleetCount(defenderFleet, setDefenderFleet, ship.key, 1)}
                        className="w-5 h-5 bg-space-600 hover:bg-space-500 rounded flex items-center justify-center"
                      >
                        <Plus className="w-2 h-2 text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Defenses */}
            <div>
              <h4 className="text-sm font-rajdhani font-semibold text-white mb-3">
                Defensas Planetarias
              </h4>
              <div className="space-y-2">
                {defenseTypes.map((defense) => (
                  <div key={defense.key} className="flex items-center justify-between p-2 bg-space-700/20 rounded">
                    <span className="text-xs text-gray-300">{defense.name}</span>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => updateDefenseCount(defense.key, -1)}
                        className="w-5 h-5 bg-space-600 hover:bg-space-500 rounded flex items-center justify-center"
                      >
                        <Minus className="w-2 h-2 text-white" />
                      </button>
                      <span className="w-8 text-center text-xs font-rajdhani text-white">
                        {defenderDefenses[defense.key as keyof DefenseStructures] || 0}
                      </span>
                      <button
                        onClick={() => updateDefenseCount(defense.key, 1)}
                        className="w-5 h-5 bg-space-600 hover:bg-space-500 rounded flex items-center justify-center"
                      >
                        <Plus className="w-2 h-2 text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-space-600 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Poder Total:</span>
                <span className="font-orbitron font-bold text-neon-blue">
                  {getTotalPower(defenderFleet, defenderDefenses).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Simulation Results */}
        <Card title="Resultados de Simulación" className="border-neon-green/30">
          <div className="space-y-4">
            <Button
              variant="success"
              onClick={runSimulation}
              loading={isSimulating}
              disabled={getTotalPower(attackerFleet) === 0 || getTotalPower(defenderFleet, defenderDefenses) === 0}
              className="w-full"
            >
              <Play className="w-4 h-4 mr-2" />
              {isSimulating ? 'Simulando...' : 'Ejecutar Simulación'}
            </Button>

            {simulationResult && (
              <div className="space-y-4">
                {/* Winner */}
                <div className={`p-4 rounded-lg border ${
                  simulationResult.winner === 'attacker' ? 'bg-neon-green/10 border-neon-green/30' :
                  simulationResult.winner === 'defender' ? 'bg-neon-blue/10 border-neon-blue/30' :
                  'bg-neon-orange/10 border-neon-orange/30'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Trophy className={`w-5 h-5 ${
                      simulationResult.winner === 'attacker' ? 'text-neon-green' :
                      simulationResult.winner === 'defender' ? 'text-neon-blue' :
                      'text-neon-orange'
                    }`} />
                    <span className="font-rajdhani font-semibold text-white">
                      {simulationResult.winner === 'attacker' ? 'Victoria del Atacante' :
                       simulationResult.winner === 'defender' ? 'Victoria del Defensor' :
                       'Empate'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Combate finalizado en {simulationResult.rounds} rondas
                  </p>
                </div>

                {/* Probabilities */}
                <div className="space-y-2">
                  <h4 className="text-sm font-rajdhani font-semibold text-white">
                    Probabilidades
                  </h4>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Atacante gana:</span>
                      <span className="text-neon-green font-rajdhani font-medium">
                        {simulationResult.probability.attackerWins.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Defensor gana:</span>
                      <span className="text-neon-blue font-rajdhani font-medium">
                        {simulationResult.probability.defenderWins.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Empate:</span>
                      <span className="text-neon-orange font-rajdhani font-medium">
                        {simulationResult.probability.draw.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Loot and Debris */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-neon-green/10 rounded-lg border border-neon-green/30">
                    <h5 className="text-xs font-rajdhani font-semibold text-neon-green mb-2">
                      Botín Promedio
                    </h5>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Metal:</span>
                        <span className="text-white">{simulationResult.loot.metal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cristal:</span>
                        <span className="text-white">{simulationResult.loot.crystal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Deuterio:</span>
                        <span className="text-white">{simulationResult.loot.deuterium.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-neon-purple/10 rounded-lg border border-neon-purple/30">
                    <h5 className="text-xs font-rajdhani font-semibold text-neon-purple mb-2">
                      Campo de Restos
                    </h5>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Metal:</span>
                        <span className="text-white">{simulationResult.debrisField.metal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cristal:</span>
                        <span className="text-white">{simulationResult.debrisField.crystal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}