import { useGame } from '../context/GameContext';
import { TechnologyTreeUtils, TechnologyNode } from '../data/technologyTree';

export function useTechnologyTree() {
  const { state } = useGame();
  const { player, selectedPlanet } = state;

  const checkRequirements = (technologyId: string) => {
    return TechnologyTreeUtils.checkRequirements(
      technologyId,
      selectedPlanet.buildings,
      player.research
    );
  };

  const calculateCost = (technologyId: string, level: number) => {
    return TechnologyTreeUtils.calculateCost(technologyId, level);
  };

  const getUnlockedTechnologies = () => {
    return TechnologyTreeUtils.getUnlockedTechnologies(
      selectedPlanet.buildings,
      player.research
    );
  };

  const getTechnologyPath = (targetId: string) => {
    return TechnologyTreeUtils.getTechnologyPath(targetId);
  };

  const canBuildTechnology = (technologyId: string, quantity: number = 1) => {
    return TechnologyTreeUtils.canBuildMultiple(
      technologyId,
      quantity,
      selectedPlanet.buildings,
      player.research,
      selectedPlanet.resources
    );
  };

  const getTechnologyDependents = (technologyId: string) => {
    return TechnologyTreeUtils.getTechnologyDependents(technologyId);
  };

  const getCurrentLevel = (technologyId: string): number => {
    const tech = TechnologyTreeUtils.getTechnologyById(technologyId);
    if (!tech) return 0;

    if (tech.category === 'building') {
      return selectedPlanet.buildings[technologyId as keyof typeof selectedPlanet.buildings] || 0;
    } else if (tech.category === 'research') {
      return player.research[technologyId as keyof typeof player.research] || 0;
    }
    
    return 0; // Ships and defenses don't have levels in this context
  };

  const getNextLevelCost = (technologyId: string) => {
    const currentLevel = getCurrentLevel(technologyId);
    return calculateCost(technologyId, currentLevel + 1);
  };

  const isMaxLevel = (technologyId: string): boolean => {
    const tech = TechnologyTreeUtils.getTechnologyById(technologyId);
    if (!tech || !tech.maxLevel) return false;
    
    const currentLevel = getCurrentLevel(technologyId);
    return currentLevel >= tech.maxLevel;
  };

  return {
    checkRequirements,
    calculateCost,
    getUnlockedTechnologies,
    getTechnologyPath,
    canBuildTechnology,
    getTechnologyDependents,
    getCurrentLevel,
    getNextLevelCost,
    isMaxLevel,
    buildings: selectedPlanet.buildings,
    research: player.research,
    resources: selectedPlanet.resources
  };
}