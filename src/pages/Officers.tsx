import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { 
  Crown, 
  Star, 
  TrendingUp, 
  Zap, 
  Clock, 
  Award,
  Users,
  Rocket,
  FlaskConical,
  Building,
  Eye,
  Package,
  Globe,
  Shield,
  Sword,
  Plus,
  Minus,
  AlertTriangle,
  CheckCircle,
  Gem,
  Calendar,
  Target,
  Settings,
  Info
} from 'lucide-react';
import { Officer, SpecialAbility } from '../types/officers';
import { baseOfficers, officerPromotionCosts, darkMatterSources } from '../data/officersData';

export default function Officers() {
  const { state } = useGame();
  const { player } = state;
  
  // Mock officer state (in real app, this would come from context)
  const [officers, setOfficers] = useState<Officer[]>([
    {
      ...baseOfficers[0],
      id: '1',
      rank: 3,
      active: true,
      hiredDate: Date.now() - 86400000 * 30,
      experience: 3500,
      experienceToNext: 1500,
    },
    {
      ...baseOfficers[1],
      id: '2',
      rank: 2,
      active: true,
      hiredDate: Date.now() - 86400000 * 15,
      experience: 1800,
      experienceToNext: 700,
    },
    {
      ...baseOfficers[2],
      id: '3',
      rank: 1,
      active: false,
      hiredDate: Date.now() - 86400000 * 7,
      experience: 500,
      experienceToNext: 500,
    }
  ]);
  
  const [darkMatter, setDarkMatter] = useState(1250);
  const [selectedOfficer, setSelectedOfficer] = useState<Officer | null>(null);
  const [showHireModal, setShowHireModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'active' | 'available' | 'dark_matter'>('active');

  const activeOfficers = officers.filter(o => o.active);
  const availableOfficers = baseOfficers.filter(base => 
    !officers.some(o => o.name === base.name)
  );

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const formatTimeRemaining = (timestamp: number) => {
    const remaining = Math.max(0, timestamp - Date.now());
    const hours = Math.floor(remaining / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const canPromoteOfficer = (officer: Officer) => {
    if (officer.rank >= officer.maxRank) return false;
    const cost = officerPromotionCosts[officer.rank + 1 as keyof typeof officerPromotionCosts];
    return darkMatter >= cost.darkMatter && officer.experience >= cost.experience;
  };

  const canAffordOfficer = (officer: typeof baseOfficers[0]) => {
    return darkMatter >= officer.cost.darkMatter;
  };

  const promoteOfficer = (officerId: string) => {
    setOfficers(officers.map(officer => {
      if (officer.id === officerId && canPromoteOfficer(officer)) {
        const cost = officerPromotionCosts[officer.rank + 1 as keyof typeof officerPromotionCosts];
        setDarkMatter(prev => prev - cost.darkMatter);
        
        return {
          ...officer,
          rank: officer.rank + 1,
          experience: officer.experience - cost.experience,
          experienceToNext: officer.rank + 1 < officer.maxRank ? 
            officerPromotionCosts[officer.rank + 2 as keyof typeof officerPromotionCosts]?.experience || 0 : 0,
          lastPromoted: Date.now(),
          // Increase bonuses with rank
          bonuses: Object.fromEntries(
            Object.entries(officer.bonuses).map(([key, value]) => [
              key, 
              typeof value === 'number' ? Math.floor(value * 1.2) : value
            ])
          ),
        };
      }
      return officer;
    }));
  };

  const hireOfficer = (baseOfficer: typeof baseOfficers[0]) => {
    if (!canAffordOfficer(baseOfficer)) return;

    const newOfficer: Officer = {
      ...baseOfficer,
      id: Date.now().toString(),
      rank: 1,
      active: true,
      hiredDate: Date.now(),
      experience: 0,
      experienceToNext: officerPromotionCosts[2].experience,
    };

    setOfficers([...officers, newOfficer]);
    setDarkMatter(prev => prev - baseOfficer.cost.darkMatter);
    setShowHireModal(false);
  };

  const dismissOfficer = (officerId: string) => {
    if (window.confirm('¿Estás seguro de que quieres despedir a este oficial? Perderás toda la experiencia y rangos.')) {
      setOfficers(officers.filter(o => o.id !== officerId));
    }
  };

  const toggleOfficerStatus = (officerId: string) => {
    setOfficers(officers.map(officer => 
      officer.id === officerId 
        ? { ...officer, active: !officer.active }
        : officer
    ));
  };

  const useSpecialAbility = (officerId: string, abilityId: string) => {
    const officer = officers.find(o => o.id === officerId);
    const ability = officer?.specialAbilities.find(a => a.id === abilityId);
    
    if (!officer || !ability || ability.type !== 'active') return;
    
    // Check cooldown
    if (ability.lastUsed && ability.cooldown) {
      const timeSinceUsed = Date.now() - ability.lastUsed;
      const cooldownMs = ability.cooldown * 3600000;
      if (timeSinceUsed < cooldownMs) {
        alert(`Habilidad en enfriamiento. Disponible en ${formatTimeRemaining(ability.lastUsed + cooldownMs)}`);
        return;
      }
    }

    // Check cost
    if (ability.cost?.darkMatter && darkMatter < ability.cost.darkMatter) {
      alert('No tienes suficiente materia oscura');
      return;
    }

    // Use ability
    if (ability.cost?.darkMatter) {
      setDarkMatter(prev => prev - ability.cost!.darkMatter!);
    }

    setOfficers(officers.map(o => 
      o.id === officerId 
        ? {
            ...o,
            specialAbilities: o.specialAbilities.map(a =>
              a.id === abilityId ? { ...a, lastUsed: Date.now() } : a
            )
          }
        : o
    ));

    alert(`¡Habilidad "${ability.name}" activada!`);
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

  const renderActiveOfficers = () => (
    <div className="space-y-4">
      {activeOfficers.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-rajdhani font-semibold mb-2">No hay oficiales activos</h3>
          <p className="text-sm">Contrata oficiales para obtener bonificaciones especiales</p>
          <Button 
            variant="primary" 
            className="mt-4"
            onClick={() => setActiveTab('available')}
          >
            Ver Oficiales Disponibles
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeOfficers.map((officer) => {
            const Icon = getOfficerIcon(officer.name);
            const canPromote = canPromoteOfficer(officer);
            const promotionCost = officer.rank < officer.maxRank ? 
              officerPromotionCosts[officer.rank + 1 as keyof typeof officerPromotionCosts] : null;

            return (
              <Card key={officer.id} className="hover:scale-105 transition-transform duration-300">
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
                    
                    <div className={`px-2 py-1 rounded text-xs font-rajdhani font-medium border ${getRarityColor(officer.rarity)}`}>
                      {officer.rarity}
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
                      {Object.entries(officer.bonuses).map(([bonus, value]) => {
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
                                  disabled={!canAfford || isOnCooldown}
                                  onClick={() => useSpecialAbility(officer.id, ability.id)}
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
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleOfficerStatus(officer.id)}
                        className={`px-3 py-1 rounded text-xs font-rajdhani font-medium transition-colors ${
                          officer.active 
                            ? 'bg-neon-green/20 text-neon-green hover:bg-neon-green/30' 
                            : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
                        }`}
                      >
                        {officer.active ? 'Activo' : 'Inactivo'}
                      </button>
                      
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => dismissOfficer(officer.id)}
                      >
                        Despedir
                      </Button>
                    </div>

                    {officer.rank < officer.maxRank && (
                      <div className="text-right">
                        {promotionCost && (
                          <div className="text-xs text-gray-400 mb-1">
                            Promoción: {promotionCost.darkMatter} <Gem className="w-3 h-3 inline text-neon-purple" />
                          </div>
                        )}
                        <Button
                          size="sm"
                          variant={canPromote ? "primary" : "secondary"}
                          disabled={!canPromote}
                          onClick={() => promoteOfficer(officer.id)}
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
          })}
        </div>
      )}
    </div>
  );

  const renderAvailableOfficers = () => (
    <div className="space-y-4">
      {availableOfficers.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <CheckCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-rajdhani font-semibold mb-2">Todos los oficiales contratados</h3>
          <p className="text-sm">Has contratado a todos los oficiales disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {availableOfficers.map((officer, index) => {
            const Icon = getOfficerIcon(officer.name);
            const canAfford = canAffordOfficer(officer);

            return (
              <Card key={index} className="hover:scale-105 transition-transform duration-300">
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
                        <div className="flex items-center space-x-1 mt-1">
                          {Array.from({ length: officer.maxRank }, (_, i) => (
                            <Star key={i} className="w-3 h-3 text-gray-600" />
                          ))}
                          <span className="text-xs text-gray-400 ml-2">
                            Máx. Rango {officer.maxRank}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`px-2 py-1 rounded text-xs font-rajdhani font-medium border ${getRarityColor(officer.rarity)}`}>
                      {officer.rarity}
                    </div>
                  </div>

                  <p className="text-sm text-gray-300">{officer.description}</p>

                  {/* Initial Bonuses */}
                  <div>
                    <h4 className="text-sm font-rajdhani font-semibold text-white mb-2">
                      Bonificaciones (Rango 1)
                    </h4>
                    <div className="grid grid-cols-1 gap-1 text-xs">
                      {Object.entries(officer.bonuses).slice(0, 4).map(([bonus, value]) => {
                        if (typeof value !== 'number' || value === 0) return null;
                        
                        const bonusNames: { [key: string]: string } = {
                          metalProduction: 'Producción de Metal',
                          crystalProduction: 'Producción de Cristal',
                          deuteriumProduction: 'Producción de Deuterio',
                          buildingSpeed: 'Velocidad de Construcción',
                          researchSpeed: 'Velocidad de Investigación',
                          fleetSpeed: 'Velocidad de Flota',
                          tradeBonus: 'Bonus Comercial',
                          expeditionSuccess: 'Éxito en Expediciones',
                        };

                        return (
                          <div key={bonus} className="flex items-center justify-between">
                            <span className="text-gray-400">{bonusNames[bonus] || bonus}:</span>
                            <span className="text-neon-green font-rajdhani font-medium">
                              +{value}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Special Abilities Preview */}
                  <div>
                    <h4 className="text-sm font-rajdhani font-semibold text-white mb-2">
                      Habilidades Especiales ({officer.specialAbilities.length})
                    </h4>
                    <div className="space-y-1">
                      {officer.specialAbilities.slice(0, 2).map((ability) => (
                        <div key={ability.id} className="text-xs text-gray-400">
                          • {ability.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cost and Hire */}
                  <div className="flex items-center justify-between pt-3 border-t border-space-600">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Gem className="w-4 h-4 text-neon-purple" />
                        <span className="text-sm font-rajdhani font-medium text-white">
                          {formatNumber(officer.cost.darkMatter)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">
                        Mantenimiento: {officer.cost.maintenanceCost}/día
                      </div>
                    </div>

                    <Button
                      variant={canAfford ? "primary" : "secondary"}
                      disabled={!canAfford}
                      onClick={() => hireOfficer(officer)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Contratar
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderDarkMatter = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-orbitron font-semibold text-white">
              Fuentes de Materia Oscura
            </h3>
            <div className="flex items-center space-x-2">
              <Gem className="w-5 h-5 text-neon-purple" />
              <span className="text-xl font-orbitron font-bold text-neon-purple">
                {formatNumber(darkMatter)}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {darkMatterSources.map((source) => (
              <div key={source.id} className="flex items-center justify-between p-3 bg-space-700/30 rounded border border-space-600">
                <div>
                  <h4 className="font-rajdhani font-medium text-white">{source.name}</h4>
                  <p className="text-xs text-gray-400">{source.description}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Gem className="w-4 h-4 text-neon-purple" />
                    <span className="font-rajdhani font-bold text-neon-purple">
                      +{source.amount}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 capitalize">{source.frequency}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Gastos Diarios">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Mantenimiento de Oficiales:</span>
              <div className="flex items-center space-x-1">
                <Gem className="w-3 h-3 text-neon-purple" />
                <span className="text-sm font-rajdhani font-medium text-white">
                  {activeOfficers.reduce((sum, o) => sum + o.cost.maintenanceCost, 0)}
                </span>
              </div>
            </div>
            
            <div className="pt-2 border-t border-space-600">
              <div className="flex items-center justify-between">
                <span className="text-sm font-rajdhani font-semibold text-white">Total Diario:</span>
                <div className="flex items-center space-x-1">
                  <Gem className="w-4 h-4 text-neon-purple" />
                  <span className="text-lg font-orbitron font-bold text-neon-purple">
                    {activeOfficers.reduce((sum, o) => sum + o.cost.maintenanceCost, 0)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-neon-blue/10 border border-neon-blue/30 rounded">
              <div className="flex items-center space-x-2 mb-2">
                <Info className="w-4 h-4 text-neon-blue" />
                <span className="text-sm font-rajdhani font-medium text-white">
                  Duración Actual
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Con tu materia oscura actual, puedes mantener a tus oficiales durante{' '}
                <span className="text-neon-blue font-rajdhani font-medium">
                  {Math.floor(darkMatter / Math.max(1, activeOfficers.reduce((sum, o) => sum + o.cost.maintenanceCost, 0)))} días
                </span>
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tips */}
      <Card title="Consejos sobre Materia Oscura">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <h4 className="font-rajdhani font-semibold text-white">Cómo Obtener Más:</h4>
            <ul className="space-y-1 text-gray-400">
              <li>• Conectarse diariamente (+25)</li>
              <li>• Completar misiones semanales (+100)</li>
              <li>• Victorias en combate importantes (+30)</li>
              <li>• Expediciones exitosas (+75)</li>
              <li>• Desbloquear logros (+50)</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-rajdhani font-semibold text-white">Gestión Eficiente:</h4>
            <ul className="space-y-1 text-gray-400">
              <li>• Activa solo los oficiales necesarios</li>
              <li>• Promociona oficiales gradualmente</li>
              <li>• Usa habilidades especiales estratégicamente</li>
              <li>• Mantén reservas para emergencias</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            Oficiales del Imperio
          </h1>
          <p className="text-gray-400 mt-1">
            Gestiona tu estado mayor y obtén bonificaciones estratégicas
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-4 py-2 bg-neon-purple/20 rounded-lg border border-neon-purple/30">
            <Gem className="w-5 h-5 text-neon-purple" />
            <span className="text-neon-purple font-orbitron font-bold text-lg">
              {formatNumber(darkMatter)}
            </span>
            <span className="text-sm text-gray-400">Materia Oscura</span>
          </div>
          
          <div className="flex items-center space-x-2 px-4 py-2 bg-neon-blue/20 rounded-lg border border-neon-blue/30">
            <Users className="w-5 h-5 text-neon-blue" />
            <span className="text-neon-blue font-rajdhani font-medium">
              {activeOfficers.length}/8 Activos
            </span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-space-800/50 p-1 rounded-lg border border-space-600">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-rajdhani font-medium transition-all duration-200 ${
            activeTab === 'active'
              ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
              : 'text-gray-400 hover:text-white hover:bg-space-700/50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Oficiales Activos ({activeOfficers.length})</span>
        </button>
        
        <button
          onClick={() => setActiveTab('available')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-rajdhani font-medium transition-all duration-200 ${
            activeTab === 'available'
              ? 'bg-neon-green/20 text-neon-green border border-neon-green/30'
              : 'text-gray-400 hover:text-white hover:bg-space-700/50'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Disponibles ({availableOfficers.length})</span>
        </button>
        
        <button
          onClick={() => setActiveTab('dark_matter')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-rajdhani font-medium transition-all duration-200 ${
            activeTab === 'dark_matter'
              ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30'
              : 'text-gray-400 hover:text-white hover:bg-space-700/50'
          }`}
        >
          <Gem className="w-4 h-4" />
          <span>Materia Oscura</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="relative">
        {activeTab === 'active' && renderActiveOfficers()}
        {activeTab === 'available' && renderAvailableOfficers()}
        {activeTab === 'dark_matter' && renderDarkMatter()}
      </div>

      {/* Summary of Active Bonuses */}
      {activeOfficers.length > 0 && (
        <Card title="Resumen de Bonificaciones Activas" glowing>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* Calculate total bonuses */}
            {(() => {
              const totalBonuses: { [key: string]: number } = {};
              
              activeOfficers.forEach(officer => {
                Object.entries(officer.bonuses).forEach(([bonus, value]) => {
                  if (typeof value === 'number') {
                    totalBonuses[bonus] = (totalBonuses[bonus] || 0) + value;
                  }
                });
              });

              return Object.entries(totalBonuses).map(([bonus, value]) => {
                const bonusNames: { [key: string]: { name: string; icon: React.ElementType } } = {
                  metalProduction: { name: 'Metal', icon: Building },
                  crystalProduction: { name: 'Cristal', icon: Gem },
                  deuteriumProduction: { name: 'Deuterio', icon: Zap },
                  buildingSpeed: { name: 'Construcción', icon: Building },
                  researchSpeed: { name: 'Investigación', icon: FlaskConical },
                  fleetSpeed: { name: 'Velocidad', icon: Rocket },
                  tradeBonus: { name: 'Comercio', icon: Package },
                  expeditionSuccess: { name: 'Expediciones', icon: Globe },
                };

                const config = bonusNames[bonus];
                if (!config) return null;

                return (
                  <div key={bonus} className="text-center">
                    <div className="p-3 bg-neon-blue/20 rounded-lg mb-2">
                      <config.icon className="w-5 h-5 text-neon-blue mx-auto" />
                    </div>
                    <p className="text-xs text-gray-400">{config.name}</p>
                    <p className="text-lg font-orbitron font-bold text-neon-green">
                      +{value}%
                    </p>
                  </div>
                );
              });
            })()}
          </div>
        </Card>
      )}
    </div>
  );
}