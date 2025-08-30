import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { 
  FlaskConical, 
  Zap, 
  Cpu, 
  Rocket, 
  Shield, 
  Sword, 
  Globe, 
  Brain,
  Clock,
  TrendingUp
} from 'lucide-react';

interface ResearchInfo {
  name: string;
  description: string;
  icon: React.ElementType;
  category: string;
  requirements?: { [key: string]: number };
}

const researchData: { [key: string]: ResearchInfo } = {
  energyTechnology: {
    name: 'Tecnología de Energía',
    description: 'Mejora la eficiencia de las plantas de energía.',
    icon: Zap,
    category: 'Básica',
  },
  laserTechnology: {
    name: 'Tecnología Láser',
    description: 'Desarrolla armamento láser avanzado.',
    icon: Zap,
    category: 'Combate',
    requirements: { energyTechnology: 2 },
  },
  ionTechnology: {
    name: 'Tecnología de Iones',
    description: 'Tecnología de armamento iónico.',
    icon: Zap,
    category: 'Combate',
    requirements: { laserTechnology: 5, energyTechnology: 4 },
  },
  hyperspaceTechnology: {
    name: 'Tecnología Hiperespacial',
    description: 'Permite viajar a través del hiperespacio.',
    icon: Globe,
    category: 'Propulsión',
    requirements: { energyTechnology: 3, shieldingTechnology: 1 },
  },
  plasmaTechnology: {
    name: 'Tecnología de Plasma',
    description: 'Armas de plasma de alta potencia.',
    icon: Zap,
    category: 'Combate',
    requirements: { energyTechnology: 8, laserTechnology: 10, ionTechnology: 5 },
  },
  combustionDrive: {
    name: 'Motor de Combustión',
    description: 'Propulsión básica para naves espaciales.',
    icon: Rocket,
    category: 'Propulsión',
    requirements: { energyTechnology: 1 },
  },
  impulseDrive: {
    name: 'Motor de Impulso',
    description: 'Propulsión avanzada más eficiente.',
    icon: Rocket,
    category: 'Propulsión',
    requirements: { energyTechnology: 1 },
  },
  hyperspaceDrive: {
    name: 'Motor Hiperespacial',
    description: 'Permite viajes hiperespaciales.',
    icon: Rocket,
    category: 'Propulsión',
    requirements: { hyperspaceTechnology: 3 },
  },
  espionageTechnology: {
    name: 'Tecnología de Espionaje',
    description: 'Mejora las capacidades de reconocimiento.',
    icon: Brain,
    category: 'Investigación',
  },
  computerTechnology: {
    name: 'Tecnología Informática',
    description: 'Mejora los sistemas de control de flotas.',
    icon: Cpu,
    category: 'Investigación',
  },
  astrophysics: {
    name: 'Astrofísica',
    description: 'Permite colonizar más planetas.',
    icon: Globe,
    category: 'Investigación',
    requirements: { espionageTechnology: 4, impulseDrive: 3 },
  },
  weaponsTechnology: {
    name: 'Tecnología de Armas',
    description: 'Mejora el poder de ataque de las naves.',
    icon: Sword,
    category: 'Combate',
  },
  shieldingTechnology: {
    name: 'Tecnología de Escudos',
    description: 'Desarrolla sistemas de defensa avanzados.',
    icon: Shield,
    category: 'Combate',
    requirements: { energyTechnology: 3 },
  },
  armourTechnology: {
    name: 'Tecnología de Blindaje',
    description: 'Mejora la resistencia de las naves.',
    icon: Shield,
    category: 'Combate',
  },
};

export default function Research() {
  const { state } = useGame();
  const { selectedPlanet, player } = state;
  const [selectedCategory, setSelectedCategory] = useState('Básica');
  const [researchQueue, setResearchQueue] = useState<string[]>([]);

  const categories = ['Básica', 'Combate', 'Propulsión', 'Investigación'];

  const calculateCost = (researchKey: string, currentLevel: number) => {
    const baseCosts = {
      energyTechnology: { metal: 0, crystal: 800, deuterium: 400 },
      laserTechnology: { metal: 200, crystal: 100, deuterium: 0 },
      ionTechnology: { metal: 1000, crystal: 300, deuterium: 100 },
      hyperspaceTechnology: { metal: 0, crystal: 4000, deuterium: 2000 },
      plasmaTechnology: { metal: 2000, crystal: 4000, deuterium: 1000 },
      combustionDrive: { metal: 400, crystal: 0, deuterium: 600 },
      impulseDrive: { metal: 2000, crystal: 4000, deuterium: 600 },
      hyperspaceDrive: { metal: 10000, crystal: 20000, deuterium: 6000 },
      espionageTechnology: { metal: 200, crystal: 1000, deuterium: 200 },
      computerTechnology: { metal: 0, crystal: 400, deuterium: 600 },
      astrophysics: { metal: 4000, crystal: 8000, deuterium: 4000 },
      weaponsTechnology: { metal: 800, crystal: 200, deuterium: 0 },
      shieldingTechnology: { metal: 200, crystal: 600, deuterium: 0 },
      armourTechnology: { metal: 1000, crystal: 0, deuterium: 0 },
    };

    const base = baseCosts[researchKey as keyof typeof baseCosts] || { metal: 0, crystal: 0, deuterium: 0 };
    const multiplier = Math.pow(2, currentLevel);

    return {
      metal: Math.floor(base.metal * multiplier),
      crystal: Math.floor(base.crystal * multiplier),
      deuterium: Math.floor(base.deuterium * multiplier),
      time: Math.floor((base.metal + base.crystal + base.deuterium) * multiplier / 1000), // simplified calculation
    };
  };

  const canResearch = (researchKey: string) => {
    const cost = calculateCost(researchKey, player.research[researchKey as keyof typeof player.research]);
    const resources = selectedPlanet.resources;
    const labLevel = selectedPlanet.buildings.researchLab;

    if (labLevel === 0) return false;

    return (
      resources.metal >= cost.metal &&
      resources.crystal >= cost.crystal &&
      resources.deuterium >= cost.deuterium
    );
  };

  const handleResearch = (researchKey: string) => {
    if (!canResearch(researchKey)) return;

    const currentLevel = player.research[researchKey as keyof typeof player.research];
    const cost = calculateCost(researchKey, currentLevel);

    // Simulate research
    setResearchQueue([...researchQueue, researchKey]);
    setTimeout(() => {
      setResearchQueue(prev => prev.filter(item => item !== researchKey));
    }, cost.time * 200); // Speed up for demo
  };

  const filteredResearch = Object.entries(researchData).filter(
    ([_, info]) => info.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            Investigación
          </h1>
          <p className="text-gray-400 mt-1">
            Laboratorio Nivel {selectedPlanet.buildings.researchLab}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {researchQueue.length > 0 && (
            <div className="px-4 py-2 bg-neon-green/20 rounded-lg border border-neon-green/30">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-neon-green animate-spin" />
                <span className="text-neon-green font-rajdhani font-medium">
                  Investigando...
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedPlanet.buildings.researchLab === 0 && (
        <Card>
          <div className="text-center py-8">
            <FlaskConical className="w-16 h-16 mx-auto mb-4 text-gray-500" />
            <h3 className="text-xl font-rajdhani font-semibold text-white mb-2">
              Laboratorio de Investigación Requerido
            </h3>
            <p className="text-gray-400 mb-4">
              Necesitas construir un Laboratorio de Investigación para poder investigar tecnologías.
            </p>
            <Button variant="primary">
              Ir a Edificios
            </Button>
          </div>
        </Card>
      )}

      {selectedPlanet.buildings.researchLab > 0 && (
        <>
          {/* Category Tabs */}
          <div className="flex space-x-1 bg-space-800 p-1 rounded-lg">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-1 px-4 py-2 text-sm font-rajdhani font-medium rounded-md transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-neon-green text-white shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                    : 'text-gray-400 hover:text-white hover:bg-space-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Research Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredResearch.map(([researchKey, info]) => {
              const currentLevel = player.research[researchKey as keyof typeof player.research];
              const cost = calculateCost(researchKey, currentLevel);
              const canAfford = canResearch(researchKey);
              const isResearching = researchQueue.includes(researchKey);

              return (
                <Card
                  key={researchKey}
                  className={`transition-all duration-300 hover:scale-105 ${
                    canAfford ? 'hover:border-neon-green/50' : 'hover:border-neon-red/50'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          info.category === 'Básica' ? 'bg-neon-blue/20' :
                          info.category === 'Combate' ? 'bg-neon-red/20' :
                          info.category === 'Propulsión' ? 'bg-neon-orange/20' :
                          'bg-neon-green/20'
                        }`}>
                          <info.icon className={`w-5 h-5 ${
                            info.category === 'Básica' ? 'text-neon-blue' :
                            info.category === 'Combate' ? 'text-neon-red' :
                            info.category === 'Propulsión' ? 'text-neon-orange' :
                            'text-neon-green'
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
                        <TrendingUp className="w-4 h-4 text-neon-green" />
                        <span className="text-sm font-rajdhani font-medium text-neon-green">
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
                      onClick={() => handleResearch(researchKey)}
                      disabled={!canAfford || isResearching}
                      loading={isResearching}
                      className="w-full"
                    >
                      {isResearching ? 'Investigando...' : 'Investigar'}
                    </Button>
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