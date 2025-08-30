import { FleetShips, DefenseStructures, CombatReport, CombatRound, SimulationResult, Resources } from '../types/game';

interface CombatUnit {
  name: string;
  count: number;
  attack: number;
  shield: number;
  armor: number;
  speed: number;
  cost: Resources;
}

const shipStats: { [key in keyof FleetShips]: Omit<CombatUnit, 'name' | 'count'> } = {
  smallCargo: { attack: 5, shield: 10, armor: 400, speed: 5000, cost: { metal: 2000, crystal: 2000, deuterium: 0, energy: 0 } },
  largeCargo: { attack: 5, shield: 25, armor: 1200, speed: 7500, cost: { metal: 6000, crystal: 6000, deuterium: 0, energy: 0 } },
  lightFighter: { attack: 50, shield: 10, armor: 400, speed: 12500, cost: { metal: 3000, crystal: 1000, deuterium: 0, energy: 0 } },
  heavyFighter: { attack: 150, shield: 25, armor: 1000, speed: 10000, cost: { metal: 6000, crystal: 4000, deuterium: 0, energy: 0 } },
  cruiser: { attack: 400, shield: 50, armor: 2700, speed: 15000, cost: { metal: 20000, crystal: 7000, deuterium: 2000, energy: 0 } },
  battleship: { attack: 1000, shield: 200, armor: 6000, speed: 10000, cost: { metal: 45000, crystal: 15000, deuterium: 0, energy: 0 } },
  colonyShip: { attack: 50, shield: 100, armor: 3000, speed: 2500, cost: { metal: 10000, crystal: 20000, deuterium: 10000, energy: 0 } },
  recycler: { attack: 1, shield: 10, armor: 1600, speed: 2000, cost: { metal: 10000, crystal: 6000, deuterium: 2000, energy: 0 } },
  espionageProbe: { attack: 0.01, shield: 0.01, armor: 100, speed: 100000000, cost: { metal: 0, crystal: 1000, deuterium: 0, energy: 0 } },
  bomber: { attack: 1000, shield: 500, armor: 7500, speed: 4000, cost: { metal: 50000, crystal: 25000, deuterium: 15000, energy: 0 } },
  destroyer: { attack: 2000, shield: 500, armor: 11000, speed: 5000, cost: { metal: 60000, crystal: 50000, deuterium: 15000, energy: 0 } },
  deathstar: { attack: 200000, shield: 50000, armor: 900000, speed: 100, cost: { metal: 5000000, crystal: 4000000, deuterium: 1000000, energy: 0 } },
  battlecruiser: { attack: 700, shield: 400, armor: 7000, speed: 10000, cost: { metal: 30000, crystal: 40000, deuterium: 15000, energy: 0 } },
};

const defenseStats: { [key in keyof DefenseStructures]: Omit<CombatUnit, 'name' | 'count'> } = {
  rocketLauncher: { attack: 80, shield: 20, armor: 200, speed: 0, cost: { metal: 2000, crystal: 0, deuterium: 0, energy: 0 } },
  lightLaser: { attack: 100, shield: 25, armor: 200, speed: 0, cost: { metal: 1500, crystal: 500, deuterium: 0, energy: 0 } },
  heavyLaser: { attack: 250, shield: 100, armor: 800, speed: 0, cost: { metal: 6000, crystal: 2000, deuterium: 0, energy: 0 } },
  gaussCannon: { attack: 1100, shield: 200, armor: 3500, speed: 0, cost: { metal: 20000, crystal: 15000, deuterium: 2000, energy: 0 } },
  ionCannon: { attack: 150, shield: 500, armor: 800, speed: 0, cost: { metal: 2000, crystal: 6000, deuterium: 0, energy: 0 } },
  plasmaTurret: { attack: 3000, shield: 300, armor: 10000, speed: 0, cost: { metal: 50000, crystal: 50000, deuterium: 30000, energy: 0 } },
  smallShieldDome: { attack: 1, shield: 2000, armor: 2000, speed: 0, cost: { metal: 10000, crystal: 10000, deuterium: 0, energy: 0 } },
  largeShieldDome: { attack: 1, shield: 10000, armor: 10000, speed: 0, cost: { metal: 50000, crystal: 50000, deuterium: 0, energy: 0 } },
  antiBallisticMissiles: { attack: 1, shield: 1, armor: 800, speed: 0, cost: { metal: 8000, crystal: 0, deuterium: 2000, energy: 0 } },
  interplanetaryMissiles: { attack: 12000, shield: 1, armor: 1500, speed: 0, cost: { metal: 12500, crystal: 2500, deuterium: 10000, energy: 0 } },
};

export class CombatEngine {
  static simulateCombat(
    attackerFleet: FleetShips,
    defenderFleet: FleetShips,
    defenderDefenses: DefenseStructures,
    iterations: number = 1000
  ): SimulationResult {
    let attackerWins = 0;
    let defenderWins = 0;
    let draws = 0;
    
    let totalAttackerLosses: FleetShips = {} as FleetShips;
    let totalDefenderLosses: FleetShips & DefenseStructures = {} as FleetShips & DefenseStructures;
    let totalLoot: Resources = { metal: 0, crystal: 0, deuterium: 0, energy: 0 };
    let totalDebris: Resources = { metal: 0, crystal: 0, deuterium: 0, energy: 0 };

    for (let i = 0; i < iterations; i++) {
      const result = this.runSingleCombat(attackerFleet, defenderFleet, defenderDefenses);
      
      if (result.result === 'victory') attackerWins++;
      else if (result.result === 'defeat') defenderWins++;
      else draws++;

      // Accumulate losses
      Object.keys(result.attacker.losses).forEach(ship => {
        const shipKey = ship as keyof FleetShips;
        totalAttackerLosses[shipKey] = (totalAttackerLosses[shipKey] || 0) + result.attacker.losses[shipKey];
      });

      Object.keys(result.defender.losses).forEach(unit => {
        const unitKey = unit as keyof (FleetShips & DefenseStructures);
        totalDefenderLosses[unitKey] = (totalDefenderLosses[unitKey] || 0) + result.defender.losses[unitKey];
      });

      // Accumulate resources
      totalLoot.metal += result.loot.metal;
      totalLoot.crystal += result.loot.crystal;
      totalLoot.deuterium += result.loot.deuterium;
      
      totalDebris.metal += result.debrisField.metal;
      totalDebris.crystal += result.debrisField.crystal;
    }

    // Average the results
    Object.keys(totalAttackerLosses).forEach(ship => {
      const shipKey = ship as keyof FleetShips;
      totalAttackerLosses[shipKey] = Math.round(totalAttackerLosses[shipKey] / iterations);
    });

    Object.keys(totalDefenderLosses).forEach(unit => {
      const unitKey = unit as keyof (FleetShips & DefenseStructures);
      totalDefenderLosses[unitKey] = Math.round(totalDefenderLosses[unitKey] / iterations);
    });

    totalLoot.metal = Math.round(totalLoot.metal / iterations);
    totalLoot.crystal = Math.round(totalLoot.crystal / iterations);
    totalLoot.deuterium = Math.round(totalLoot.deuterium / iterations);
    
    totalDebris.metal = Math.round(totalDebris.metal / iterations);
    totalDebris.crystal = Math.round(totalDebris.crystal / iterations);

    return {
      rounds: 6, // Average rounds
      winner: attackerWins > defenderWins ? 'attacker' : defenderWins > attackerWins ? 'defender' : 'draw',
      attackerLosses: totalAttackerLosses,
      defenderLosses: totalDefenderLosses,
      loot: totalLoot,
      debrisField: totalDebris,
      probability: {
        attackerWins: attackerWins / iterations * 100,
        defenderWins: defenderWins / iterations * 100,
        draw: draws / iterations * 100,
      },
    };
  }

  private static runSingleCombat(
    attackerFleet: FleetShips,
    defenderFleet: FleetShips,
    defenderDefenses: DefenseStructures
  ): CombatReport {
    const rounds: CombatRound[] = [];
    let currentAttackerFleet = { ...attackerFleet };
    let currentDefenderFleet = { ...defenderFleet };
    let currentDefenderDefenses = { ...defenderDefenses };

    let roundNumber = 1;
    const maxRounds = 6;

    while (roundNumber <= maxRounds) {
      const attackerPower = this.calculateTotalPower(currentAttackerFleet, {});
      const defenderPower = this.calculateTotalPower(currentDefenderFleet, currentDefenderDefenses);

      if (attackerPower === 0 || defenderPower === 0) break;

      const round = this.simulateRound(
        currentAttackerFleet,
        currentDefenderFleet,
        currentDefenderDefenses
      );

      rounds.push(round);

      // Apply losses
      currentAttackerFleet = this.applyFleetLosses(currentAttackerFleet, round.attackerLosses);
      currentDefenderFleet = this.applyFleetLosses(currentDefenderFleet, round.defenderLosses);
      currentDefenderDefenses = this.applyDefenseLosses(currentDefenderDefenses, round.defenderLosses);

      roundNumber++;
    }

    const result = this.determineWinner(currentAttackerFleet, currentDefenderFleet, currentDefenderDefenses);
    const loot = this.calculateLoot(result === 'victory');
    const debris = this.calculateDebris(attackerFleet, currentAttackerFleet, defenderFleet, currentDefenderFleet);

    return {
      id: Date.now().toString(),
      timestamp: Date.now(),
      attacker: {
        name: 'Attacker',
        fleet: attackerFleet,
        losses: this.calculateFleetLosses(attackerFleet, currentAttackerFleet),
      },
      defender: {
        name: 'Defender',
        fleet: defenderFleet,
        defenses: defenderDefenses,
        losses: {
          ...this.calculateFleetLosses(defenderFleet, currentDefenderFleet),
          ...this.calculateDefenseLosses(defenderDefenses, currentDefenderDefenses),
        },
      },
      result,
      loot,
      debrisField: debris,
      rounds,
    };
  }

  private static simulateRound(
    attackerFleet: FleetShips,
    defenderFleet: FleetShips,
    defenderDefenses: DefenseStructures
  ): CombatRound {
    const attackerDamage = this.calculateTotalAttack(attackerFleet);
    const defenderDamage = this.calculateTotalAttack(defenderFleet) + this.calculateDefenseAttack(defenderDefenses);

    const attackerLosses = this.calculateRoundLosses(defenderDamage, attackerFleet, {});
    const defenderFleetLosses = this.calculateRoundLosses(attackerDamage * 0.7, defenderFleet, {});
    const defenderDefenseLosses = this.calculateDefenseRoundLosses(attackerDamage * 0.3, defenderDefenses);

    return {
      round: 1,
      attackerDamage,
      defenderDamage,
      attackerLosses,
      defenderLosses: { ...defenderFleetLosses, ...defenderDefenseLosses },
    };
  }

  private static calculateTotalPower(fleet: FleetShips, defenses: DefenseStructures): number {
    let power = 0;
    
    Object.entries(fleet).forEach(([ship, count]) => {
      const stats = shipStats[ship as keyof FleetShips];
      if (stats && count > 0) {
        power += count * (stats.attack + stats.shield + stats.armor);
      }
    });

    Object.entries(defenses).forEach(([defense, count]) => {
      const stats = defenseStats[defense as keyof DefenseStructures];
      if (stats && count > 0) {
        power += count * (stats.attack + stats.shield + stats.armor);
      }
    });

    return power;
  }

  private static calculateTotalAttack(fleet: FleetShips): number {
    let attack = 0;
    Object.entries(fleet).forEach(([ship, count]) => {
      const stats = shipStats[ship as keyof FleetShips];
      if (stats && count > 0) {
        attack += count * stats.attack;
      }
    });
    return attack;
  }

  private static calculateDefenseAttack(defenses: DefenseStructures): number {
    let attack = 0;
    Object.entries(defenses).forEach(([defense, count]) => {
      const stats = defenseStats[defense as keyof DefenseStructures];
      if (stats && count > 0) {
        attack += count * stats.attack;
      }
    });
    return attack;
  }

  private static calculateRoundLosses(damage: number, fleet: FleetShips, defenses: DefenseStructures): FleetShips {
    const losses: FleetShips = {} as FleetShips;
    let remainingDamage = damage;

    Object.entries(fleet).forEach(([ship, count]) => {
      if (remainingDamage <= 0 || count === 0) return;
      
      const stats = shipStats[ship as keyof FleetShips];
      const unitHealth = stats.shield + stats.armor;
      const unitsDestroyed = Math.min(count, Math.floor(remainingDamage / unitHealth));
      
      losses[ship as keyof FleetShips] = unitsDestroyed;
      remainingDamage -= unitsDestroyed * unitHealth;
    });

    return losses;
  }

  private static calculateDefenseRoundLosses(damage: number, defenses: DefenseStructures): DefenseStructures {
    const losses: DefenseStructures = {} as DefenseStructures;
    let remainingDamage = damage;

    Object.entries(defenses).forEach(([defense, count]) => {
      if (remainingDamage <= 0 || count === 0) return;
      
      const stats = defenseStats[defense as keyof DefenseStructures];
      const unitHealth = stats.shield + stats.armor;
      const unitsDestroyed = Math.min(count, Math.floor(remainingDamage / unitHealth));
      
      losses[defense as keyof DefenseStructures] = unitsDestroyed;
      remainingDamage -= unitsDestroyed * unitHealth;
    });

    return losses;
  }

  private static applyFleetLosses(fleet: FleetShips, losses: FleetShips): FleetShips {
    const result = { ...fleet };
    Object.entries(losses).forEach(([ship, lossCount]) => {
      const shipKey = ship as keyof FleetShips;
      result[shipKey] = Math.max(0, result[shipKey] - lossCount);
    });
    return result;
  }

  private static applyDefenseLosses(defenses: DefenseStructures, losses: DefenseStructures): DefenseStructures {
    const result = { ...defenses };
    Object.entries(losses).forEach(([defense, lossCount]) => {
      const defenseKey = defense as keyof DefenseStructures;
      result[defenseKey] = Math.max(0, result[defenseKey] - lossCount);
    });
    return result;
  }

  private static calculateFleetLosses(original: FleetShips, remaining: FleetShips): FleetShips {
    const losses: FleetShips = {} as FleetShips;
    Object.keys(original).forEach(ship => {
      const shipKey = ship as keyof FleetShips;
      losses[shipKey] = original[shipKey] - remaining[shipKey];
    });
    return losses;
  }

  private static calculateDefenseLosses(original: DefenseStructures, remaining: DefenseStructures): DefenseStructures {
    const losses: DefenseStructures = {} as DefenseStructures;
    Object.keys(original).forEach(defense => {
      const defenseKey = defense as keyof DefenseStructures;
      losses[defenseKey] = original[defenseKey] - remaining[defenseKey];
    });
    return losses;
  }

  private static determineWinner(
    attackerFleet: FleetShips,
    defenderFleet: FleetShips,
    defenderDefenses: DefenseStructures
  ): 'victory' | 'defeat' | 'draw' {
    const attackerPower = this.calculateTotalPower(attackerFleet, {});
    const defenderPower = this.calculateTotalPower(defenderFleet, defenderDefenses);

    if (attackerPower > defenderPower * 1.5) return 'victory';
    if (defenderPower > attackerPower * 1.5) return 'defeat';
    return 'draw';
  }

  private static calculateLoot(victory: boolean): Resources {
    if (!victory) return { metal: 0, crystal: 0, deuterium: 0, energy: 0 };
    
    return {
      metal: Math.floor(Math.random() * 100000) + 50000,
      crystal: Math.floor(Math.random() * 50000) + 25000,
      deuterium: Math.floor(Math.random() * 25000) + 10000,
      energy: 0,
    };
  }

  private static calculateDebris(
    originalAttacker: FleetShips,
    remainingAttacker: FleetShips,
    originalDefender: FleetShips,
    remainingDefender: FleetShips
  ): Resources {
    let metal = 0;
    let crystal = 0;

    // Calculate debris from attacker losses
    Object.entries(originalAttacker).forEach(([ship, count]) => {
      const shipKey = ship as keyof FleetShips;
      const lost = count - remainingAttacker[shipKey];
      const stats = shipStats[shipKey];
      metal += lost * stats.cost.metal * 0.3;
      crystal += lost * stats.cost.crystal * 0.3;
    });

    // Calculate debris from defender losses
    Object.entries(originalDefender).forEach(([ship, count]) => {
      const shipKey = ship as keyof FleetShips;
      const lost = count - remainingDefender[shipKey];
      const stats = shipStats[shipKey];
      metal += lost * stats.cost.metal * 0.3;
      crystal += lost * stats.cost.crystal * 0.3;
    });

    return {
      metal: Math.floor(metal),
      crystal: Math.floor(crystal),
      deuterium: 0,
      energy: 0,
    };
  }
}