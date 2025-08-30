import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { 
  Users, 
  TrendingUp,
  Star,
  Eye,
  EyeOff,
  Target,
  Shield,
  Infinity,
  Search,
  Calendar,
  Globe,
  Zap,
  Sword,
  MessageSquare,
  Package
} from 'lucide-react';
import { AlienRace } from '../types/game';
import { alienRaces } from '../data/alienRaces';

export default function GalacticGuide() {
  const { state } = useGame();
  const [discoveredRaces, setDiscoveredRaces] = useState<AlienRace[]>(alienRaces);
  const [totalRacesEncountered, setTotalRacesEncountered] = useState(alienRaces.length);
  const [selectedRace, setSelectedRace] = useState<AlienRace | null>(null);
  const [raceFilter, setRaceFilter] = useState<'all' | 'discovered' | 'undiscovered'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | AlienRace['type']>('all');

  const discoverRace = (raceId: string) => {
    setDiscoveredRaces(prev => 
      prev.map(race => 
        race.id === raceId 
          ? { ...race, discovered: true, discoveryDate: Date.now() }
          : race
      )
    );
  };

  const filteredRaces = discoveredRaces.filter(race => {
    const statusMatch = raceFilter === 'all' || 
      (raceFilter === 'discovered' && race.discovered) ||
      (raceFilter === 'undiscovered' && !race.discovered);
    
    const typeMatch = typeFilter === 'all' || race.type === typeFilter;
    
    return statusMatch && typeMatch;
  });

  const discoveredCount = discoveredRaces.filter(r => r.discovered).length;
  const undiscoveredCount = discoveredRaces.filter(r => !r.discovered).length;

  const getRaceTypeColor = (type: AlienRace['type']) => {
    switch (type) {
      case 'peaceful': return 'text-neon-green bg-neon-green/20 border-neon-green/30';
      case 'neutral': return 'text-neon-blue bg-neon-blue/20 border-neon-blue/30';
      case 'aggressive': return 'text-neon-red bg-neon-red/20 border-neon-red/30';
      case 'ancient': return 'text-neon-purple bg-neon-purple/20 border-neon-purple/30';
      case 'mysterious': return 'text-neon-orange bg-neon-orange/20 border-neon-orange/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getRarityColor = (rarity: AlienRace['rarity']) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'uncommon': return 'text-neon-green';
      case 'rare': return 'text-neon-blue';
      case 'legendary': return 'text-neon-purple';
      case 'mythic': return 'text-neon-orange';
      default: return 'text-gray-400';
    }
  };

  const getTraitIcon = (trait: string) => {
    switch (trait) {
      case 'technology': return Zap;
      case 'military': return Sword;
      case 'diplomacy': return MessageSquare;
      case 'trade': return Package;
      case 'expansion': return Globe;
      default: return Star;
    }
  };

  if (selectedRace) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="secondary"
            onClick={() => setSelectedRace(null)}
          >
            ← Volver a la Guía
          </Button>
          <div className="flex items-center space-x-2">
            <div className={`px-3 py-1 rounded-lg border font-rajdhani font-medium ${getRaceTypeColor(selectedRace.type)}`}>
              {selectedRace.type === 'peaceful' ? 'Pacífica' :
               selectedRace.type === 'neutral' ? 'Neutral' :
               selectedRace.type === 'aggressive' ? 'Agresiva' :
               selectedRace.type === 'ancient' ? 'Ancestral' :
               'Misteriosa'}
            </div>
            <Star className={`w-5 h-5 ${getRarityColor(selectedRace.rarity)}`} />
          </div>
        </div>

        <Card glowing>
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start space-x-6">
              <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-space-600 flex-shrink-0">
                {selectedRace.discovered ? (
                  <img 
                    src={selectedRace.image} 
                    alt={selectedRace.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-space-700 flex items-center justify-center">
                    <EyeOff className="w-8 h-8 text-gray-500" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-orbitron font-bold text-white">
                    {selectedRace.discovered ? selectedRace.name : 'Raza Desconocida'}
                  </h1>
                  <div className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${
                    selectedRace.rarity === 'common' ? 'bg-gray-500/20 text-gray-400' :
                    selectedRace.rarity === 'uncommon' ? 'bg-neon-green/20 text-neon-green' :
                    selectedRace.rarity === 'rare' ? 'bg-neon-blue/20 text-neon-blue' :
                    selectedRace.rarity === 'legendary' ? 'bg-neon-purple/20 text-neon-purple' :
                    'bg-neon-orange/20 text-neon-orange'
                  }`}>
                    {selectedRace.rarity === 'common' ? 'Común' :
                     selectedRace.rarity === 'uncommon' ? 'Poco Común' :
                     selectedRace.rarity === 'rare' ? 'Rara' :
                     selectedRace.rarity === 'legendary' ? 'Legendaria' :
                     'Mítica'}
                  </div>
                </div>
                <p className="text-gray-300 mb-4">
                  {selectedRace.discovered ? selectedRace.description : 'Información clasificada. Completa misiones para descubrir más sobre esta raza.'}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-400">Mundo Natal:</span>
                    <p className="text-white font-rajdhani font-medium">
                      {selectedRace.discovered ? selectedRace.homeworld : '???'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-400">Estado:</span>
                    <p className={`font-rajdhani font-medium ${selectedRace.discovered ? 'text-neon-green' : 'text-neon-red'}`}>
                      {selectedRace.discovered ? 'Descubierta' : 'No Descubierta'}
                    </p>
                  </div>
                  {selectedRace.discovered && selectedRace.discoveryDate && (
                    <div className="col-span-2">
                      <span className="text-sm text-gray-400">Fecha de Descubrimiento:</span>
                      <p className="text-white font-rajdhani font-medium">
                        {new Date(selectedRace.discoveryDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {selectedRace.discovered ? (
              <>
                {/* Traits */}
                <div>
                  <h3 className="text-xl font-rajdhani font-semibold text-white mb-4">
                    Características Raciales
                  </h3>
                  <div className="grid grid-cols-5 gap-4">
                    {Object.entries(selectedRace.traits).map(([trait, value]) => {
                      const Icon = getTraitIcon(trait);
                      return (
                        <div key={trait} className="text-center">
                          <div className="w-16 h-16 mx-auto mb-2 bg-space-700 rounded-full flex items-center justify-center relative border-2 border-space-600">
                            <div 
                              className="absolute inset-1 rounded-full"
                              style={{ 
                                background: `conic-gradient(from 0deg, transparent ${(10-value)*36}deg, rgba(0,212,255,0.3) ${(10-value)*36}deg, rgba(0,212,255,0.8) ${value*36}deg, transparent ${value*36}deg)`
                              }}
                            />
                            <div className="relative z-10 flex flex-col items-center">
                              <Icon className="w-4 h-4 text-neon-blue mb-1" />
                              <span className="text-sm font-orbitron font-bold text-white">
                                {value}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-400 capitalize">
                            {trait === 'technology' ? 'Tecnología' :
                             trait === 'military' ? 'Militar' :
                             trait === 'diplomacy' ? 'Diplomacia' :
                             trait === 'trade' ? 'Comercio' :
                             'Expansión'}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Specialties and Weaknesses */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-rajdhani font-semibold text-white mb-3">
                      Especialidades
                    </h4>
                    <div className="space-y-2">
                      {selectedRace.specialties.map((specialty, index) => (
                        <div key={index} className="flex items-center space-x-2 p-3 bg-neon-green/10 rounded-lg border border-neon-green/30">
                          <TrendingUp className="w-4 h-4 text-neon-green" />
                          <span className="text-sm text-gray-300">{specialty}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-rajdhani font-semibold text-white mb-3">
                      Debilidades
                    </h4>
                    <div className="space-y-2">
                      {selectedRace.weaknesses.map((weakness, index) => (
                        <div key={index} className="flex items-center space-x-2 p-3 bg-neon-red/10 rounded-lg border border-neon-red/30">
                          <Target className="w-4 h-4 text-neon-red" />
                          <span className="text-sm text-gray-300">{weakness}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Diplomatic Preferences */}
                <div>
                  <h4 className="text-lg font-rajdhani font-semibold text-white mb-3">
                    Preferencias Diplomáticas
                  </h4>
                  <div className={`p-4 rounded-lg border ${
                    selectedRace.preferredDiplomacy === 'alliance' ? 'bg-neon-green/10 border-neon-green/30' :
                    selectedRace.preferredDiplomacy === 'trade' ? 'bg-neon-blue/10 border-neon-blue/30' :
                    selectedRace.preferredDiplomacy === 'neutral' ? 'bg-gray-500/10 border-gray-500/30' :
                    'bg-neon-red/10 border-neon-red/30'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        selectedRace.preferredDiplomacy === 'alliance' ? 'bg-neon-green/20' :
                        selectedRace.preferredDiplomacy === 'trade' ? 'bg-neon-blue/20' :
                        selectedRace.preferredDiplomacy === 'neutral' ? 'bg-gray-500/20' :
                        'bg-neon-red/20'
                      }`}>
                        {selectedRace.preferredDiplomacy === 'alliance' ? <Shield className="w-5 h-5 text-neon-green" /> :
                         selectedRace.preferredDiplomacy === 'trade' ? <Package className="w-5 h-5 text-neon-blue" /> :
                         selectedRace.preferredDiplomacy === 'neutral' ? <Eye className="w-5 h-5 text-gray-400" /> :
                         <Sword className="w-5 h-5 text-neon-red" />}
                      </div>
                      <div>
                        <p className="font-rajdhani font-semibold text-white">
                          {selectedRace.preferredDiplomacy === 'alliance' ? 'Buscan Alianzas' :
                           selectedRace.preferredDiplomacy === 'trade' ? 'Orientados al Comercio' :
                           selectedRace.preferredDiplomacy === 'neutral' ? 'Mantienen Neutralidad' :
                           'Hostiles por Naturaleza'}
                        </p>
                        <p className="text-sm text-gray-400">
                          {selectedRace.preferredDiplomacy === 'alliance' ? 'Prefieren cooperación y alianzas mutuamente beneficiosas' :
                           selectedRace.preferredDiplomacy === 'trade' ? 'Priorizan relaciones comerciales y intercambio de recursos' :
                           selectedRace.preferredDiplomacy === 'neutral' ? 'Evalúan cada situación de forma independiente' :
                           'Ven a otras razas como amenazas o recursos a conquistar'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lore */}
                <div>
                  <h4 className="text-lg font-rajdhani font-semibold text-white mb-3">
                    Historia y Cultura
                  </h4>
                  <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <p className="text-gray-300 leading-relaxed">
                      {selectedRace.lore}
                    </p>
                  </div>
                </div>

                {/* Rewards */}
                {selectedRace.rewards && (
                  <div>
                    <h4 className="text-lg font-rajdhani font-semibold text-white mb-3">
                      Recompensas por Alianza
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedRace.rewards.technology && (
                        <div className="p-4 bg-neon-purple/10 rounded-lg border border-neon-purple/30">
                          <div className="flex items-center space-x-2 mb-3">
                            <Zap className="w-5 h-5 text-neon-purple" />
                            <h5 className="font-rajdhani font-semibold text-neon-purple">
                              Tecnologías
                            </h5>
                          </div>
                          <div className="space-y-1">
                            {selectedRace.rewards.technology.map((tech, index) => (
                              <p key={index} className="text-sm text-gray-300">{tech}</p>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {selectedRace.rewards.resources && (
                        <div className="p-4 bg-neon-green/10 rounded-lg border border-neon-green/30">
                          <div className="flex items-center space-x-2 mb-3">
                            <Package className="w-5 h-5 text-neon-green" />
                            <h5 className="font-rajdhani font-semibold text-neon-green">
                              Recursos
                            </h5>
                          </div>
                          <div className="space-y-1 text-sm">
                            {Object.entries(selectedRace.rewards.resources).map(([resource, amount]) => (
                              amount > 0 && (
                                <div key={resource} className="flex justify-between">
                                  <span className="text-gray-400 capitalize">{resource}:</span>
                                  <span className="text-white">{amount.toLocaleString()}</span>
                                </div>
                              )
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedRace.rewards.ships && (
                        <div className="p-4 bg-neon-blue/10 rounded-lg border border-neon-blue/30">
                          <div className="flex items-center space-x-2 mb-3">
                            <Rocket className="w-5 h-5 text-neon-blue" />
                            <h5 className="font-rajdhani font-semibold text-neon-blue">
                              Naves
                            </h5>
                          </div>
                          <div className="space-y-1 text-sm">
                            {Object.entries(selectedRace.rewards.ships).map(([ship, count]) => (
                              count > 0 && (
                                <div key={ship} className="flex justify-between">
                                  <span className="text-gray-400">{ship}:</span>
                                  <span className="text-white">{count}</span>
                                </div>
                              )
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Discovery Action */}
                {!selectedRace.discovered && (
                  <div className="border-t border-space-600 pt-4">
                    <Button
                      variant="primary"
                      onClick={() => discoverRace(selectedRace.id)}
                      className="w-full"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Descubrir Raza (Requiere Misión Diplomática)
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <EyeOff className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                <h3 className="text-xl font-rajdhani font-semibold text-white mb-2">
                  Información Clasificada
                </h3>
                <p className="text-gray-400 mb-6">
                  Esta raza aún no ha sido descubierta. Completa misiones de exploración 
                  y diplomacia para obtener más información.
                </p>
                <Button
                  variant="primary"
                  onClick={() => discoverRace(selectedRace.id)}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Iniciar Investigación
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            Guía Galáctica
          </h1>
          <p className="text-gray-400 mt-1">
            Archivo dinámico de civilizaciones alienígenas
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Infinity className="w-5 h-5 text-neon-blue animate-pulse" />
          <span className="text-sm text-neon-blue font-rajdhani font-medium">
            Contenido Procedural Activo
          </span>
        </div>
      </div>

      {/* Dynamic Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-neon-blue/20 rounded-lg">
              <Users className="w-6 h-6 text-neon-blue" />
            </div>
            <div>
              <p className="text-lg font-orbitron font-bold text-white">
                {discoveredRaces.length}
              </p>
              <p className="text-sm text-gray-400">Razas Catalogadas</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-neon-green/20 rounded-lg">
              <Eye className="w-6 h-6 text-neon-green" />
            </div>
            <div>
              <p className="text-lg font-orbitron font-bold text-white">
                {discoveredCount}
              </p>
              <p className="text-sm text-gray-400">Descubiertas</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-neon-orange/20 rounded-lg">
              <EyeOff className="w-6 h-6 text-neon-orange" />
            </div>
            <div>
              <p className="text-lg font-orbitron font-bold text-white">
                {undiscoveredCount}
              </p>
              <p className="text-sm text-gray-400">Sin Descubrir</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-neon-purple/20 rounded-lg">
              <Infinity className="w-6 h-6 text-neon-purple" />
            </div>
            <div>
              <p className="text-lg font-orbitron font-bold text-white">
                ∞
              </p>
              <p className="text-sm text-gray-400">Universo Infinito</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex space-x-1 bg-space-800 p-1 rounded-lg">
          {[
            { key: 'all' as const, name: 'Todas' },
            { key: 'discovered' as const, name: 'Descubiertas' },
            { key: 'undiscovered' as const, name: 'Por Descubrir' },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setRaceFilter(filter.key)}
              className={`px-3 py-1 text-sm font-rajdhani font-medium rounded transition-all duration-200 ${
                raceFilter === filter.key
                  ? 'bg-neon-blue text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        <div className="flex space-x-1 bg-space-800 p-1 rounded-lg">
          {[
            { key: 'all' as const, name: 'Todos los Tipos' },
            { key: 'peaceful' as const, name: 'Pacíficas' },
            { key: 'aggressive' as const, name: 'Agresivas' },
            { key: 'neutral' as const, name: 'Neutrales' },
            { key: 'ancient' as const, name: 'Ancestrales' },
            { key: 'mysterious' as const, name: 'Misteriosas' },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setTypeFilter(filter.key)}
              className={`px-3 py-1 text-sm font-rajdhani font-medium rounded transition-all duration-200 ${
                typeFilter === filter.key
                  ? 'bg-neon-purple text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-400">
          {filteredRaces.length} raza{filteredRaces.length !== 1 ? 's' : ''} • 
          <span className="text-neon-blue ml-1">
            {totalRacesEncountered} encontradas en total
          </span>
        </div>
      </div>

      {/* Races Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRaces.map((race) => (
          <Card
            key={race.id}
            className="cursor-pointer hover:scale-105 transition-all duration-300 hover:border-neon-purple/50"
            onClick={() => setSelectedRace(race)}
          >
            <div className="space-y-4">
              <div className="relative">
                <div className="w-full h-32 rounded-lg overflow-hidden border border-space-600">
                  {race.discovered ? (
                    <img 
                      src={race.image} 
                      alt={race.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-space-700 flex items-center justify-center">
                      <EyeOff className="w-8 h-8 text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="absolute top-2 right-2 flex items-center space-x-1">
                  <Star className={`w-4 h-4 ${getRarityColor(race.rarity)}`} />
                  {race.discovered && race.discoveryDate && (
                    <div className="px-2 py-1 bg-space-900/80 rounded text-xs text-neon-green">
                      <Calendar className="w-3 h-3 inline mr-1" />
                      {Math.floor((Date.now() - race.discoveryDate) / 86400000)}d
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-rajdhani font-semibold text-white">
                    {race.discovered ? race.name : `Raza ${race.id.slice(-4).toUpperCase()}`}
                  </h3>
                  <div className={`px-2 py-1 rounded text-xs border font-rajdhani font-medium ${getRaceTypeColor(race.type)}`}>
                    {race.discovered ? (
                      race.type === 'peaceful' ? 'Pacífica' :
                      race.type === 'neutral' ? 'Neutral' :
                      race.type === 'aggressive' ? 'Agresiva' :
                      race.type === 'ancient' ? 'Ancestral' :
                      'Misteriosa'
                    ) : '???'}
                  </div>
                </div>
                
                <p className="text-sm text-gray-300 mb-3">
                  {race.discovered ? race.description : 'Información clasificada. Completa misiones para descubrir más.'}
                </p>

                {race.discovered ? (
                  <div className="grid grid-cols-5 gap-2">
                    {Object.entries(race.traits).map(([trait, value]) => {
                      const Icon = getTraitIcon(trait);
                      return (
                        <div key={trait} className="text-center">
                          <div className="w-8 h-8 mx-auto mb-1 bg-space-700 rounded-full flex items-center justify-center border border-space-600 relative">
                            <Icon className="w-3 h-3 text-neon-blue" />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-neon-blue/20 rounded-full flex items-center justify-center">
                              <span className="text-xs font-orbitron font-bold text-white">
                                {value}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-400">
                            {trait === 'technology' ? 'Tech' :
                             trait === 'military' ? 'Mil' :
                             trait === 'diplomacy' ? 'Dip' :
                             trait === 'trade' ? 'Com' :
                             'Exp'}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-4 border border-dashed border-space-600 rounded-lg">
                    <div className="text-center">
                      <Search className="w-6 h-6 mx-auto mb-2 text-gray-500" />
                      <p className="text-xs text-gray-500">Datos por descubrir</p>
                    </div>
                  </div>
                )}

                {race.discovered && (
                  <div className="mt-3 pt-3 border-t border-space-600">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Mundo Natal:</span>
                      <span className="text-white font-rajdhani font-medium">
                        {race.homeworld}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Discovery Progress */}
      <Card title="Progreso de Descubrimiento" glowing>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Razas Descubiertas</span>
            <span className="font-orbitron font-bold text-neon-green">
              {discoveredCount} / {discoveredRaces.length}
            </span>
          </div>
          <div className="w-full bg-space-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-neon-green to-neon-blue h-3 rounded-full transition-all duration-500"
              style={{ width: `${(discoveredCount / discoveredRaces.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-400 text-center">
            El universo es infinito. Nuevas razas aparecen constantemente mientras exploras la galaxia.
          </p>
        </div>
      </Card>
    </div>
  );
}