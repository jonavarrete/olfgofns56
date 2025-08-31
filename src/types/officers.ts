export interface Officer {
  id: string;
  name: string;
  title: string;
  description: string;
  rank: number;
  maxRank: number;
  active: boolean;
  hiredDate?: number;
  lastPromoted?: number;
  experience: number;
  experienceToNext: number;
  cost: OfficerCost;
  bonuses: OfficerBonuses;
  specialAbilities: SpecialAbility[];
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface OfficerCost {
  darkMatter: number; // Premium currency
  resources?: {
    metal: number;
    crystal: number;
    deuterium: number;
  };
  maintenanceCost: number; // Daily dark matter cost
}

export interface OfficerBonuses {
  // Production bonuses
  metalProduction?: number; // percentage
  crystalProduction?: number;
  deuteriumProduction?: number;
  energyProduction?: number;
  
  // Building bonuses
  buildingSpeed?: number;
  buildingCost?: number; // negative = discount
  
  // Research bonuses
  researchSpeed?: number;
  researchCost?: number;
  
  // Fleet bonuses
  shipyardSpeed?: number;
  shipyardCost?: number;
  fleetSpeed?: number;
  fleetCapacity?: number;
  fuelConsumption?: number; // negative = less consumption
  
  // Combat bonuses
  weaponsTechnology?: number;
  shieldingTechnology?: number;
  armourTechnology?: number;
  
  // Economic bonuses
  tradeBonus?: number;
  storageCapacity?: number;
  
  // Exploration bonuses
  expeditionSlots?: number;
  expeditionSuccess?: number;
  
  // Special bonuses
  planetSlots?: number;
  moonChance?: number;
  espionageBonus?: number;
}

export interface SpecialAbility {
  id: string;
  name: string;
  description: string;
  type: 'active' | 'passive';
  cooldown?: number; // for active abilities
  lastUsed?: number;
  cost?: {
    darkMatter?: number;
    resources?: {
      metal: number;
      crystal: number;
      deuterium: number;
    };
  };
  effect: {
    duration?: number; // for temporary effects
    value: any;
  };
}

export interface OfficerState {
  officers: Officer[];
  darkMatter: number;
  activeOfficers: string[]; // IDs of currently active officers
  officerSlots: number;
  usedSlots: number;
}