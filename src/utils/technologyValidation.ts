import { TechnologyTreeUtils } from '../data/technologyTree';
import { Buildings, Research, FleetShips, DefenseStructures } from '../types/game';

export class TechnologyValidation {
  /**
   * Validates if a player can perform a specific action based on technology requirements
   */
  static canPerformAction(
    action: 'build_ship' | 'build_defense' | 'upgrade_building' | 'research_technology',
    targetId: string,
    buildings: Buildings,
    research: Research
  ): { allowed: boolean; reason?: string; requirements?: string[] } {
    const { canBuild, missingRequirements } = TechnologyTreeUtils.checkRequirements(
      targetId,
      buildings,
      research
    );

    if (canBuild) {
      return { allowed: true };
    }

    const requirementTexts = missingRequirements.map(req => 
      TechnologyTreeUtils.getRequirementText(req)
    );

    return {
      allowed: false,
      reason: 'Requisitos tecnológicos no cumplidos',
      requirements: requirementTexts
    };
  }

  /**
   * Gets the next logical technology to research/build for a player
   */
  static getRecommendedNextTechnology(
    buildings: Buildings,
    research: Research,
    playerLevel: number
  ): { technology: string; reason: string; priority: 'high' | 'medium' | 'low' } | null {
    const unlockedTechs = TechnologyTreeUtils.getUnlockedTechnologies(buildings, research);
    
    // Priority recommendations based on player level and current state
    const recommendations = [
      // Early game priorities
      {
        condition: () => playerLevel < 10 && (buildings.metalMine || 0) < 10,
        technology: 'metalMine',
        reason: 'Aumenta la producción de metal para el desarrollo inicial',
        priority: 'high' as const
      },
      {
        condition: () => playerLevel < 10 && (buildings.crystalMine || 0) < 8,
        technology: 'crystalMine',
        reason: 'El cristal es esencial para la investigación',
        priority: 'high' as const
      },
      {
        condition: () => playerLevel < 15 && (research.combustionDrive || 0) < 2,
        technology: 'combustionDrive',
        reason: 'Permite construir naves básicas',
        priority: 'high' as const
      },
      
      // Mid game priorities
      {
        condition: () => playerLevel >= 10 && playerLevel < 20 && (buildings.roboticsFactory || 0) < 5,
        technology: 'roboticsFactory',
        reason: 'Acelera significativamente la construcción',
        priority: 'high' as const
      },
      {
        condition: () => playerLevel >= 10 && (research.impulseDrive || 0) < 3,
        technology: 'impulseDrive',
        reason: 'Desbloquea naves de combate avanzadas',
        priority: 'medium' as const
      },
      
      // Late game priorities
      {
        condition: () => playerLevel >= 20 && (research.hyperspaceTechnology || 0) < 3,
        technology: 'hyperspaceTechnology',
        reason: 'Tecnología avanzada para naves superiores',
        priority: 'medium' as const
      }
    ];

    for (const rec of recommendations) {
      if (rec.condition() && unlockedTechs.includes(rec.technology)) {
        return rec;
      }
    }

    return null;
  }

  /**
   * Validates technology tree integrity (for debugging)
   */
  static validateTechnologyTree(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const allTechs = TechnologyTreeUtils.getAllTechnologies();

    // Check for circular dependencies
    allTechs.forEach(tech => {
      const path = TechnologyTreeUtils.getTechnologyPath(tech.id);
      const techIds = path.map(t => t.id);
      
      if (techIds.indexOf(tech.id) !== techIds.lastIndexOf(tech.id)) {
        errors.push(`Circular dependency detected for ${tech.name}`);
      }
    });

    // Check for invalid requirements
    allTechs.forEach(tech => {
      tech.requirements.forEach(req => {
        const requiredTech = TechnologyTreeUtils.getTechnologyById(req.key);
        if (!requiredTech) {
          errors.push(`${tech.name} requires non-existent technology: ${req.key}`);
        }
      });
    });

    // Check for invalid unlocks
    allTechs.forEach(tech => {
      tech.unlocks.forEach(unlockId => {
        const unlockedTech = TechnologyTreeUtils.getTechnologyById(unlockId);
        if (!unlockedTech) {
          errors.push(`${tech.name} unlocks non-existent technology: ${unlockId}`);
        }
      });
    });

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Gets optimal build order for reaching a specific technology
   */
  static getOptimalBuildOrder(
    targetId: string,
    currentBuildings: Buildings,
    currentResearch: Research
  ): { order: string[]; estimatedTime: number; totalCost: any } {
    const path = TechnologyTreeUtils.getTechnologyPath(targetId);
    const buildOrder: string[] = [];
    let totalTime = 0;
    let totalCost = { metal: 0, crystal: 0, deuterium: 0, energy: 0 };

    // Simulate building each technology in the path
    let simulatedBuildings = { ...currentBuildings };
    let simulatedResearch = { ...currentResearch };

    path.forEach(tech => {
      const { canBuild } = TechnologyTreeUtils.checkRequirements(
        tech.id,
        simulatedBuildings,
        simulatedResearch
      );

      if (!canBuild) {
        // This technology is not yet available, add to build order
        const currentLevel = tech.category === 'building' 
          ? simulatedBuildings[tech.id as keyof Buildings] || 0
          : simulatedResearch[tech.id as keyof Research] || 0;

        const cost = TechnologyTreeUtils.calculateCost(tech.id, currentLevel + 1);
        
        buildOrder.push(tech.id);
        totalTime += cost.time;
        totalCost.metal += cost.metal;
        totalCost.crystal += cost.crystal;
        totalCost.deuterium += cost.deuterium;
        totalCost.energy += cost.energy;

        // Update simulated levels
        if (tech.category === 'building') {
          simulatedBuildings[tech.id as keyof Buildings] = currentLevel + 1;
        } else if (tech.category === 'research') {
          simulatedResearch[tech.id as keyof Research] = currentLevel + 1;
        }
      }
    });

    return {
      order: buildOrder,
      estimatedTime: totalTime,
      totalCost
    };
  }
}

export { TechnologyValidation };