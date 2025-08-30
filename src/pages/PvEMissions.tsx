import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { useProceduralContent } from '../hooks/useProceduralContent';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { 
  Target, 
  Award,
  Package,
  Zap,
  Star,
  Clock,
  Map,
  Crown,
  Rocket,
  Eye,
  Globe,
  Sword,
  MessageSquare,
  Search,
  Filter,
  Infinity,
  Users,
  Settings,
  MapPin,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { PvEMission } from '../types/game';

export default function PvEMissions() {
  const { state } = useGame();
  const { availableMissions, startMission: startMissionAction } = useProceduralContent();
  const [selectedMission, setSelectedMission] = useState<PvEMission | null>(null);
  const [missionFilter, setMissionFilter] = useState<'all' | 'available' | 'active' | 'completed' | 'locked'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | PvEMission['type']>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | PvEMission['difficulty']>('all');


  const filteredMissions = availableMissions.filter(mission => {
    const statusMatch = missionFilter === 'all' || mission.status === missionFilter;
    const typeMatch = typeFilter === 'all' || mission.type === typeFilter;
    const difficultyMatch = difficultyFilter === 'all' || mission.difficulty === difficultyFilter;
    return statusMatch && typeMatch && difficultyMatch;
  });

  const activeMissionsCount = availableMissions.filter(m => m.status === 'active').length;
  const completedMissionsCount = availableMissions.filter(m => m.status === 'completed').length;
  const availableMissionsCount = availableMissions.filter(m => m.status === 'available').length;

  const getDifficultyColor = (difficulty: PvEMission['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'text-neon-green bg-neon-green/20 border-neon-green/30';
      case 'medium': return 'text-neon-blue bg-neon-blue/20 border-neon-blue/30';
      case 'hard': return 'text-neon-orange bg-neon-orange/20 border-neon-orange/30';
      case 'extreme': return 'text-neon-red bg-neon-red/20 border-neon-red/30';
      case 'legendary': return 'text-neon-purple bg-neon-purple/20 border-neon-purple/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getMissionStatusColor = (status: PvEMission['status']) => {
    switch (status) {
      case 'available': return 'text-neon-green bg-neon-green/20';
      case 'active': return 'text-neon-orange bg-neon-orange/20';
      case 'completed': return 'text-neon-blue bg-neon-blue/20';
      case 'failed': return 'text-neon-red bg-neon-red/20';
      case 'locked': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getMissionTypeIcon = (type: PvEMission['type']) => {
    switch (type) {
      case 'combat': return Sword;
      case 'exploration': return Globe;
      case 'diplomacy': return MessageSquare;
      case 'trade': return Package;
      case 'rescue': return Target;
      case 'artifact': return Star;
      default: return Target;
    }
  };

  const getMissionSourceIcon = (missionId: string) => {
    if (missionId.includes('system')) return Settings;
    if (missionId.includes('alien')) return Users;
    return MapPin; // neutral
  };

  const getMissionSource = (missionId: string) => {
    if (missionId.includes('system')) return 'Sistema';
    if (missionId.includes('alien')) return 'Raza Alienígena';
    return 'Zona Neutral';
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const canStartMission = (mission: PvEMission) => {
    return mission.status === 'available' && 
      (!mission.requirements.level || state.player.level >= mission.requirements.level);
  };

  if (selectedMission) {
    const canStart = canStartMission(selectedMission);
    const SourceIcon = getMissionSourceIcon(selectedMission.id);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="secondary"
            onClick={() => setSelectedMission(null)}
          >
            ← Volver a Misiones
          </Button>
          <div className="flex items-center space-x-2">
            <div className={`px-3 py-1 rounded-lg border font-rajdhani font-medium ${getDifficultyColor(selectedMission.difficulty)}`}>
              {selectedMission.difficulty === 'easy' ? 'Fácil' :
               selectedMission.difficulty === 'medium' ? 'Medio' :
               selectedMission.difficulty === 'hard' ? 'Difícil' :
               selectedMission.difficulty === 'extreme' ? 'Extremo' :
               'Legendario'}
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 bg-space-700/50 rounded text-xs text-gray-400">
              <SourceIcon className="w-3 h-3" />
              <span>{getMissionSource(selectedMission.id)}</span>
            </div>
          </div>
        </div>

        <Card glowing>
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start space-x-6">
              <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-space-600 flex-shrink-0">
                <img 
                  src={selectedMission.image} 
                  alt={selectedMission.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-orbitron font-bold text-white">
                    {selectedMission.name}
                  </h1>
                  <div className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${getMissionStatusColor(selectedMission.status)}`}>
                    {selectedMission.status === 'available' ? 'Disponible' :
                     selectedMission.status === 'active' ? 'Activa' :
                     selectedMission.status === 'completed' ? 'Completada' :
                     selectedMission.status === 'failed' ? 'Fallida' :
                     'Bloqueada'}
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{selectedMission.description}</p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm text-gray-400">Ubicación:</span>
                    <p className="text-white font-rajdhani font-medium">{selectedMission.location}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-400">Duración:</span>
                    <p className="text-white font-rajdhani font-medium">{formatDuration(selectedMission.duration)}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-400">Enfriamiento:</span>
                    <p className="text-white font-rajdhani font-medium">{selectedMission.cooldown}h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Progress */}
            {selectedMission.status === 'active' && (
              <div className="p-4 bg-neon-orange/10 rounded-lg border border-neon-orange/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-rajdhani font-semibold text-neon-orange">
                    Misión en Progreso
                  </h4>
                  <span className="text-neon-orange font-orbitron font-bold">
                    {selectedMission.progress.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-space-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-neon-orange to-neon-red h-3 rounded-full transition-all duration-500"
                    style={{ width: `${selectedMission.progress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Tiempo estimado restante: {Math.floor((100 - selectedMission.progress) / 10)}m
                </p>
              </div>
            )}

            {/* Requirements */}
            <div>
              <h3 className="text-xl font-rajdhani font-semibold text-white mb-4">
                Requisitos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedMission.requirements.level && (
                  <div className={`p-3 rounded-lg border ${
                    state.player.level >= selectedMission.requirements.level 
                      ? 'bg-neon-green/10 border-neon-green/30' 
                      : 'bg-neon-red/10 border-neon-red/30'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <Crown className={`w-4 h-4 ${
                        state.player.level >= selectedMission.requirements.level ? 'text-neon-green' : 'text-neon-red'
                      }`} />
                      <span className="text-sm text-gray-300">
                        Nivel {selectedMission.requirements.level}
                      </span>
                      <span className={`text-xs ${
                        state.player.level >= selectedMission.requirements.level ? 'text-neon-green' : 'text-neon-red'
                      }`}>
                        ({state.player.level >= selectedMission.requirements.level ? '✓' : '✗'})
                      </span>
                    </div>
                  </div>
                )}

                {selectedMission.requirements.research && Object.keys(selectedMission.requirements.research).length > 0 && (
                  <div className="p-3 bg-neon-purple/10 rounded-lg border border-neon-purple/30">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="w-4 h-4 text-neon-purple" />
                      <span className="text-sm font-rajdhani font-semibold text-white">Investigación</span>
                    </div>
                    <div className="space-y-1">
                      {Object.entries(selectedMission.requirements.research).map(([tech, level]) => (
                        <div key={tech} className="flex justify-between text-xs">
                          <span className="text-gray-400">{tech}:</span>
                          <span className="text-white">Nivel {level}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedMission.requirements.fleet && Object.keys(selectedMission.requirements.fleet).length > 0 && (
                  <div className="p-3 bg-neon-blue/10 rounded-lg border border-neon-blue/30">
                    <div className="flex items-center space-x-2 mb-2">
                      <Rocket className="w-4 h-4 text-neon-blue" />
                      <span className="text-sm font-rajdhani font-semibold text-white">Flota Requerida</span>
                    </div>
                    <div className="space-y-1">
                      {Object.entries(selectedMission.requirements.fleet).map(([ship, count]) => (
                        <div key={ship} className="flex justify-between text-xs">
                          <span className="text-gray-400">{ship}:</span>
                          <span className="text-white">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedMission.requirements.alliance && (
                  <div className="p-3 bg-neon-green/10 rounded-lg border border-neon-green/30">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-neon-green" />
                      <span className="text-sm text-gray-300">Requiere Alianza</span>
                      <span className={`text-xs ${state.player.alliance ? 'text-neon-green' : 'text-neon-red'}`}>
                        ({state.player.alliance ? '✓' : '✗'})
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enemy Fleet (if combat mission) */}
            {selectedMission.enemyFleet && (
              <div>
                <h3 className="text-xl font-rajdhani font-semibold text-white mb-4">
                  Flota Enemiga
                </h3>
                <div className="p-4 bg-neon-red/10 rounded-lg border border-neon-red/30">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {Object.entries(selectedMission.enemyFleet).filter(([_, count]) => count > 0).map(([ship, count]) => (
                      <div key={ship} className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">{ship}:</span>
                        <span className="text-neon-red font-rajdhani font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Rewards */}
            <div>
              <h3 className="text-xl font-rajdhani font-semibold text-white mb-4">
                Recompensas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-3 bg-neon-orange/10 rounded-lg border border-neon-orange/30">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="w-4 h-4 text-neon-orange" />
                    <span className="text-sm font-rajdhani font-semibold text-white">Experiencia</span>
                  </div>
                  <p className="text-lg font-orbitron font-bold text-neon-orange">
                    +{selectedMission.rewards.experience.toLocaleString()}
                  </p>
                </div>

                {selectedMission.rewards.resources && (
                  <div className="p-3 bg-neon-green/10 rounded-lg border border-neon-green/30">
                    <div className="flex items-center space-x-2 mb-2">
                      <Package className="w-4 h-4 text-neon-green" />
                      <span className="text-sm font-rajdhani font-semibold text-white">Recursos</span>
                    </div>
                    <div className="space-y-1 text-xs">
                      {Object.entries(selectedMission.rewards.resources).map(([resource, amount]) => (
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

                {selectedMission.rewards.technology && (
                  <div className="p-3 bg-neon-purple/10 rounded-lg border border-neon-purple/30">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="w-4 h-4 text-neon-purple" />
                      <span className="text-sm font-rajdhani font-semibold text-white">Tecnología</span>
                    </div>
                    <div className="space-y-1">
                      {selectedMission.rewards.technology.map((tech, index) => (
                        <p key={index} className="text-xs text-gray-300">{tech}</p>
                      ))}
                    </div>
                  </div>
                )}

                {selectedMission.rewards.alienRace && (
                  <div className="p-3 bg-neon-blue/10 rounded-lg border border-neon-blue/30">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="w-4 h-4 text-neon-blue" />
                      <span className="text-sm font-rajdhani font-semibold text-white">Descubrimiento</span>
                    </div>
                    <p className="text-xs text-gray-300">Nueva Raza Alienígena</p>
                  </div>
                )}

                {selectedMission.rewards.artifacts && (
                  <div className="p-3 bg-neon-blue/10 rounded-lg border border-neon-blue/30">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-4 h-4 text-neon-blue" />
                      <span className="text-sm font-rajdhani font-semibold text-white">Artefactos</span>
                    </div>
                    <div className="space-y-1">
                      {selectedMission.rewards.artifacts.map((artifact, index) => (
                        <p key={index} className="text-xs text-gray-300">{artifact}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Lore */}
            <div>
              <h4 className="text-lg font-rajdhani font-semibold text-white mb-3">
                Información de la Misión
              </h4>
              <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                <p className="text-gray-300 leading-relaxed">
                  {selectedMission.lore}
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="border-t border-space-600 pt-4">
              <div className="flex space-x-3">
                <Button
                  variant={canStart ? 'success' : 'secondary'}
                  disabled={!canStart || selectedMission.status === 'active'}
                  onClick={() => {
                    if (canStart) {
                      startMissionAction(selectedMission.id);
                      startMissionAction(mission.id);
                    }
                  }}
                  className="flex-1"
                >
                  {selectedMission.status === 'available' ? 'Iniciar Misión' :
                   selectedMission.status === 'active' ? `En Progreso (${selectedMission.progress.toFixed(1)}%)` :
                   selectedMission.status === 'completed' ? 'Completada' :
                   selectedMission.status === 'locked' ? 'Bloqueada' :
                   'No Disponible'}
                </Button>
                {selectedMission.status === 'active' && (
                  <Button
                    variant="danger"
                    onClick={() => {
                      // Cancel mission logic
                      setSelectedMission({ ...selectedMission, status: 'available', progress: 0 });
                    }}
                  >
                    Cancelar
                  </Button>
                )}
              </div>
            </div>
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
            Misiones PvE
          </h1>
          <p className="text-gray-400 mt-1">
            Sistema de misiones procedurales dinámicas
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Infinity className="w-5 h-5 text-neon-blue animate-pulse" />
          <span className="text-sm text-neon-blue font-rajdhani font-medium">
            Contenido Procedural
          </span>
        </div>
      </div>

      {/* Dynamic Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-neon-green/20 rounded-lg">
              <Target className="w-6 h-6 text-neon-green" />
            </div>
            <div>
              <p className="text-lg font-orbitron font-bold text-white">
                {availableMissionsCount}
              </p>
              <p className="text-sm text-gray-400">Disponibles</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-neon-orange/20 rounded-lg">
              <Clock className="w-6 h-6 text-neon-orange" />
            </div>
            <div>
              <p className="text-lg font-orbitron font-bold text-white">
                {activeMissionsCount}
              </p>
              <p className="text-sm text-gray-400">En Progreso</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-neon-blue/20 rounded-lg">
              <Award className="w-6 h-6 text-neon-blue" />
            </div>
            <div>
              <p className="text-lg font-orbitron font-bold text-white">
                {completedMissionsCount}
              </p>
              <p className="text-sm text-gray-400">Completadas</p>
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
              <p className="text-sm text-gray-400">Generación Continua</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex space-x-1 bg-space-800 p-1 rounded-lg">
          {[
            { key: 'all' as const, name: 'Todas' },
            { key: 'available' as const, name: 'Disponibles' },
            { key: 'active' as const, name: 'Activas' },
            { key: 'completed' as const, name: 'Completadas' },
            { key: 'locked' as const, name: 'Bloqueadas' },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setMissionFilter(filter.key)}
              className={`px-3 py-1 text-sm font-rajdhani font-medium rounded transition-all duration-200 ${
                missionFilter === filter.key
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
            { key: 'all' as const, name: 'Todos', icon: Filter },
            { key: 'combat' as const, name: 'Combate', icon: Sword },
            { key: 'exploration' as const, name: 'Exploración', icon: Globe },
            { key: 'diplomacy' as const, name: 'Diplomacia', icon: MessageSquare },
            { key: 'trade' as const, name: 'Comercio', icon: Package },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setTypeFilter(filter.key)}
              className={`flex items-center space-x-1 px-2 py-1 text-sm font-rajdhani font-medium rounded transition-all duration-200 ${
                typeFilter === filter.key
                  ? 'bg-neon-purple text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <filter.icon className="w-3 h-3" />
              <span>{filter.name}</span>
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-400">
          {filteredMissions.length} misión{filteredMissions.length !== 1 ? 'es' : ''} • 
          <span className="text-neon-blue ml-1">
            Nuevas misiones cada 2 minutos
          </span>
        </div>
      </div>

      {/* Missions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMissions.map((mission) => {
          const MissionIcon = getMissionTypeIcon(mission.type);
          const SourceIcon = getMissionSourceIcon(mission.id);
          
          return (
            <Card
              key={mission.id}
              className="cursor-pointer hover:scale-105 transition-all duration-300 hover:border-neon-blue/50"
              onClick={() => setSelectedMission(mission)}
            >
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-space-600 flex-shrink-0">
                    <img 
                      src={mission.image} 
                      alt={mission.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-rajdhani font-semibold text-white truncate">
                        {mission.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <div className={`px-2 py-1 rounded text-xs border font-rajdhani font-medium ${getDifficultyColor(mission.difficulty)}`}>
                          {mission.difficulty === 'easy' ? 'Fácil' :
                           mission.difficulty === 'medium' ? 'Medio' :
                           mission.difficulty === 'hard' ? 'Difícil' :
                           mission.difficulty === 'extreme' ? 'Extremo' :
                           'Legendario'}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                      {mission.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <div className="flex items-center space-x-1">
                          <MissionIcon className="w-3 h-3" />
                          <span>
                            {mission.type === 'combat' ? 'Combate' :
                             mission.type === 'exploration' ? 'Exploración' :
                             mission.type === 'diplomacy' ? 'Diplomacia' :
                             mission.type === 'trade' ? 'Comercio' :
                             mission.type === 'rescue' ? 'Rescate' :
                             'Artefacto'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatDuration(mission.duration)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <SourceIcon className="w-3 h-3" />
                          <span>{getMissionSource(mission.id)}</span>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${getMissionStatusColor(mission.status)}`}>
                        {mission.status === 'available' ? 'Disponible' :
                         mission.status === 'active' ? 'Activa' :
                         mission.status === 'completed' ? 'Completada' :
                         mission.status === 'failed' ? 'Fallida' :
                         'Bloqueada'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress bar for active missions */}
                {mission.status === 'active' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Progreso</span>
                      <span>{mission.progress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-space-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-neon-orange to-neon-red h-2 rounded-full transition-all duration-300"
                        style={{ width: `${mission.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Quick rewards preview */}
                <div className="flex items-center justify-between text-xs border-t border-space-600 pt-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Award className="w-3 h-3 text-neon-orange" />
                      <span className="text-gray-400">+{mission.rewards.experience.toLocaleString()} XP</span>
                    </div>
                    {mission.rewards.resources && (
                      <div className="flex items-center space-x-1">
                        <Package className="w-3 h-3 text-neon-green" />
                        <span className="text-gray-400">Recursos</span>
                      </div>
                    )}
                    {mission.rewards.technology && (
                      <div className="flex items-center space-x-1">
                        <Zap className="w-3 h-3 text-neon-purple" />
                        <span className="text-gray-400">Tech</span>
                      </div>
                    )}
                  </div>
                  <Button
                    variant={mission.status === 'available' ? 'success' : 'secondary'}
                    size="sm"
                    disabled={mission.status !== 'available'}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (canStartMission(mission)) {
                        startMission(mission.id);
                      }
                    }}
                  >
                    {mission.status === 'available' ? 'Iniciar' :
                     mission.status === 'active' ? 'Activa' :
                     mission.status === 'completed' ? 'Completada' :
                     'Bloqueada'}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Generation Info */}
      <Card title="Sistema de Generación Procedural" glowing>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-neon-blue/20 rounded-full flex items-center justify-center">
              <Settings className="w-8 h-8 text-neon-blue" />
            </div>
            <h4 className="font-rajdhani font-semibold text-white mb-2">Misiones del Sistema</h4>
            <p className="text-sm text-gray-400">
              Generadas automáticamente por el sistema de defensa galáctico para mantener el orden.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-neon-green/20 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-neon-green" />
            </div>
            <h4 className="font-rajdhani font-semibold text-white mb-2">Misiones Alienígenas</h4>
            <p className="text-sm text-gray-400">
              Creadas por razas alienígenas que buscan cooperación o tienen problemas específicos.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-neon-purple/20 rounded-full flex items-center justify-center">
              <MapPin className="w-8 h-8 text-neon-purple" />
            </div>
            <h4 className="font-rajdhani font-semibold text-white mb-2">Zonas Neutrales</h4>
            <p className="text-sm text-gray-400">
              Oportunidades que surgen en territorios no reclamados y estaciones independientes.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}