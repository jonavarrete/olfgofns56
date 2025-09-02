import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { 
  Building, 
  FlaskConical, 
  Rocket, 
  Shield,
  Lock,
  CheckCircle,
  Clock,
  Zap,
  AlertTriangle,
  Eye,
  Search,
  Filter,
  Target,
  ArrowRight,
  Info,
  X
} from 'lucide-react';
import { 
  TechnologyTreeUtils, 
  buildingTree, 
  researchTree, 
  shipTree, 
  defenseTree,
  TechnologyNode,
  TechnologyRequirement
} from '../../data/technologyTree';

type TechnologyCategory = 'all' | 'building' | 'research' | 'ship' | 'defense';

export default function TechnologyTreeView() {
  const { state } = useGame();
  const { player, selectedPlanet } = state;
  
  const [selectedCategory, setSelectedCategory] = useState<TechnologyCategory>('all');
  const [selectedTechnology, setSelectedTechnology] = useState<TechnologyNode | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false);

  const categories = [
    { id: 'all' as const, name: 'Todas', icon: Target, color: 'neon-blue' },
    { id: 'building' as const, name: 'Edificios', icon: Building, color: 'neon-green' },
    { id: 'research' as const, name: 'Investigación', icon: FlaskConical, color: 'neon-purple' },
    { id: 'ship' as const, name: 'Naves', icon: Rocket, color: 'neon-orange' },
    { id: 'defense' as const, name: 'Defensas', icon: Shield, color: 'neon-red' },
  ];

  const handleSelectTechnology = (tech: TechnologyNode) => {
    setSelectedTechnology(tech);
    setShowDetailsDrawer(true);
  };

  const handleCloseDrawer = () => {
    setShowDetailsDrawer(false);
  };

  const handleSelectTechnologyInDrawer = (tech: TechnologyNode) => {
    setSelectedTechnology(tech);
  };

  const getAllTechnologies = () => {
    let technologies = TechnologyTreeUtils.getAllTechnologies();

    if (selectedCategory !== 'all') {
      technologies = technologies.filter(tech => tech.category === selectedCategory);
    }

    if (searchTerm) {
      technologies = technologies.filter(tech =>
        tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tech.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (showOnlyAvailable) {
      const unlockedTechs = TechnologyTreeUtils.getUnlockedTechnologies(
        selectedPlanet.buildings,
        player.research
      );
      technologies = technologies.filter(tech => unlockedTechs.includes(tech.id));
    }

    return technologies;
  };

  const getTechnologyStatus = (tech: TechnologyNode) => {
    const { canBuild, missingRequirements } = TechnologyTreeUtils.checkRequirements(
      tech.id,
      selectedPlanet.buildings,
      player.research
    );

    const currentLevel = tech.category === 'building' 
      ? selectedPlanet.buildings[tech.id as keyof typeof selectedPlanet.buildings] || 0
      : tech.category === 'research'
      ? player.research[tech.id as keyof typeof player.research] || 0
      : 0;

    const cost = TechnologyTreeUtils.calculateCost(tech.id, currentLevel + 1);
    const canAfford = selectedPlanet.resources.metal >= cost.metal &&
                     selectedPlanet.resources.crystal >= cost.crystal &&
                     selectedPlanet.resources.deuterium >= cost.deuterium &&
                     selectedPlanet.resources.energy >= cost.energy;

    return {
      canBuild: canBuild && canAfford,
      canAfford,
      meetsRequirements: canBuild,
      missingRequirements,
      currentLevel,
      cost,
      isMaxLevel: tech.maxLevel ? currentLevel >= tech.maxLevel : false
    };
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) return `${hours}h ${minutes}m ${secs}s`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const getCategoryColorClass = (category: TechnologyNode['category']) => {
    switch (category) {
      case 'building': return {
        bg: 'bg-neon-green/20',
        border: 'border-neon-green/30',
        text: 'text-neon-green',
        hover: 'hover:bg-neon-green/30'
      };
      case 'research': return {
        bg: 'bg-neon-purple/20',
        border: 'border-neon-purple/30',
        text: 'text-neon-purple',
        hover: 'hover:bg-neon-purple/30'
      };
      case 'ship': return {
        bg: 'bg-neon-orange/20',
        border: 'border-neon-orange/30',
        text: 'text-neon-orange',
        hover: 'hover:bg-neon-orange/30'
      };
      case 'defense': return {
        bg: 'bg-neon-red/20',
        border: 'border-neon-red/30',
        text: 'text-neon-red',
        hover: 'hover:bg-neon-red/30'
      };
    }
  };

  const renderTechnologyCard = (tech: TechnologyNode) => {
    const status = getTechnologyStatus(tech);
    const Icon = getCategoryIcon(tech.category);
    const colorClass = getCategoryColorClass(tech.category);

    return (
      <Card 
        key={tech.id}
        className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
          selectedTechnology?.id === tech.id ? 'border-neon-blue/50 shadow-[0_0_20px_rgba(0,212,255,0.3)]' : ''
        }`}
        onClick={() => handleSelectTechnology(tech)}
      >
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${colorClass.bg} ${colorClass.border}`}>
                <Icon className={`w-5 h-5 ${colorClass.text}`} />
              </div>
              <div>
                <h3 className="font-rajdhani font-semibold text-white text-sm">
                  {tech.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1">{tech.description}</p>
                {(tech.category === 'building' || tech.category === 'research') && (
                  <p className="text-xs text-gray-500 mt-1">
                    Nivel actual: {status.currentLevel}
                    {tech.maxLevel && ` / ${tech.maxLevel}`}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end space-y-1">
              {status.isMaxLevel ? (
                <div className="px-2 py-1 bg-neon-green/20 text-neon-green rounded text-xs font-rajdhani font-medium">
                  MÁXIMO
                </div>
              ) : status.canBuild ? (
                <div className="px-2 py-1 bg-neon-green/20 text-neon-green rounded text-xs font-rajdhani font-medium">
                  DISPONIBLE
                </div>
              ) : status.meetsRequirements ? (
                <div className="px-2 py-1 bg-neon-orange/20 text-neon-orange rounded text-xs font-rajdhani font-medium">
                  SIN RECURSOS
                </div>
              ) : (
                <div className="px-2 py-1 bg-neon-red/20 text-neon-red rounded text-xs font-rajdhani font-medium">
                  BLOQUEADO
                </div>
              )}
            </div>
          </div>

          {/* Requirements */}
          {tech.requirements.length > 0 && (
            <div className="space-y-1">
              <h4 className="text-xs font-rajdhani font-medium text-gray-400">Requisitos:</h4>
              <div className="space-y-1">
                {tech.requirements.map((req, index) => {
                  const currentLevel = req.type === 'building' 
                    ? selectedPlanet.buildings[req.key as keyof typeof selectedPlanet.buildings] || 0
                    : player.research[req.key as keyof typeof player.research] || 0;
                  
                  const isMet = currentLevel >= req.level;
                  const requiredTech = TechnologyTreeUtils.getTechnologyById(req.key);

                  return (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (requiredTech) {
                          handleSelectTechnology(requiredTech);
                        }
                      }}
                      className={`w-full flex items-center justify-between text-xs p-2 rounded border transition-all duration-200 hover:scale-105 ${
                        isMet 
                          ? 'bg-neon-green/10 border-neon-green/30 text-neon-green hover:bg-neon-green/20' 
                          : 'bg-neon-red/10 border-neon-red/30 text-neon-red hover:bg-neon-red/20'
                      }`}
                    >
                      <span className="truncate">{TechnologyTreeUtils.getRequirementText(req)}</span>
                      <div className="flex items-center space-x-1 ml-2">
                        <span className="font-rajdhani font-medium">{currentLevel}/{req.level}</span>
                        {isMet ? <CheckCircle className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Cost */}
          {!status.isMaxLevel && (
            <div className="space-y-1">
              <h4 className="text-xs font-rajdhani font-medium text-gray-400">
                Costo {tech.category === 'building' || tech.category === 'research' ? `(Nivel ${status.currentLevel + 1})` : ''}:
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {status.cost.metal > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Metal:</span>
                    <span className={`font-rajdhani font-medium ${
                      selectedPlanet.resources.metal >= status.cost.metal ? 'text-gray-300' : 'text-neon-red'
                    }`}>
                      {formatNumber(status.cost.metal)}
                    </span>
                  </div>
                )}
                {status.cost.crystal > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Cristal:</span>
                    <span className={`font-rajdhani font-medium ${
                      selectedPlanet.resources.crystal >= status.cost.crystal ? 'text-neon-blue' : 'text-neon-red'
                    }`}>
                      {formatNumber(status.cost.crystal)}
                    </span>
                  </div>
                )}
                {status.cost.deuterium > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Deuterio:</span>
                    <span className={`font-rajdhani font-medium ${
                      selectedPlanet.resources.deuterium >= status.cost.deuterium ? 'text-neon-green' : 'text-neon-red'
                    }`}>
                      {formatNumber(status.cost.deuterium)}
                    </span>
                  </div>
                )}
                {status.cost.energy > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Energía:</span>
                    <span className={`font-rajdhani font-medium ${
                      selectedPlanet.resources.energy >= status.cost.energy ? 'text-neon-orange' : 'text-neon-red'
                    }`}>
                      {formatNumber(status.cost.energy)}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between col-span-2">
                  <span className="text-gray-400">Tiempo:</span>
                  <span className="text-gray-300 font-rajdhani font-medium">
                    {formatTime(status.cost.time)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  };

  const renderTechnologyDetails = () => {
    if (!selectedTechnology) {
      return (
        <div className="text-center py-12 text-gray-400">
          <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-rajdhani font-semibold mb-2">Selecciona una Tecnología</h3>
          <p className="text-sm">Haz clic en cualquier tecnología para ver sus detalles y dependencias</p>
        </div>
      );
    }

    const status = getTechnologyStatus(selectedTechnology);
    const dependents = TechnologyTreeUtils.getTechnologyDependents(selectedTechnology.id);
    const path = TechnologyTreeUtils.getTechnologyPath(selectedTechnology.id);
    const Icon = getCategoryIcon(selectedTechnology.category);
    const colorClass = getCategoryColorClass(selectedTechnology.category);

    return (
      <div className="space-y-6">
        {/* Technology Header */}
        <div className="flex items-start space-x-4">
          <div className={`p-4 rounded-lg ${colorClass.bg} ${colorClass.border}`}>
            <Icon className={`w-8 h-8 ${colorClass.text}`} />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-orbitron font-bold text-white">
              {selectedTechnology.name}
            </h2>
            <p className="text-gray-400 mt-1">{selectedTechnology.description}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className={`px-3 py-1 rounded text-sm font-rajdhani font-medium ${colorClass.bg} ${colorClass.text}`}>
                {selectedTechnology.category === 'building' ? 'Edificio' :
                 selectedTechnology.category === 'research' ? 'Investigación' :
                 selectedTechnology.category === 'ship' ? 'Nave' : 'Defensa'}
              </span>
              {(selectedTechnology.category === 'building' || selectedTechnology.category === 'research') && (
                <span className="text-sm text-gray-400">
                  Nivel actual: {status.currentLevel}
                  {selectedTechnology.maxLevel && ` / ${selectedTechnology.maxLevel}`}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Current Status */}
        <Card title="Estado Actual" glowing={status.canBuild}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                {status.isMaxLevel ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-neon-green" />
                    <span className="text-neon-green font-rajdhani font-medium">Nivel Máximo Alcanzado</span>
                  </>
                ) : status.canBuild ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-neon-green" />
                    <span className="text-neon-green font-rajdhani font-medium">Disponible para Construir</span>
                  </>
                ) : status.meetsRequirements ? (
                  <>
                    <AlertTriangle className="w-5 h-5 text-neon-orange" />
                    <span className="text-neon-orange font-rajdhani font-medium">Recursos Insuficientes</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 text-neon-red" />
                    <span className="text-neon-red font-rajdhani font-medium">Requisitos No Cumplidos</span>
                  </>
                )}
              </div>

              {!status.isMaxLevel && (
                <div className="space-y-2">
                  <h4 className="text-sm font-rajdhani font-semibold text-white">
                    Costo {selectedTechnology.category === 'building' || selectedTechnology.category === 'research' ? `(Nivel ${status.currentLevel + 1})` : ''}:
                  </h4>
                  <div className="space-y-2">
                    {status.cost.metal > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Metal:</span>
                        <span className={`font-rajdhani font-medium ${
                          selectedPlanet.resources.metal >= status.cost.metal ? 'text-gray-300' : 'text-neon-red'
                        }`}>
                          {formatNumber(status.cost.metal)}
                        </span>
                      </div>
                    )}
                    {status.cost.crystal > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Cristal:</span>
                        <span className={`font-rajdhani font-medium ${
                          selectedPlanet.resources.crystal >= status.cost.crystal ? 'text-neon-blue' : 'text-neon-red'
                        }`}>
                          {formatNumber(status.cost.crystal)}
                        </span>
                      </div>
                    )}
                    {status.cost.deuterium > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Deuterio:</span>
                        <span className={`font-rajdhani font-medium ${
                          selectedPlanet.resources.deuterium >= status.cost.deuterium ? 'text-neon-green' : 'text-neon-red'
                        }`}>
                          {formatNumber(status.cost.deuterium)}
                        </span>
                      </div>
                    )}
                    {status.cost.energy > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Energía:</span>
                        <span className={`font-rajdhani font-medium ${
                          selectedPlanet.resources.energy >= status.cost.energy ? 'text-neon-orange' : 'text-neon-red'
                        }`}>
                          {formatNumber(status.cost.energy)}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Tiempo:</span>
                      <span className="text-gray-300 font-rajdhani font-medium">
                        {formatTime(status.cost.time)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {/* Requirements */}
              {selectedTechnology.requirements.length > 0 && (
                <div>
                  <h4 className="text-sm font-rajdhani font-semibold text-white mb-2">Requisitos:</h4>
                  <div className="space-y-1">
                    {selectedTechnology.requirements.map((req, index) => {
                      const currentLevel = req.type === 'building' 
                        ? selectedPlanet.buildings[req.key as keyof typeof selectedPlanet.buildings] || 0
                        : player.research[req.key as keyof typeof player.research] || 0;
                      
                      const isMet = currentLevel >= req.level;
                      const requiredTech = TechnologyTreeUtils.getTechnologyById(req.key);

                      return (
                        <button
                          key={index}
                          onClick={() => {
                            if (requiredTech) {
                              handleSelectTechnologyInDrawer(requiredTech);
                            }
                          }}
                          className={`w-full flex items-center justify-between text-xs p-3 rounded-lg border transition-all duration-200 hover:scale-105 ${
                            isMet 
                              ? 'bg-neon-green/10 border-neon-green/30 text-neon-green hover:bg-neon-green/20' 
                              : 'bg-neon-red/10 border-neon-red/30 text-neon-red hover:bg-neon-red/20'
                          }`}
                        >
                          <span className="truncate">{TechnologyTreeUtils.getRequirementText(req)}</span>
                          <div className="flex items-center space-x-2 ml-3">
                            <span className="font-rajdhani font-medium">{currentLevel}/{req.level}</span>
                            {isMet ? <CheckCircle className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Action Button */}
              {!status.isMaxLevel && (
                <Button
                  variant={status.canBuild ? "primary" : "secondary"}
                  disabled={!status.canBuild}
                  className="w-full"
                >
                  {selectedTechnology.category === 'building' || selectedTechnology.category === 'research' ? (
                    <>
                      <Building className="w-4 h-4 mr-2" />
                      {selectedTechnology.category === 'building' ? 'Construir' : 'Investigar'} Nivel {status.currentLevel + 1}
                    </>
                  ) : (
                    <>
                      <Rocket className="w-4 h-4 mr-2" />
                      Ir a {selectedTechnology.category === 'ship' ? 'Astillero' : 'Defensas'}
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Technology Path */}
        {path.length > 1 && (
          <Card title="Ruta de Desarrollo">
            <div className="space-y-3">
              <p className="text-sm text-gray-400">
                Para desbloquear {selectedTechnology.name}, necesitas seguir esta ruta:
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {path.map((tech, index) => {
                  const techStatus = getTechnologyStatus(tech);
                  const isCompleted = tech.category === 'building' 
                    ? (selectedPlanet.buildings[tech.id as keyof typeof selectedPlanet.buildings] || 0) > 0
                    : tech.category === 'research'
                    ? (player.research[tech.id as keyof typeof player.research] || 0) > 0
                    : true;

                  return (
                    <React.Fragment key={tech.id}>
                      <button
                        onClick={() => handleSelectTechnologyInDrawer(tech)}
                        className={`px-3 py-1 rounded text-xs font-rajdhani font-medium border transition-all duration-200 hover:scale-105 ${
                          isCompleted 
                            ? 'bg-neon-green/20 border-neon-green/30 text-neon-green hover:bg-neon-green/30'
                            : techStatus.canBuild
                            ? 'bg-neon-blue/20 border-neon-blue/30 text-neon-blue hover:bg-neon-blue/30'
                            : 'bg-neon-red/20 border-neon-red/30 text-neon-red hover:bg-neon-red/30'
                        }`}
                      >
                        {tech.name}
                      </button>
                      {index < path.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-gray-400" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </Card>
        )}

        {/* What This Unlocks */}
        {selectedTechnology.unlocks.length > 0 && (
          <Card title="Desbloquea">
            <div className="space-y-3">
              <p className="text-sm text-gray-400">
                Esta tecnología desbloquea las siguientes opciones:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedTechnology.unlocks.map(unlockId => {
                  const unlockedTech = TechnologyTreeUtils.getTechnologyById(unlockId);
                  if (!unlockedTech) return null;

                  const UnlockIcon = getCategoryIcon(unlockedTech.category);
                  const unlockColorClass = getCategoryColorClass(unlockedTech.category);

                  return (
                    <button
                      key={unlockId}
                      onClick={() => handleSelectTechnologyInDrawer(unlockedTech)}
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 hover:scale-105 ${unlockColorClass.bg} ${unlockColorClass.border} hover:${unlockColorClass.hover}`}
                    >
                      <UnlockIcon className={`w-4 h-4 ${unlockColorClass.text}`} />
                      <span className="text-sm font-rajdhani font-medium text-white">
                        {unlockedTech.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>
        )}

        {/* Dependents */}
        {dependents.length > 0 && (
          <Card title="Tecnologías Dependientes">
            <div className="space-y-3">
              <p className="text-sm text-gray-400">
                Las siguientes tecnologías requieren {selectedTechnology.name}:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dependents.map(dependent => {
                  const DependentIcon = getCategoryIcon(dependent.category);
                  const dependentColorClass = getCategoryColorClass(dependent.category);

                  return (
                    <button
                      key={dependent.id}
                      onClick={() => handleSelectTechnologyInDrawer(dependent)}
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 hover:scale-105 ${dependentColorClass.bg} ${dependentColorClass.border} hover:${dependentColorClass.hover}`}
                    >
                      <DependentIcon className={`w-4 h-4 ${dependentColorClass.text}`} />
                      <span className="text-sm font-rajdhani font-medium text-white">
                        {dependent.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>
        )}
      </div>
    );
  };

  const renderTechnologyDetailsDrawer = () => (
    <>
      {/* Drawer para móviles */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-transform duration-300 ${
        showDetailsDrawer ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="absolute inset-0 bg-black/50" onClick={handleCloseDrawer} />
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-space-900 border-l border-space-700 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-orbitron font-bold text-white">Detalles de Tecnología</h2>
              <button
                onClick={handleCloseDrawer}
                className="p-2 bg-space-700 rounded-lg hover:bg-space-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {renderTechnologyDetails()}
          </div>
        </div>
      </div>

      {/* Panel normal para desktop */}
      <div className="hidden lg:block lg:col-span-1">
        {renderTechnologyDetails()}
      </div>
    </>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            Árbol Tecnológico
          </h1>
          <p className="text-gray-400 mt-1">
            Explora las dependencias y requisitos de todas las tecnologías
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar tecnologías..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-space-700 border border-space-600 rounded-lg text-white text-sm focus:border-neon-blue focus:outline-none"
          />
        </div>
        
        <label className="flex items-center space-x-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={showOnlyAvailable}
            onChange={(e) => setShowOnlyAvailable(e.target.checked)}
            className="rounded"
          />
          <span>Solo disponibles</span>
        </label>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-1 bg-space-800/50 p-1 rounded-lg border border-space-600 overflow-x-auto">
        {categories.map((category) => {
          const categoryColorClass = getCategoryColorClass(category.id === 'all' ? 'building' : category.id);
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-rajdhani font-medium transition-all duration-200 whitespace-nowrap ${
                selectedCategory === category.id
                  ? `${categoryColorClass.bg} ${categoryColorClass.text} border ${categoryColorClass.border}`
                  : 'text-gray-400 hover:text-white hover:bg-space-700/50'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Technology List */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getAllTechnologies().map(tech => renderTechnologyCard(tech))}
          </div>
          
          {getAllTechnologies().length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Filter className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-rajdhani font-semibold mb-2">No se encontraron tecnologías</h3>
              <p className="text-sm">Ajusta los filtros para ver más opciones</p>
            </div>
          )}
        </div>

        {/* Technology Details */}
        {renderTechnologyDetailsDrawer()}
      </div>
    </div>
  );
}

// Función auxiliar para obtener el icono de categoría
function getCategoryIcon(category: TechnologyNode['category']) {
  switch (category) {
    case 'building': return Building;
    case 'research': return FlaskConical;
    case 'ship': return Rocket;
    case 'defense': return Shield;
  }
}