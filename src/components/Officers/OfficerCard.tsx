import React from 'react';
import { Officer, SpecialAbility } from '../../types/officers';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { 
  Star, 
  Zap, 
  Clock, 
  TrendingUp, 
  Gem,
  Crown,
  Rocket,
  Building,
  FlaskConical,
  Eye,
  Package,
  Globe,
  Settings
} from 'lucide-react';

interface OfficerCardProps {
  officer: Officer;
  darkMatter: number;
  onPromote: (officerId: string) => void;
  onToggleStatus: (officerId: string) => void;
  onDismiss: (officerId: string) => void;
  onUseAbility: (officerId: string, abilityId: string) => void;
  canPromote: boolean;
}

export default function OfficerCard({ 
  officer, 
  darkMatter, 
  onPromote, 
  onToggleStatus, 
  onDismiss, 
  onUseAbility,
  canPromote 
}: OfficerCardProps) {
  const formatNumber = (num: number) => num.toLocaleString();
  
  const formatTimeRemaining = (timestamp: number) => {
    const remaining = Math.max(0, timestamp - Date.now());
    const hours = Math.floor(remaining / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getRarityColor = (rarity: Officer['rarity']) => {
    switch (rarity) {
      case 'common': return 'text-gray-400 border-gray-400/30';
      case 'uncommon': return 'text-neon-green border-neon-green/30';
      case 'rare': return 'text-neon-blue border-neon-blue/30';
      case 'epic': return 'text-neon-purple border-neon-purple/30';
      case 'legendary': return 'text-neon-orange border-neon-orange/30';
    }
  };

  const getOfficerIcon = (officerName: string) => {
    switch (officerName.toLowerCase()) {
      case 'comandante': return Crown;
      case 'almirante': return Rocket;
      case 'ingeniero': return Building;
      case 'científico': return FlaskConical;
      case 'espía': return Eye;
      case 'comerciante': return Package;
      case 'explorador': return Globe;
      case 'tecnócrata': return Zap;
      default: return Star;
    }
  };

  const Icon = getOfficerIcon(officer.name);

  return (
    <Card className="hover:scale-105 transition-transform duration-300">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-lg border ${getRarityColor(officer.rarity)} bg-space-700/30`}>
              <Icon className={`w-6 h-6 ${getRarityColor(officer.rarity).split(' ')[0]}`} />
            </div>
            <div>
              <h3 className="text-lg font-orbitron font-bold text-white">
                {officer.name}
              </h3>
              <p className="text-sm text-gray-400">{officer.title}</p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: officer.maxRank }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < officer.rank ? 'text-neon-orange fill-current' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-400">
                  Rango {officer.rank}/{officer.maxRank}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <div className={`px-2 py-1 rounded text-xs font-rajdhani font-medium border ${getRarityColor(officer.rarity)}`}>
              {officer.rarity}
            </div>
            <button
              onClick={() => onToggleStatus(officer.id)}
              className={`px-3 py-1 rounded text-xs font-rajdhani font-medium transition-colors ${
                officer.active 
                  ? 'bg-neon-green/20 text-neon-green hover:bg-neon-green/30' 
                  : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
              }`}
            >
              {officer.active ? 'Activo' : 'Inactivo'}
            </button>
          </div>
        </div>

        {/* Experience Bar */}
        {officer.rank < officer.maxRank && (
          <div>
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
              <span>Experiencia</span>
              <span>{formatNumber(officer.experience)}/{formatNumber(officer.experience + officer.experienceToNext)}</span>
            </div>
            <div className="w-full bg-space-600 rounded-full h-2">
              <div 
                className="bg-neon-blue h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(officer.experience / (officer.experience + officer.experienceToNext)) * 100}%` 
                }}
              />
            </div>
          </div>
        )}

        {/* Bonuses */}
        <div>
          <h4 className="text-sm font-rajdhani font-semibold text-white mb-2">
            Bonificaciones Activas
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.entries(officer.bonuses).slice(0, 6).map(([bonus, value]) => {
              if (typeof value !== 'number' || value === 0) return null;
              
              const bonusNames: { [key: string]: string } = {
                metalProduction: 'Producción de Metal',
                crystalProduction: 'Producción de Cristal',
                deuteriumProduction: 'Producción de Deuterio',
                energyProduction: 'Producción de Energía',
                buildingSpeed: 'Velocidad de Construcción',
                buildingCost: 'Costo de Construcción',
                researchSpeed: 'Velocidad de Investigación',
                researchCost: 'Costo de Investigación',
                shipyardSpeed: 'Velocidad del Astillero',
                fleetSpeed: 'Velocidad de Flota',
                fleetCapacity: 'Capacidad de Carga',
                fuelConsumption: 'Consumo de Combustible',
                tradeBonus: 'Bonus Comercial',
                storageCapacity: 'Capacidad de Almacenamiento',
                expeditionSlots: 'Slots de Expedición',
                expeditionSuccess: 'Éxito en Expediciones',
                espionageBonus: 'Bonus de Espionaje',
                planetSlots: 'Slots de Planeta',
              };

              return (
                <div key={bonus} className="flex items-center justify-between">
                  <span className="text-gray-400">{bonusNames[bonus] || bonus}:</span>
                  <span className={`font-rajdhani font-medium ${
                    value > 0 ? 'text-neon-green' : 'text-neon-red'
                  }`}>
                    {value > 0 ? '+' : ''}{value}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Special Abilities */}
        <div>
          <h4 className="text-sm font-rajdhani font-semibold text-white mb-2">
            Habilidades Especiales
          </h4>
          <div className="space-y-2">
            {officer.specialAbilities.map((ability) => {
              const isOnCooldown = ability.lastUsed && ability.cooldown && 
                (Date.now() - ability.lastUsed) < (ability.cooldown * 3600000);
              const canAfford = !ability.cost?.darkMatter || darkMatter >= ability.cost.darkMatter;

              return (
                <div key={ability.id} className="p-3 bg-space-700/30 rounded border border-space-600">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className="text-sm font-rajdhani font-medium text-white">
                          {ability.name}
                        </h5>
                        <span className={`px-2 py-0.5 rounded text-xs font-rajdhani font-medium ${
                          ability.type === 'active' ? 'bg-neon-blue/20 text-neon-blue' : 'bg-neon-green/20 text-neon-green'
                        }`}>
                          {ability.type === 'active' ? 'Activa' : 'Pasiva'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mb-2">{ability.description}</p>
                      
                      {ability.type === 'active' && (
                        <div className="flex items-center space-x-4 text-xs">
                          {ability.cost?.darkMatter && (
                            <div className="flex items-center space-x-1">
                              <Gem className="w-3 h-3 text-neon-purple" />
                              <span className="text-gray-400">{ability.cost.darkMatter}</span>
                            </div>
                          )}
                          {ability.cooldown && (
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-400">{ability.cooldown}h</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {ability.type === 'active' && (
                      <Button
                        size="sm"
                        variant={canAfford && !isOnCooldown ? "primary" : "secondary"}
                        disabled={!canAfford || isOnCooldown || !officer.active}
                        onClick={() => onUseAbility(officer.id, ability.id)}
                      >
                        {isOnCooldown ? (
                          <>
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTimeRemaining((ability.lastUsed || 0) + (ability.cooldown || 0) * 3600000)}
                          </>
                        ) : (
                          <>
                            <Zap className="w-3 h-3 mr-1" />
                            Usar
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-space-600">
          <Button
            size="sm"
            variant="danger"
            onClick={() => onDismiss(officer.id)}
          >
            Despedir
          </Button>

          {officer.rank < officer.maxRank && (
            <div className="text-right">
              <div className="text-xs text-gray-400 mb-1">
                Promoción: {officerPromotionCosts[officer.rank + 1 as keyof typeof officerPromotionCosts]?.darkMatter} 
                <Gem className="w-3 h-3 inline ml-1 text-neon-purple" />
              </div>
              <Button
                size="sm"
                variant={canPromote ? "primary" : "secondary"}
                disabled={!canPromote}
                onClick={() => onPromote(officer.id)}
              >
                <TrendingUp className="w-3 h-3 mr-1" />
                Promover
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}