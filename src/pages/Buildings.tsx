import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { 
  Building, 
  Zap, 
  Factory, 
  Warehouse, 
  FlaskConical,
  Shield,
  Clock,
  TrendingUp
} from 'lucide-react';

interface BuildingInfo {
  name: string;
  description: string;
  icon: React.ElementType;
  category: string;
  requirements?: { [key: string]: number };
}

const buildingData: { [key: string]: BuildingInfo } = {
  metalMine: {
    name: 'Mina de Metal',
    description: 'Produce metal, el recurso más básico para la construcción.',
    icon: Building,
    category: 'Recursos',
  },
  crystalMine: {
    name: 'Mina de Cristal',
    description: 'Extrae cristal, esencial para tecnologías avanzadas.',
    icon: Building,
    category: 'Recursos',
  },
  deuteriumSynthesizer: {
    name: 'Sintetizador de Deuterio',
    description: 'Produce deuterio, combustible para naves espaciales.',
    icon: Factory,
    category: 'Recursos',
  },
  solarPlant: {
    name: 'Planta Solar',
    description: 'Genera energía mediante paneles solares.',
    icon: Zap,
    category: 'Energía',
  },
  fusionReactor: {
    name: 'Planta de Fusión',
    description: 'Reactor de fusión de alta eficiencia energética.',
    icon: Zap,
    category: 'Energía',
    requirements: { deuteriumSynthesizer: 5, energyTechnology: 3 },
  },
  roboticsFactory: {
    name: 'Fábrica de Robots',
    description: 'Acelera la construcción de edificios.',
    icon: Factory,
    category: 'Instalaciones',
  },
  naniteFactory: {
    name: 'Fábrica de Nanitas',
    description: 'Acelera dramáticamente la construcción.',
    icon: Factory,
    category: 'Instalaciones',
    requirements: { roboticsFactory: 10, computerTechnology: 10 },
  },
  shipyard: {
    name: 'Hangar',
    description: 'Permite la construcción de naves espaciales.',
    icon: Factory,
    category: 'Instalaciones',
    requirements: { roboticsFactory: 2 },
  },
  metalStorage: {
    name: 'Almacén de Metal',
    description: 'Aumenta la capacidad de almacenamiento de metal.',
    icon: Warehouse,
    category: 'Almacenamiento',
  },
  crystalStorage: {
    name: 'Almacén de Cristal',
    description: 'Aumenta la capacidad de almacenamiento de cristal.',
    icon: Warehouse,
    category: 'Almacenamiento',
  },
  deuteriumTank: {
    name: 'Tanque de Deuterio',
    description: 'Almacena grandes cantidades de deuterio.',
    icon: Warehouse,
    category: 'Almacenamiento',
  },
  researchLab: {
    name: 'Laboratorio de Investigación',
    description: 'Permite investigar nuevas tecnologías.',
    icon: FlaskConical,
    category: 'Investigación',
  },
  missileSilo: {
    name: 'Silo de Misiles',
    description: 'Almacena misiles defensivos y de ataque.',
    icon: Shield,
    category: 'Defensa',
    requirements: { shipyard: 1 },
  },
};

export default function Buildings() {
  const { state, updateBuilding } = useGame();
  const { selectedPlanet } = state;
  const [selectedCategory, setSelectedCategory] = useState('Recursos');
  const [buildQueue, setBuildQueue] = useState<string[]>([]);

  const categories = ['Recursos', 'Energía', 'Instalaciones', 'Almacenamiento', 'Investigación', 'Defensa'];

  const calculateCost = (buildingKey: string, currentLevel: number) => {
    const baseCosts = {
      metalMine: { metal: 60, crystal: 15, deuterium: 0 },
      crystalMine: { metal: 48, crystal: 24, deuterium: 0 },
      deuteriumSynthesizer: { metal: 225, crystal: 75, deuterium: 0 },
      solarPlant: { metal: 75, crystal: 30, deuterium: 0 },
      fusionReactor: { metal: 900, crystal: 360, deuterium: 180 },
      roboticsFactory: { metal: 400, crystal: 120, deuterium: 200 },
      naniteFactory: { metal: 1000000, crystal: 500000, deuterium: 100000 },
      shipyard: { metal: 400, crystal: 200, deuterium: 100 },
      metalStorage: { metal: 1000, crystal: 0, deuterium: 0 },
      crystalStorage: { metal: 1000, crystal: 500, deuterium: 0 },
      deuteriumTank: { metal: 1000, crystal: 1000, deuterium: 0 },
      researchLab: { metal: 200, crystal: 400, deuterium: 200 },
      missileSilo: { metal: 20000, crystal: 20000, deuterium: 1000 },
    };

    const base = baseCosts[buildingKey as keyof typeof baseCosts] || { metal: 0, crystal: 0, deuterium: 0 };
    const multiplier = Math.pow(2, currentLevel);

    return {
      metal: Math.floor(base.metal * multiplier),
      crystal: Math.floor(base.crystal * multiplier),
      deuterium: Math.floor(base.deuterium * multiplier),
      time: Math.floor((base.metal + base.crystal) * multiplier / 2500), // simplified calculation
    };
  };

  const canBuild = (buildingKey: string) => {
    const cost = calculateCost(buildingKey, selectedPlanet.buildings[buildingKey as keyof typeof selectedPlanet.buildings]);
    const resources = selectedPlanet.resources;

    return (
      resources.metal >= cost.metal &&
      resources.crystal >= cost.crystal &&
      resources.deuterium >= cost.deuterium &&
      selectedPlanet.usedFields < selectedPlanet.fields
    );
  };

  const handleBuild = (buildingKey: string) => {
    if (!canBuild(buildingKey)) return;

    const currentLevel = selectedPlanet.buildings[buildingKey as keyof typeof selectedPlanet.buildings];
    const cost = calculateCost(buildingKey, currentLevel);

    // Simulate building construction
    setBuildQueue([...buildQueue, buildingKey]);
    setTimeout(() => {
      updateBuilding(selectedPlanet.id, buildingKey, currentLevel + 1);
      setBuildQueue(prev => prev.filter(item => item !== buildingKey));
    }, cost.time * 100); // Speed up for demo
  };

  const filteredBuildings = Object.entries(buildingData).filter(
    ([_, info]) => info.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            Edificios
          </h1>
          <p className="text-gray-400 mt-1">
            {selectedPlanet.name} • {selectedPlanet.usedFields}/{selectedPlanet.fields} campos usados
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {buildQueue.length > 0 && (
            <div className="px-4 py-2 bg-neon-orange/20 rounded-lg border border-neon-orange/30">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-neon-orange animate-spin" />
                <span className="text-neon-orange font-rajdhani font-medium">
                  {buildQueue.length} en construcción
                </span>
              </div>
            </div>
          )}
        </div>
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

      {/* Buildings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBuildings.map(([buildingKey, info]) => {
          const currentLevel = selectedPlanet.buildings[buildingKey as keyof typeof selectedPlanet.buildings];
          const cost = calculateCost(buildingKey, currentLevel);
          const canAfford = canBuild(buildingKey);
          const isBuilding = buildQueue.includes(buildingKey);

          return (
            <Card
              key={buildingKey}
              className={`transition-all duration-300 hover:scale-105 ${
                canAfford ? 'hover:border-neon-green/50' : 'hover:border-neon-red/50'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      info.category === 'Recursos' ? 'bg-gray-500/20' :
                      info.category === 'Energía' ? 'bg-neon-orange/20' :
                      info.category === 'Instalaciones' ? 'bg-neon-blue/20' :
                      info.category === 'Almacenamiento' ? 'bg-neon-purple/20' :
                      info.category === 'Investigación' ? 'bg-neon-green/20' :
                      'bg-neon-red/20'
                    }`}>
                      <info.icon className={`w-5 h-5 ${
                        info.category === 'Recursos' ? 'text-gray-400' :
                        info.category === 'Energía' ? 'text-neon-orange' :
                        info.category === 'Instalaciones' ? 'text-neon-blue' :
                        info.category === 'Almacenamiento' ? 'text-neon-purple' :
                        info.category === 'Investigación' ? 'text-neon-green' :
                        'text-neon-red'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-rajdhani font-semibold text-white">
                        {info.name}
                      </h3>
                      <p className="text-xs text-gray-400">Nivel {currentLevel}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-neon-blue" />
                    <span className="text-sm font-rajdhani font-medium text-neon-blue">
                      {currentLevel + 1}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-300">{info.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Metal:</span>
                    <span className={`font-rajdhani font-medium ${
                      selectedPlanet.resources.metal >= cost.metal ? 'text-white' : 'text-neon-red'
                    }`}>
                      {cost.metal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Cristal:</span>
                    <span className={`font-rajdhani font-medium ${
                      selectedPlanet.resources.crystal >= cost.crystal ? 'text-white' : 'text-neon-red'
                    }`}>
                      {cost.crystal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Deuterio:</span>
                    <span className={`font-rajdhani font-medium ${
                      selectedPlanet.resources.deuterium >= cost.deuterium ? 'text-white' : 'text-neon-red'
                    }`}>
                      {cost.deuterium.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tiempo:</span>
                    <span className="font-rajdhani font-medium text-white">
                      {Math.floor(cost.time / 60)}m {cost.time % 60}s
                    </span>
                  </div>
                </div>

                <Button
                  variant={canAfford ? 'success' : 'secondary'}
                  size="md"
                  onClick={() => handleBuild(buildingKey)}
                  disabled={!canAfford || isBuilding}
                  loading={isBuilding}
                  className="w-full"
                >
                  {isBuilding ? 'Construyendo...' : 'Construir'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}