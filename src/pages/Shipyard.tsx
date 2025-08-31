import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { 
  Rocket, 
  Package, 
  Sword, 
  Shield, 
  Eye, 
  Bomb,
  Clock,
  Plus,
  Wrench,
  Recycle,
  Minus
} from 'lucide-react';

interface ShipInfo {
  name: string;
  description: string;
  icon: React.ElementType;
  category: string;
  cost: { metal: number; crystal: number; deuterium: number };
  requirements?: { [key: string]: number };
}

const shipData: { [key: string]: ShipInfo } = {
  smallCargo: {
    name: 'Nave de Carga Pequeña',
    description: 'Transporte básico de recursos.',
    icon: Package,
    category: 'Civil',
    cost: { metal: 2000, crystal: 2000, deuterium: 0 },
    requirements: { combustionDrive: 2 },
  },
  largeCargo: {
    name: 'Nave de Carga Grande',
    description: 'Transporte de gran capacidad.',
    icon: Package,
    category: 'Civil',
    cost: { metal: 6000, crystal: 6000, deuterium: 0 },
    requirements: { combustionDrive: 6 },
  },
  lightFighter: {
    name: 'Cazador Ligero',
    description: 'Nave de combate rápida y ágil.',
    icon: Sword,
    category: 'Combate',
    cost: { metal: 3000, crystal: 1000, deuterium: 0 },
    requirements: { combustionDrive: 1 },
  },
  heavyFighter: {
    name: 'Cazador Pesado',
    description: 'Nave de combate con mayor potencia.',
    icon: Sword,
    category: 'Combate',
    cost: { metal: 6000, crystal: 4000, deuterium: 0 },
    requirements: { armourTechnology: 2, impulseDrive: 2 },
  },
  cruiser: {
    name: 'Crucero',
    description: 'Nave de combate versátil.',
    icon: Sword,
    category: 'Combate',
    cost: { metal: 20000, crystal: 7000, deuterium: 2000 },
    requirements: { impulseDrive: 4, ionTechnology: 2 },
  },
  battleship: {
    name: 'Nave de Batalla',
    description: 'Nave de guerra pesada.',
    icon: Shield,
    category: 'Combate',
    cost: { metal: 45000, crystal: 15000, deuterium: 0 },
    requirements: { hyperspaceDrive: 4 },
  },
  colonyShip: {
    name: 'Colonizador',
    description: 'Establece nuevas colonias.',
    icon: Rocket,
    category: 'Civil',
    cost: { metal: 10000, crystal: 20000, deuterium: 10000 },
    requirements: { impulseDrive: 3 },
  },
  recycler: {
    name: 'Reciclador',
    description: 'Recoge restos de combate.',
    icon: Package,
    category: 'Civil',
    cost: { metal: 10000, crystal: 6000, deuterium: 2000 },
    requirements: { combustionDrive: 6, shieldingTechnology: 2 },
  },
  espionageProbe: {
    name: 'Sonda de Espionaje',
    description: 'Reconocimiento y espionaje.',
    icon: Eye,
    category: 'Civil',
    cost: { metal: 0, crystal: 1000, deuterium: 0 },
    requirements: { combustionDrive: 3, espionageTechnology: 2 },
  },
  bomber: {
    name: 'Bombardero',
    description: 'Destruye defensas planetarias.',
    icon: Bomb,
    category: 'Combate',
    cost: { metal: 50000, crystal: 25000, deuterium: 15000 },
    requirements: { impulseDrive: 6, plasmaTechnology: 5 },
  },
  destroyer: {
    name: 'Destructor',
    description: 'Aniquila flotas enemigas.',
    icon: Sword,
    category: 'Combate',
    cost: { metal: 60000, crystal: 50000, deuterium: 15000 },
    requirements: { hyperspaceDrive: 6, hyperspaceTechnology: 5 },
  },
  battlecruiser: {
    name: 'Acorazado',
    description: 'La máxima expresión del poder naval.',
    icon: Shield,
    category: 'Combate',
    cost: { metal: 30000, crystal: 40000, deuterium: 15000 },
    requirements: { hyperspaceTechnology: 4, laserTechnology: 12 },
  },
  deathstar: {
    name: 'Estrella de la Muerte',
    description: 'Arma definitiva capaz de destruir planetas.',
    icon: Shield,
    category: 'Especial',
    cost: { metal: 5000000, crystal: 4000000, deuterium: 1000000 },
    requirements: { hyperspaceDrive: 7, hyperspaceTechnology: 6, gravitonTechnology: 1 },
  },
};

export default function Shipyard() {
  const { state } = useGame();
  const { selectedPlanet, player } = state;
  const [selectedCategory, setSelectedCategory] = useState('Civil');
  const [buildQueue, setBuildQueue] = useState<{ [key: string]: number }>({});
  const [buildQuantities, setBuildQuantities] = useState<{ [key: string]: number }>({});
  const [repairMode, setRepairMode] = useState(false);
  const [repairQuantities, setRepairQuantities] = useState<{ [key: string]: number }>({});
  const [repairQueue, setRepairQueue] = useState<{ [key: string]: number }>({});

  const categories = ['Civil', 'Combate', 'Especial'];

  const canBuild = (shipKey: string) => {
    const ship = shipData[shipKey];
    const resources = selectedPlanet.resources;
    const shipyard = selectedPlanet.buildings.shipyard;

    if (shipyard === 0) return false;

    // Check requirements
    if (ship.requirements) {
      for (const [reqKey, reqLevel] of Object.entries(ship.requirements)) {
        if (player.research[reqKey as keyof typeof player.research] < reqLevel) {
          return false;
        }
      }
    }

    const quantity = buildQuantities[shipKey] || 1;
    return (
      resources.metal >= ship.cost.metal * quantity &&
      resources.crystal >= ship.cost.crystal * quantity &&
      resources.deuterium >= ship.cost.deuterium * quantity
    );
  };

  const handleBuild = (shipKey: string) => {
    if (!canBuild(shipKey)) return;

    const quantity = buildQuantities[shipKey] || 1;
    setBuildQueue({ ...buildQueue, [shipKey]: (buildQueue[shipKey] || 0) + quantity });
    
    // Simulate building
    setTimeout(() => {
      setBuildQueue(prev => {
        const newQueue = { ...prev };
        if (newQueue[shipKey] > quantity) {
          newQueue[shipKey] -= quantity;
        } else {
          delete newQueue[shipKey];
        }
        return newQueue;
      });
    }, 2000); // Speed up for demo
  };

  const updateQuantity = (shipKey: string, delta: number) => {
    const current = buildQuantities[shipKey] || 1;
    const newQuantity = Math.max(1, current + delta);
    setBuildQuantities({ ...buildQuantities, [shipKey]: newQuantity });
  };

  const canRepair = (shipKey: string) => {
    const ship = shipData[shipKey];
    const debris = selectedPlanet.debris;
    const shipyard = selectedPlanet.buildings.shipyard;
    const currentShips = player.fleet[shipKey as keyof typeof player.fleet] || 0;

    if (shipyard === 0 || currentShips === 0) return false;

    // Check requirements
    if (ship.requirements) {
      for (const [reqKey, reqLevel] of Object.entries(ship.requirements)) {
        if (player.research[reqKey as keyof typeof player.research] < reqLevel) {
          return false;
        }
      }
    }

    const quantity = repairQuantities[shipKey] || 1;
    const repairCost = {
      metal: Math.floor(ship.cost.metal * 0.6 * quantity), // 60% del costo original
      crystal: Math.floor(ship.cost.crystal * 0.6 * quantity),
      deuterium: Math.floor(ship.cost.deuterium * 0.6 * quantity),
    };

    return (
      debris.metal >= repairCost.metal &&
      debris.crystal >= repairCost.crystal &&
      debris.deuterium >= repairCost.deuterium &&
      quantity <= currentShips
    );
  };

  const handleRepair = (shipKey: string) => {
    if (!canRepair(shipKey)) return;

    const quantity = repairQuantities[shipKey] || 1;
    setRepairQueue({ ...repairQueue, [shipKey]: (repairQueue[shipKey] || 0) + quantity });
    
    // Simulate repairing
    setTimeout(() => {
      setRepairQueue(prev => {
        const newQueue = { ...prev };
        if (newQueue[shipKey] > quantity) {
          newQueue[shipKey] -= quantity;
        } else {
          delete newQueue[shipKey];
        }
        return newQueue;
      });
    }, 1500); // Repair is faster than building
  };

  const updateRepairQuantity = (shipKey: string, delta: number) => {
    const current = repairQuantities[shipKey] || 1;
    const maxRepair = player.fleet[shipKey as keyof typeof player.fleet] || 0;
    const newQuantity = Math.max(1, Math.min(maxRepair, current + delta));
    setRepairQuantities({ ...repairQuantities, [shipKey]: newQuantity });
  };

  const filteredShips = Object.entries(shipData).filter(
    ([_, info]) => info.category === selectedCategory
  );

  const totalBuildingShips = Object.values(buildQueue).reduce((sum, count) => sum + count, 0);
  const totalRepairingShips = Object.values(repairQueue).reduce((sum, count) => sum + count, 0);
  const hasDebris = selectedPlanet.debris.metal > 0 || selectedPlanet.debris.crystal > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            Astillero
          </h1>
          <p className="text-gray-400 mt-1">
            Hangar Nivel {selectedPlanet.buildings.shipyard}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {totalBuildingShips > 0 && (
            <div className="px-4 py-2 bg-neon-blue/20 rounded-lg border border-neon-blue/30">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-neon-blue animate-spin" />
                <span className="text-neon-blue font-rajdhani font-medium">
                  {totalBuildingShips} en construcción
                </span>
              </div>
            </div>
          )}
          {totalRepairingShips > 0 && (
            <div className="px-4 py-2 bg-neon-green/20 rounded-lg border border-neon-green/30">
              <div className="flex items-center space-x-2">
                <Wrench className="w-4 h-4 text-neon-green animate-pulse" />
                <span className="text-neon-green font-rajdhani font-medium">
                  {totalRepairingShips} reparando
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedPlanet.buildings.shipyard === 0 && (
        <Card>
          <div className="text-center py-8">
            <Rocket className="w-16 h-16 mx-auto mb-4 text-gray-500" />
            <h3 className="text-xl font-rajdhani font-semibold text-white mb-2">
              Hangar Requerido
            </h3>
            <p className="text-gray-400 mb-4">
              Necesitas construir un Hangar para poder construir naves espaciales.
            </p>
            <Button variant="primary">
              Ir a Edificios
            </Button>
          </div>
        </Card>
      )}

      {selectedPlanet.buildings.shipyard > 0 && (
        <>
          {/* Mode Toggle and Debris Info */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-1 bg-space-800 p-1 rounded-lg">
              <button
                onClick={() => setRepairMode(false)}
                className={`px-4 py-2 text-sm font-rajdhani font-medium rounded-md transition-all duration-200 ${
                  !repairMode
                    ? 'bg-neon-blue text-white shadow-[0_0_10px_rgba(0,212,255,0.3)]'
                    : 'text-gray-400 hover:text-white hover:bg-space-600'
                }`}
              >
                <Rocket className="w-4 h-4 mr-2 inline" />
                Construir
              </button>
              <button
                onClick={() => setRepairMode(true)}
                disabled={!hasDebris}
                className={`px-4 py-2 text-sm font-rajdhani font-medium rounded-md transition-all duration-200 ${
                  repairMode
                    ? 'bg-neon-green text-white shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                    : hasDebris
                    ? 'text-gray-400 hover:text-white hover:bg-space-600'
                    : 'text-gray-600 cursor-not-allowed opacity-50'
                }`}
              >
                <Wrench className="w-4 h-4 mr-2 inline" />
                Reparar
              </button>
            </div>

            {hasDebris && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-2 bg-space-700/50 rounded-lg">
                  <Recycle className="w-4 h-4 text-neon-green" />
                  <span className="text-sm font-rajdhani font-medium text-white">
                    Escombros disponibles:
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm font-rajdhani text-white">
                      {selectedPlanet.debris.metal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                    <span className="text-sm font-rajdhani text-white">
                      {selectedPlanet.debris.crystal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex space-x-1 bg-space-800 p-1 rounded-lg">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-1 px-4 py-2 text-sm font-rajdhani font-medium rounded-md transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-neon-blue text-white shadow-[0_0_10px_rgba(0,212,255,0.3)]'
                    : 'text-gray-400 hover:text-white hover:bg-space-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Current Fleet Overview */}
          <Card title="Flota Actual">
            {repairMode && !hasDebris && (
              <div className="mb-4 p-3 bg-neon-orange/10 border border-neon-orange/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Recycle className="w-4 h-4 text-neon-orange" />
                  <span className="text-sm text-neon-orange font-rajdhani font-medium">
                    No hay escombros disponibles para reparaciones
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Los escombros se obtienen de combates o pueden ser recolectados con naves recicladoras
                </p>
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Object.entries(player.fleet).filter(([_, count]) => count > 0).map(([shipKey, count]) => (
                <div key={shipKey} className="text-center">
                  <div className="p-3 bg-space-700/50 rounded-lg mb-2">
                    {React.createElement(shipData[shipKey]?.icon || Rocket, {
                      className: "w-8 h-8 mx-auto text-neon-blue"
                    })}
                  </div>
                  <p className="text-xs text-gray-400 mb-1">
                    {shipData[shipKey]?.name || shipKey}
                  </p>
                  <p className="text-lg font-rajdhani font-bold text-white">
                    {count.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Ships Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredShips.map(([shipKey, ship]) => {
              const canAfford = repairMode ? canRepair(shipKey) : canBuild(shipKey);
              const isBuilding = buildQueue[shipKey] > 0;
              const isRepairing = repairQueue[shipKey] > 0;
              const quantity = repairMode ? (repairQuantities[shipKey] || 1) : (buildQuantities[shipKey] || 1);
              const currentCount = player.fleet[shipKey as keyof typeof player.fleet] || 0;
              const repairCost = repairMode ? {
                metal: Math.floor(ship.cost.metal * 0.6 * quantity),
                crystal: Math.floor(ship.cost.crystal * 0.6 * quantity),
                deuterium: Math.floor(ship.cost.deuterium * 0.6 * quantity),
              } : null;

              return (
                <Card
                  key={shipKey}
                  className={`transition-all duration-300 hover:scale-105 ${
                    repairMode && currentCount === 0 ? 'opacity-50' : ''
                  } ${
                    canAfford 
                      ? repairMode 
                        ? 'hover:border-neon-green/50' 
                        : 'hover:border-neon-blue/50' 
                      : 'hover:border-neon-red/50'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          repairMode
                            ? 'bg-neon-green/20'
                            : ship.category === 'Civil' ? 'bg-neon-blue/20' :
                              ship.category === 'Combate' ? 'bg-neon-red/20' :
                              'bg-neon-purple/20'
                        }`}>
                          <ship.icon className={`w-5 h-5 ${
                            repairMode
                              ? 'text-neon-green'
                              : ship.category === 'Civil' ? 'text-neon-blue' :
                                ship.category === 'Combate' ? 'text-neon-red' :
                                'text-neon-purple'
                          }`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-rajdhani font-semibold text-white">
                            {ship.name}
                          </h3>
                          <p className="text-xs text-gray-400">
                            Disponibles: {currentCount.toLocaleString()}
                          </p>
                          {repairMode && currentCount === 0 && (
                            <p className="text-xs text-neon-red">
                              No hay naves para reparar
                            </p>
                          )}
                        </div>
                      </div>
                      {(isBuilding || isRepairing) && (
                        <div className="px-2 py-1 bg-neon-orange/20 rounded text-xs text-neon-orange">
                          {isBuilding ? `+${buildQueue[shipKey]}` : `🔧${repairQueue[shipKey]}`}
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="text-sm text-gray-300">{ship.description}</p>
                      {repairMode && (
                        <p className="text-xs text-neon-green mt-1">
                          💡 Reparar cuesta 60% del precio original usando escombros
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      {repairMode && repairCost ? (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Metal (escombros):</span>
                            <span className={`font-rajdhani font-medium ${
                              selectedPlanet.debris.metal >= repairCost.metal ? 'text-neon-green' : 'text-neon-red'
                            }`}>
                              {repairCost.metal.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Cristal (escombros):</span>
                            <span className={`font-rajdhani font-medium ${
                              selectedPlanet.debris.crystal >= repairCost.crystal ? 'text-neon-green' : 'text-neon-red'
                            }`}>
                              {repairCost.crystal.toLocaleString()}
                            </span>
                          </div>
                          {repairCost.deuterium > 0 && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Deuterio (escombros):</span>
                              <span className={`font-rajdhani font-medium ${
                                selectedPlanet.debris.deuterium >= repairCost.deuterium ? 'text-neon-green' : 'text-neon-red'
                              }`}>
                                {repairCost.deuterium.toLocaleString()}
                              </span>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Metal:</span>
                        <span className={`font-rajdhani font-medium ${
                          selectedPlanet.resources.metal >= ship.cost.metal * quantity ? 'text-white' : 'text-neon-red'
                        }`}>
                          {(ship.cost.metal * quantity).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Cristal:</span>
                        <span className={`font-rajdhani font-medium ${
                          selectedPlanet.resources.crystal >= ship.cost.crystal * quantity ? 'text-white' : 'text-neon-red'
                        }`}>
                          {(ship.cost.crystal * quantity).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Deuterio:</span>
                        <span className={`font-rajdhani font-medium ${
                          selectedPlanet.resources.deuterium >= ship.cost.deuterium * quantity ? 'text-white' : 'text-neon-red'
                        }`}>
                          {(ship.cost.deuterium * quantity).toLocaleString()}
                        </span>
                      </div>
                        </>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => repairMode ? updateRepairQuantity(shipKey, -1) : updateQuantity(shipKey, -1)}
                          className="w-8 h-8 bg-space-600 hover:bg-space-500 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4 text-white" />
                        </button>
                        <span className="w-12 text-center font-rajdhani font-medium text-white">
                          {quantity}
                        </span>
                        <button
                          onClick={() => repairMode ? updateRepairQuantity(shipKey, 1) : updateQuantity(shipKey, 1)}
                          className="w-8 h-8 bg-space-600 hover:bg-space-500 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4 text-white" />
                        </button>
                      </div>
                      <Button
                        variant={canAfford ? (repairMode ? 'warning' : 'success') : 'secondary'}
                        size="sm"
                        onClick={() => repairMode ? handleRepair(shipKey) : handleBuild(shipKey)}
                        disabled={!canAfford || isBuilding || isRepairing || (repairMode && currentCount === 0)}
                        loading={isBuilding || isRepairing}
                      >
                        {isBuilding ? 'Construyendo...' : 
                         isRepairing ? 'Reparando...' : 
                         repairMode ? (
                           <>
                             <Wrench className="w-3 h-3 mr-1" />
                             Reparar
                           </>
                         ) : 'Construir'}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}