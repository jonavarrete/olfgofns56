import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { 
  Globe, 
  Building, 
  FlaskConical, 
  Rocket, 
  Shield,
  Pickaxe,
  Gem,
  Zap,
  Battery,
  ChevronDown,
  ChevronUp,
  Eye,
  Calculator,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { Planet, Buildings, Research, FleetShips, DefenseStructures } from '../types/game';

type ViewMode = 'buildings' | 'research' | 'fleet' | 'defenses' | 'resources' | 'production';

export default function Empire() {
  const { state, selectPlanet } = useGame();
  const { player } = state;
  const [viewMode, setViewMode] = useState<ViewMode>('buildings');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['summary']));

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  // Calculate totals
  const calculateTotals = () => {
    const totals = {
      resources: { metal: 0, crystal: 0, deuterium: 0, energy: 0 },
      production: { metal: 0, crystal: 0, deuterium: 0, energy: 0 },
      buildings: {} as Buildings,
      fleet: {} as FleetShips,
      fields: { used: 0, total: 0 }
    };

    player.planets.forEach(planet => {
      // Resources
      totals.resources.metal += planet.resources.metal;
      totals.resources.crystal += planet.resources.crystal;
      totals.resources.deuterium += planet.resources.deuterium;
      totals.resources.energy += planet.resources.energy;

      // Production
      totals.production.metal += planet.production.metal;
      totals.production.crystal += planet.production.crystal;
      totals.production.deuterium += planet.production.deuterium;
      totals.production.energy += planet.production.energy;

      // Buildings
      Object.entries(planet.buildings).forEach(([building, level]) => {
        const buildingKey = building as keyof Buildings;
        totals.buildings[buildingKey] = (totals.buildings[buildingKey] || 0) + level;
      });

      // Fields
      totals.fields.used += planet.usedFields;
      totals.fields.total += planet.fields;
    });

    // Fleet (from player total)
    totals.fleet = { ...player.fleet };

    return totals;
  };

  const totals = calculateTotals();

  const buildingNames: { [key in keyof Buildings]: string } = {
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
    researchLab: 'Laboratorio',
    terraformer: 'Terraformador',
    allianceDepot: 'Depósito de Alianza',
    missileSilo: 'Silo de Misiles'
  };

  const researchNames: { [key in keyof Research]: string } = {
    energyTechnology: 'Energía',
    laserTechnology: 'Láser',
    ionTechnology: 'Iónica',
    hyperspaceTechnology: 'Hiperespacio',
    plasmaTechnology: 'Plasma',
    combustionDrive: 'Combustión',
    impulseDrive: 'Impulso',
    hyperspaceDrive: 'Hiperespacio',
    espionageTechnology: 'Espionaje',
    computerTechnology: 'Computación',
    astrophysics: 'Astrofísica',
    intergalacticResearchNetwork: 'Red Intergaláctica',
    gravitonTechnology: 'Gravitón',
    weaponsTechnology: 'Armas',
    shieldingTechnology: 'Escudos',
    armourTechnology: 'Blindaje'
  };

  const shipNames: { [key in keyof FleetShips]: string } = {
    smallCargo: 'Carga Pequeña',
    largeCargo: 'Carga Grande',
    lightFighter: 'Cazador Ligero',
    heavyFighter: 'Cazador Pesado',
    cruiser: 'Crucero',
    battleship: 'Nave de Batalla',
    colonyShip: 'Colonizadora',
    recycler: 'Reciclador',
    espionageProbe: 'Sonda',
    bomber: 'Bombardero',
    destroyer: 'Destructor',
    deathstar: 'Estrella de la Muerte',
    battlecruiser: 'Crucero de Batalla'
  };

  const viewModes = [
    { key: 'buildings' as const, name: 'Edificios', icon: Building, color: 'neon-blue' },
    { key: 'research' as const, name: 'Investigación', icon: FlaskConical, color: 'neon-purple' },
    { key: 'fleet' as const, name: 'Flota', icon: Rocket, color: 'neon-green' },
    { key: 'resources' as const, name: 'Recursos', icon: Gem, color: 'neon-orange' },
    { key: 'production' as const, name: 'Producción', icon: TrendingUp, color: 'neon-blue' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            Vista del Imperio
          </h1>
          <p className="text-gray-400 mt-1">
            Resumen completo de todos tus planetas y recursos
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="px-4 py-2 bg-neon-blue/20 rounded-lg border border-neon-blue/30">
            <span className="text-neon-blue font-rajdhani font-medium">
              {player.planets.length} Planeta{player.planets.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:scale-105 transition-transform duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-gray-500/20 rounded-lg">
              <Pickaxe className="w-6 h-6 text-gray-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-400">Metal Total</p>
              <p className="text-xl font-orbitron font-bold text-white">
                {formatNumber(totals.resources.metal)}
              </p>
              <p className="text-xs text-gray-500">
                +{formatNumber(totals.production.metal)}/h
              </p>
            </div>
          </div>
        </Card>

        <Card className="hover:scale-105 transition-transform duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-neon-blue/20 rounded-lg">
              <Gem className="w-6 h-6 text-neon-blue" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-400">Cristal Total</p>
              <p className="text-xl font-orbitron font-bold text-white">
                {formatNumber(totals.resources.crystal)}
              </p>
              <p className="text-xs text-gray-500">
                +{formatNumber(totals.production.crystal)}/h
              </p>
            </div>
          </div>
        </Card>

        <Card className="hover:scale-105 transition-transform duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-neon-green/20 rounded-lg">
              <Zap className="w-6 h-6 text-neon-green" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-400">Deuterio Total</p>
              <p className="text-xl font-orbitron font-bold text-white">
                {formatNumber(totals.resources.deuterium)}
              </p>
              <p className="text-xs text-gray-500">
                +{formatNumber(totals.production.deuterium)}/h
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
              <p className="text-sm text-gray-400">Flota Total</p>
              <p className="text-xl font-orbitron font-bold text-white">
                {formatNumber(Object.values(totals.fleet).reduce((sum, count) => sum + count, 0))}
              </p>
              <p className="text-xs text-gray-500">
                {totals.fields.used}/{totals.fields.total} campos
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* View Mode Selector */}
      <Card>
        <div className="flex flex-wrap gap-2">
          {viewModes.map(mode => (
            <button
              key={mode.key}
              onClick={() => setViewMode(mode.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                viewMode === mode.key
                  ? `bg-${mode.color}/20 border-${mode.color}/50 text-${mode.color}`
                  : 'bg-space-700/50 border-space-600 text-gray-400 hover:text-white hover:border-neon-blue/30'
              }`}
            >
              <mode.icon className="w-4 h-4" />
              <span className="font-rajdhani font-medium">{mode.name}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Empire Table */}
      <Card title={`Vista de ${viewModes.find(m => m.key === viewMode)?.name}`} glowing>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-space-600">
                <th className="text-left py-3 px-2 text-gray-400 font-rajdhani font-medium sticky left-0 bg-card-gradient z-10">
                  Planeta
                </th>
                {viewMode === 'buildings' && Object.entries(buildingNames).map(([key, name]) => (
                  <th key={key} className="text-center py-3 px-2 text-gray-400 font-rajdhani font-medium min-w-[80px]">
                    {name}
                  </th>
                ))}
                {viewMode === 'research' && Object.entries(researchNames).map(([key, name]) => (
                  <th key={key} className="text-center py-3 px-2 text-gray-400 font-rajdhani font-medium min-w-[80px]">
                    {name}
                  </th>
                ))}
                {viewMode === 'fleet' && Object.entries(shipNames).map(([key, name]) => (
                  <th key={key} className="text-center py-3 px-2 text-gray-400 font-rajdhani font-medium min-w-[80px]">
                    {name}
                  </th>
                ))}
                {viewMode === 'resources' && (
                  <>
                    <th className="text-center py-3 px-2 text-gray-400 font-rajdhani font-medium min-w-[100px]">Metal</th>
                    <th className="text-center py-3 px-2 text-gray-400 font-rajdhani font-medium min-w-[100px]">Cristal</th>
                    <th className="text-center py-3 px-2 text-gray-400 font-rajdhani font-medium min-w-[100px]">Deuterio</th>
                    <th className="text-center py-3 px-2 text-gray-400 font-rajdhani font-medium min-w-[100px]">Energía</th>
                    <th className="text-center py-3 px-2 text-gray-400 font-rajdhani font-medium min-w-[80px]">Campos</th>
                  </>
                )}
                {viewMode === 'production' && (
                  <>
                    <th className="text-center py-3 px-2 text-gray-400 font-rajdhani font-medium min-w-[100px]">Metal/h</th>
                    <th className="text-center py-3 px-2 text-gray-400 font-rajdhani font-medium min-w-[100px]">Cristal/h</th>
                    <th className="text-center py-3 px-2 text-gray-400 font-rajdhani font-medium min-w-[100px]">Deuterio/h</th>
                    <th className="text-center py-3 px-2 text-gray-400 font-rajdhani font-medium min-w-[100px]">Energía/h</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {player.planets.map((planet, index) => (
                <tr 
                  key={planet.id} 
                  className={`border-b border-space-700 hover:bg-space-700/30 transition-colors ${
                    index % 2 === 0 ? 'bg-space-800/20' : ''
                  }`}
                >
                  <td className="py-3 px-2 sticky left-0 bg-card-gradient z-10">
                    <button
                      onClick={() => selectPlanet(planet)}
                      className="flex items-center space-x-3 hover:text-neon-blue transition-colors text-left"
                    >
                      <Globe className="w-4 h-4 text-neon-blue" />
                      <div>
                        <p className="text-white font-rajdhani font-medium">{planet.name}</p>
                        <p className="text-xs text-gray-400">{planet.coordinates}</p>
                        <p className="text-xs text-gray-500">
                          {planet.type === 'main' ? 'Principal' : 'Colonia'} • {planet.temperature}°C
                        </p>
                      </div>
                    </button>
                  </td>

                  {viewMode === 'buildings' && Object.keys(buildingNames).map(building => {
                    const level = planet.buildings[building as keyof Buildings] || 0;
                    return (
                      <td key={building} className="text-center py-3 px-2">
                        <span className={`font-rajdhani font-medium ${
                          level > 0 ? 'text-white' : 'text-gray-600'
                        }`}>
                          {level > 0 ? level : '-'}
                        </span>
                      </td>
                    );
                  })}

                  {viewMode === 'research' && Object.keys(researchNames).map(research => {
                    const level = player.research[research as keyof Research] || 0;
                    return (
                      <td key={research} className="text-center py-3 px-2">
                        <span className={`font-rajdhani font-medium ${
                          level > 0 ? 'text-white' : 'text-gray-600'
                        }`}>
                          {level > 0 ? level : '-'}
                        </span>
                      </td>
                    );
                  })}

                  {viewMode === 'fleet' && Object.keys(shipNames).map(ship => {
                    const count = player.fleet[ship as keyof FleetShips] || 0;
                    return (
                      <td key={ship} className="text-center py-3 px-2">
                        <span className={`font-rajdhani font-medium ${
                          count > 0 ? 'text-white' : 'text-gray-600'
                        }`}>
                          {count > 0 ? formatNumber(count) : '-'}
                        </span>
                      </td>
                    );
                  })}

                  {viewMode === 'resources' && (
                    <>
                      <td className="text-center py-3 px-2">
                        <span className="text-gray-300 font-rajdhani font-medium">
                          {formatNumber(planet.resources.metal)}
                        </span>
                      </td>
                      <td className="text-center py-3 px-2">
                        <span className="text-neon-blue font-rajdhani font-medium">
                          {formatNumber(planet.resources.crystal)}
                        </span>
                      </td>
                      <td className="text-center py-3 px-2">
                        <span className="text-neon-green font-rajdhani font-medium">
                          {formatNumber(planet.resources.deuterium)}
                        </span>
                      </td>
                      <td className="text-center py-3 px-2">
                        <span className="text-neon-orange font-rajdhani font-medium">
                          {formatNumber(planet.resources.energy)}
                        </span>
                      </td>
                      <td className="text-center py-3 px-2">
                        <span className="text-white font-rajdhani font-medium">
                          {planet.usedFields}/{planet.fields}
                        </span>
                        <div className="w-full bg-space-600 rounded-full h-1 mt-1">
                          <div 
                            className={`h-1 rounded-full transition-all duration-300 ${
                              planet.usedFields / planet.fields > 0.9 ? 'bg-neon-red' :
                              planet.usedFields / planet.fields > 0.7 ? 'bg-neon-orange' :
                              'bg-neon-green'
                            }`}
                            style={{ width: `${(planet.usedFields / planet.fields) * 100}%` }}
                          />
                        </div>
                      </td>
                    </>
                  )}

                  {viewMode === 'production' && (
                    <>
                      <td className="text-center py-3 px-2">
                        <span className="text-gray-300 font-rajdhani font-medium">
                          +{formatNumber(planet.production.metal)}
                        </span>
                      </td>
                      <td className="text-center py-3 px-2">
                        <span className="text-neon-blue font-rajdhani font-medium">
                          +{formatNumber(planet.production.crystal)}
                        </span>
                      </td>
                      <td className="text-center py-3 px-2">
                        <span className="text-neon-green font-rajdhani font-medium">
                          +{formatNumber(planet.production.deuterium)}
                        </span>
                      </td>
                      <td className="text-center py-3 px-2">
                        <span className="text-neon-orange font-rajdhani font-medium">
                          +{formatNumber(planet.production.energy)}
                        </span>
                      </td>
                    </>
                  )}
                </tr>
              ))}

              {/* Totals Row */}
              <tr className="border-t-2 border-neon-blue/30 bg-neon-blue/10">
                <td className="py-3 px-2 font-rajdhani font-bold text-neon-blue sticky left-0 bg-neon-blue/10 z-10">
                  TOTALES
                </td>

                {viewMode === 'buildings' && Object.keys(buildingNames).map(building => {
                  const total = totals.buildings[building as keyof Buildings] || 0;
                  return (
                    <td key={building} className="text-center py-3 px-2">
                      <span className="font-rajdhani font-bold text-neon-blue">
                        {total > 0 ? total : '-'}
                      </span>
                    </td>
                  );
                })}

                {viewMode === 'research' && Object.keys(researchNames).map(research => {
                  const level = player.research[research as keyof Research] || 0;
                  return (
                    <td key={research} className="text-center py-3 px-2">
                      <span className="font-rajdhani font-bold text-neon-purple">
                        {level > 0 ? level : '-'}
                      </span>
                    </td>
                  );
                })}

                {viewMode === 'fleet' && Object.keys(shipNames).map(ship => {
                  const count = totals.fleet[ship as keyof FleetShips] || 0;
                  return (
                    <td key={ship} className="text-center py-3 px-2">
                      <span className="font-rajdhani font-bold text-neon-green">
                        {count > 0 ? formatNumber(count) : '-'}
                      </span>
                    </td>
                  );
                })}

                {viewMode === 'resources' && (
                  <>
                    <td className="text-center py-3 px-2">
                      <span className="font-rajdhani font-bold text-gray-300">
                        {formatNumber(totals.resources.metal)}
                      </span>
                    </td>
                    <td className="text-center py-3 px-2">
                      <span className="font-rajdhani font-bold text-neon-blue">
                        {formatNumber(totals.resources.crystal)}
                      </span>
                    </td>
                    <td className="text-center py-3 px-2">
                      <span className="font-rajdhani font-bold text-neon-green">
                        {formatNumber(totals.resources.deuterium)}
                      </span>
                    </td>
                    <td className="text-center py-3 px-2">
                      <span className="font-rajdhani font-bold text-neon-orange">
                        {formatNumber(totals.resources.energy)}
                      </span>
                    </td>
                    <td className="text-center py-3 px-2">
                      <span className="font-rajdhani font-bold text-white">
                        {totals.fields.used}/{totals.fields.total}
                      </span>
                    </td>
                  </>
                )}

                {viewMode === 'production' && (
                  <>
                    <td className="text-center py-3 px-2">
                      <span className="font-rajdhani font-bold text-gray-300">
                        +{formatNumber(totals.production.metal)}
                      </span>
                    </td>
                    <td className="text-center py-3 px-2">
                      <span className="font-rajdhani font-bold text-neon-blue">
                        +{formatNumber(totals.production.crystal)}
                      </span>
                    </td>
                    <td className="text-center py-3 px-2">
                      <span className="font-rajdhani font-bold text-neon-green">
                        +{formatNumber(totals.production.deuterium)}
                      </span>
                    </td>
                    <td className="text-center py-3 px-2">
                      <span className="font-rajdhani font-bold text-neon-orange">
                        +{formatNumber(totals.production.energy)}
                      </span>
                    </td>
                  </>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Additional Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Estadísticas del Imperio">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-space-700/30 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">Nivel de Investigación</p>
                <p className="text-lg font-orbitron font-bold text-neon-purple">
                  {Object.values(player.research).reduce((sum, level) => sum + level, 0)}
                </p>
              </div>
              <div className="text-center p-3 bg-space-700/30 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">Poder Militar</p>
                <p className="text-lg font-orbitron font-bold text-neon-red">
                  {formatNumber(Object.values(player.fleet).reduce((sum, count) => sum + count, 0) * 1000)}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Eficiencia de Campos:</span>
                <span className="text-white font-rajdhani font-medium">
                  {((totals.fields.used / totals.fields.total) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Producción Total/h:</span>
                <span className="text-white font-rajdhani font-medium">
                  {formatNumber(totals.production.metal + totals.production.crystal + totals.production.deuterium)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Recursos Totales:</span>
                <span className="text-white font-rajdhani font-medium">
                  {formatNumber(totals.resources.metal + totals.resources.crystal + totals.resources.deuterium)}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Análisis de Desarrollo">
          <div className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">Desarrollo de Minas</span>
                  <span className="text-xs text-gray-500">
                    {((totals.buildings.metalMine + totals.buildings.crystalMine + totals.buildings.deuteriumSynthesizer) / (player.planets.length * 3 * 15) * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-space-600 rounded-full h-2">
                  <div 
                    className="bg-neon-blue h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min(100, (totals.buildings.metalMine + totals.buildings.crystalMine + totals.buildings.deuteriumSynthesizer) / (player.planets.length * 3 * 15) * 100)}%` 
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">Desarrollo Tecnológico</span>
                  <span className="text-xs text-gray-500">
                    {(Object.values(player.research).reduce((sum, level) => sum + level, 0) / (Object.keys(player.research).length * 10) * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-space-600 rounded-full h-2">
                  <div 
                    className="bg-neon-purple h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min(100, Object.values(player.research).reduce((sum, level) => sum + level, 0) / (Object.keys(player.research).length * 10) * 100)}%` 
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">Capacidad de Flota</span>
                  <span className="text-xs text-gray-500">
                    {Object.values(player.fleet).reduce((sum, count) => sum + count, 0)} naves
                  </span>
                </div>
                <div className="w-full bg-space-600 rounded-full h-2">
                  <div 
                    className="bg-neon-green h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min(100, Object.values(player.fleet).reduce((sum, count) => sum + count, 0) / 1000 * 100)}%` 
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-space-600">
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <BarChart3 className="w-4 h-4" />
                <span>
                  Puntuación total: <span className="text-white font-rajdhani font-medium">{formatNumber(player.points)}</span>
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}