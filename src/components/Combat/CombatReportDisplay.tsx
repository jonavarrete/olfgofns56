import React, { useState } from 'react';
import { CombatReport, FleetShips, DefenseStructures } from '../../types/game';
import Card from '../UI/Card';
import { 
  Sword, 
  Shield, 
  Target, 
  TrendingUp, 
  Coins, 
  Recycle,
  ChevronDown,
  ChevronUp,
  Award,
  Zap
} from 'lucide-react';

interface CombatReportDisplayProps {
  report: CombatReport;
}

const shipNames: { [key in keyof FleetShips]: string } = {
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
  battlecruiser: 'Crucero de Batalla',
};

const defenseNames: { [key in keyof DefenseStructures]: string } = {
  rocketLauncher: 'Lanzamisiles',
  lightLaser: 'Láser Ligero',
  heavyLaser: 'Láser Pesado',
  gaussCannon: 'Cañón Gauss',
  ionCannon: 'Cañón Iónico',
  plasmaTurret: 'Torreta de Plasma',
  smallShieldDome: 'Cúpula de Escudo Pequeña',
  largeShieldDome: 'Cúpula de Escudo Grande',
  antiBallisticMissiles: 'Misiles Antibalísticos',
  interplanetaryMissiles: 'Misiles Interplanetarios',
};

export default function CombatReportDisplay({ report }: CombatReportDisplayProps) {
  const [showRounds, setShowRounds] = useState(false);
  const [showFleetDetails, setShowFleetDetails] = useState(false);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const calculateTotalLosses = (losses: FleetShips | (FleetShips & DefenseStructures)) => {
    return Object.values(losses).reduce((sum, count) => sum + count, 0);
  };

  const getResultColor = (result: CombatReport['result']) => {
    switch (result) {
      case 'victory': return 'text-neon-green';
      case 'defeat': return 'text-neon-red';
      case 'draw': return 'text-neon-orange';
    }
  };

  const getResultText = (result: CombatReport['result']) => {
    switch (result) {
      case 'victory': return 'VICTORIA';
      case 'defeat': return 'DERROTA';
      case 'draw': return 'EMPATE';
    }
  };

  return (
    <div className="space-y-6">
      {/* Combat Result Header */}
      <div className={`p-4 rounded-lg border-2 ${
        report.result === 'victory' ? 'bg-neon-green/10 border-neon-green/30' :
        report.result === 'defeat' ? 'bg-neon-red/10 border-neon-red/30' :
        'bg-neon-orange/10 border-neon-orange/30'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg ${
              report.result === 'victory' ? 'bg-neon-green/20' :
              report.result === 'defeat' ? 'bg-neon-red/20' :
              'bg-neon-orange/20'
            }`}>
              <Award className={`w-6 h-6 ${getResultColor(report.result)}`} />
            </div>
            <div>
              <h3 className={`text-xl font-orbitron font-bold ${getResultColor(report.result)}`}>
                {getResultText(report.result)}
              </h3>
              <p className="text-sm text-gray-400">
                {report.rounds.length} ronda{report.rounds.length > 1 ? 's' : ''} de combate
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Reporte de Combate</p>
            <p className="text-xs text-gray-500">
              {new Date(report.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Participants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-space-700/30 rounded-lg p-4 border border-space-600">
          <div className="flex items-center space-x-3 mb-3">
            <Sword className="w-5 h-5 text-neon-blue" />
            <h4 className="font-rajdhani font-semibold text-white">Atacante</h4>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-300">{report.attacker.name}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Naves perdidas:</span>
              <span className="text-neon-red font-rajdhani font-medium">
                {calculateTotalLosses(report.attacker.losses)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-space-700/30 rounded-lg p-4 border border-space-600">
          <div className="flex items-center space-x-3 mb-3">
            <Shield className="w-5 h-5 text-neon-orange" />
            <h4 className="font-rajdhani font-semibold text-white">Defensor</h4>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-300">{report.defender.name}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Unidades perdidas:</span>
              <span className="text-neon-red font-rajdhani font-medium">
                {calculateTotalLosses(report.defender.losses)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-space-700/30 rounded-lg p-4 border border-space-600">
          <div className="flex items-center space-x-3 mb-3">
            <Coins className="w-5 h-5 text-neon-green" />
            <h4 className="font-rajdhani font-semibold text-white">Botín Capturado</h4>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Metal:</span>
              <span className="text-gray-300 font-rajdhani font-medium">
                {formatNumber(report.loot.metal)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Cristal:</span>
              <span className="text-neon-blue font-rajdhani font-medium">
                {formatNumber(report.loot.crystal)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Deuterio:</span>
              <span className="text-neon-green font-rajdhani font-medium">
                {formatNumber(report.loot.deuterium)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-space-700/30 rounded-lg p-4 border border-space-600">
          <div className="flex items-center space-x-3 mb-3">
            <Recycle className="w-5 h-5 text-neon-purple" />
            <h4 className="font-rajdhani font-semibold text-white">Campo de Escombros</h4>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Metal:</span>
              <span className="text-gray-300 font-rajdhani font-medium">
                {formatNumber(report.debrisField.metal)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Cristal:</span>
              <span className="text-neon-blue font-rajdhani font-medium">
                {formatNumber(report.debrisField.crystal)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fleet Details Toggle */}
      <div className="space-y-4">
        <button
          onClick={() => setShowFleetDetails(!showFleetDetails)}
          className="w-full flex items-center justify-between p-3 bg-space-700/30 rounded-lg border border-space-600 hover:border-neon-blue/30 transition-colors"
        >
          <span className="font-rajdhani font-medium text-white">
            Detalles de Flotas y Defensas
          </span>
          {showFleetDetails ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>

        {showFleetDetails && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Attacker Fleet */}
            <div className="space-y-4">
              <h4 className="font-rajdhani font-semibold text-white flex items-center">
                <Sword className="w-4 h-4 mr-2 text-neon-blue" />
                Flota Atacante
              </h4>
              
              <div className="bg-space-700/30 rounded-lg p-4 border border-space-600">
                <h5 className="text-sm font-rajdhani font-medium text-gray-400 mb-3">Flota Inicial</h5>
                <div className="space-y-1">
                  {Object.entries(report.attacker.fleet).map(([ship, count]) => {
                    if (count === 0) return null;
                    return (
                      <div key={ship} className="flex items-center justify-between text-xs">
                        <span className="text-gray-300">{shipNames[ship as keyof FleetShips]}</span>
                        <span className="text-white font-rajdhani font-medium">{formatNumber(count)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-neon-red/10 rounded-lg p-4 border border-neon-red/30">
                <h5 className="text-sm font-rajdhani font-medium text-neon-red mb-3">Pérdidas</h5>
                <div className="space-y-1">
                  {Object.entries(report.attacker.losses).map(([ship, count]) => {
                    if (count === 0) return null;
                    return (
                      <div key={ship} className="flex items-center justify-between text-xs">
                        <span className="text-gray-300">{shipNames[ship as keyof FleetShips]}</span>
                        <span className="text-neon-red font-rajdhani font-medium">-{formatNumber(count)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Defender Fleet and Defenses */}
            <div className="space-y-4">
              <h4 className="font-rajdhani font-semibold text-white flex items-center">
                <Shield className="w-4 h-4 mr-2 text-neon-orange" />
                Defensor
              </h4>
              
              <div className="bg-space-700/30 rounded-lg p-4 border border-space-600">
                <h5 className="text-sm font-rajdhani font-medium text-gray-400 mb-3">Flota Inicial</h5>
                <div className="space-y-1">
                  {Object.entries(report.defender.fleet).map(([ship, count]) => {
                    if (count === 0) return null;
                    return (
                      <div key={ship} className="flex items-center justify-between text-xs">
                        <span className="text-gray-300">{shipNames[ship as keyof FleetShips]}</span>
                        <span className="text-white font-rajdhani font-medium">{formatNumber(count)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-space-700/30 rounded-lg p-4 border border-space-600">
                <h5 className="text-sm font-rajdhani font-medium text-gray-400 mb-3">Defensas Iniciales</h5>
                <div className="space-y-1">
                  {Object.entries(report.defender.defenses).map(([defense, count]) => {
                    if (count === 0) return null;
                    return (
                      <div key={defense} className="flex items-center justify-between text-xs">
                        <span className="text-gray-300">{defenseNames[defense as keyof DefenseStructures]}</span>
                        <span className="text-white font-rajdhani font-medium">{formatNumber(count)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-neon-red/10 rounded-lg p-4 border border-neon-red/30">
                <h5 className="text-sm font-rajdhani font-medium text-neon-red mb-3">Pérdidas Totales</h5>
                <div className="space-y-1">
                  {Object.entries(report.defender.losses).map(([unit, count]) => {
                    if (count === 0) return null;
                    const isShip = unit in shipNames;
                    const name = isShip 
                      ? shipNames[unit as keyof FleetShips] 
                      : defenseNames[unit as keyof DefenseStructures];
                    return (
                      <div key={unit} className="flex items-center justify-between text-xs">
                        <span className="text-gray-300">{name}</span>
                        <span className="text-neon-red font-rajdhani font-medium">-{formatNumber(count)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Combat Rounds Toggle */}
      <div className="space-y-4">
        <button
          onClick={() => setShowRounds(!showRounds)}
          className="w-full flex items-center justify-between p-3 bg-space-700/30 rounded-lg border border-space-600 hover:border-neon-blue/30 transition-colors"
        >
          <span className="font-rajdhani font-medium text-white">
            Rondas de Combate ({report.rounds.length})
          </span>
          {showRounds ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>

        {showRounds && (
          <div className="space-y-3">
            {report.rounds.map((round, index) => (
              <div key={index} className="bg-space-700/30 rounded-lg p-4 border border-space-600">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-rajdhani font-semibold text-white">
                    Ronda {round.round}
                  </h5>
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                      <Zap className="w-3 h-3 text-neon-blue" />
                      <span className="text-gray-400">Daño Atacante:</span>
                      <span className="text-neon-blue font-rajdhani font-medium">
                        {formatNumber(round.attackerDamage)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Zap className="w-3 h-3 text-neon-orange" />
                      <span className="text-gray-400">Daño Defensor:</span>
                      <span className="text-neon-orange font-rajdhani font-medium">
                        {formatNumber(round.defenderDamage)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="text-xs font-rajdhani font-medium text-gray-400 mb-2">
                      Pérdidas Atacante
                    </h6>
                    <div className="space-y-1">
                      {Object.entries(round.attackerLosses).map(([ship, count]) => {
                        if (count === 0) return null;
                        return (
                          <div key={ship} className="flex items-center justify-between text-xs">
                            <span className="text-gray-300">{shipNames[ship as keyof FleetShips]}</span>
                            <span className="text-neon-red font-rajdhani font-medium">-{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h6 className="text-xs font-rajdhani font-medium text-gray-400 mb-2">
                      Pérdidas Defensor
                    </h6>
                    <div className="space-y-1">
                      {Object.entries(round.defenderLosses).map(([unit, count]) => {
                        if (count === 0) return null;
                        const isShip = unit in shipNames;
                        const name = isShip 
                          ? shipNames[unit as keyof FleetShips] 
                          : defenseNames[unit as keyof DefenseStructures];
                        return (
                          <div key={unit} className="flex items-center justify-between text-xs">
                            <span className="text-gray-300">{name}</span>
                            <span className="text-neon-red font-rajdhani font-medium">-{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="bg-space-700/20 rounded-lg p-4 border border-space-600">
        <h4 className="font-rajdhani font-semibold text-white mb-3 flex items-center">
          <TrendingUp className="w-4 h-4 mr-2 text-neon-blue" />
          Resumen del Combate
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-400">Total Botín</p>
            <p className="text-lg font-orbitron font-bold text-neon-green">
              {formatNumber(report.loot.metal + report.loot.crystal + report.loot.deuterium)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Escombros</p>
            <p className="text-lg font-orbitron font-bold text-neon-purple">
              {formatNumber(report.debrisField.metal + report.debrisField.crystal)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Rondas</p>
            <p className="text-lg font-orbitron font-bold text-white">
              {report.rounds.length}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Resultado</p>
            <p className={`text-lg font-orbitron font-bold ${getResultColor(report.result)}`}>
              {getResultText(report.result)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}