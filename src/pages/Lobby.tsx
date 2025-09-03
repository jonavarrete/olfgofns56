import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLobby } from '../hooks/useLobby';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import AccountSettings from '../components/Lobby/AccountSettings';
import GlobalStats from '../components/Lobby/GlobalStats';
import UniverseNewsFeed from '../components/Lobby/UniverseNewsFeed';
import HallOfFameModal from '../components/HallOfFame/HallOfFameModal';
import { 
  Globe, 
  Users, 
  Zap, 
  Clock, 
  Star, 
  Trophy,
  Rocket,
  LogOut,
  Settings,
  User,
  Play,
  Eye,
  TrendingUp,
  Shield,
  Sword,
  Crown,
  AlertTriangle,
  CheckCircle,
  Loader2,
  RefreshCw,
  Radio
} from 'lucide-react';
import { Universe } from '../types/auth';

export default function Lobby() {
  const { state: authState, logout, updateUser } = useAuth();
  const { state: lobbyState, selectUniverse, joinUniverse, refreshUniverses } = useLobby();
  const navigate = useNavigate();
  const [selectedUniverseId, setSelectedUniverseId] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [showGlobalStats, setShowGlobalStats] = useState(false);
  const [showHallOfFame, setShowHallOfFame] = useState(false);

  // Check authentication status
  useEffect(() => {
    if (!authState.isAuthenticated || !authState.user) {
      navigate('/login', { replace: true });
    }
  }, [authState.isAuthenticated, authState.user, navigate]);
  const selectedUniverse = lobbyState.universes.find(u => u.id === selectedUniverseId);

  const getUniverseStatusColor = (status: Universe['status']) => {
    switch (status) {
      case 'active': return 'text-neon-green';
      case 'new': return 'text-neon-blue';
      case 'ending': return 'text-neon-orange';
      case 'maintenance': return 'text-neon-red';
    }
  };

  const getUniverseStatusText = (status: Universe['status']) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'new': return 'Nuevo';
      case 'ending': return 'Finalizando';
      case 'maintenance': return 'Mantenimiento';
    }
  };

  const getUniverseTypeColor = (type: Universe['type']) => {
    switch (type) {
      case 'standard': return 'text-gray-400';
      case 'speed': return 'text-neon-orange';
      case 'peaceful': return 'text-neon-green';
      case 'hardcore': return 'text-neon-red';
    }
  };

  const getUniverseTypeText = (type: Universe['type']) => {
    switch (type) {
      case 'standard': return 'Estándar';
      case 'speed': return 'Velocidad';
      case 'peaceful': return 'Pacífico';
      case 'hardcore': return 'Hardcore';
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleJoinUniverse = async () => {
    if (!selectedUniverse) return;
    
    try {
      await joinUniverse(selectedUniverse.id);
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error joining universe:', error);
    }
  };

  // Don't render if not authenticated
  if (!authState.isAuthenticated || !authState.user) {
    return null;
  }
  return (
    <div className="min-h-screen bg-space-gradient relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-pulse opacity-40"></div>
        <div className="absolute top-32 right-20 w-1.5 h-1.5 bg-neon-blue rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-40 left-1/3 w-1 h-1 bg-neon-purple rounded-full animate-pulse opacity-50"></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-neon-green rounded-full animate-pulse opacity-30"></div>
        
        {/* Large background planets */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-neon-blue/5 to-neon-purple/5 animate-float opacity-50"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-neon-green/5 to-neon-orange/5 animate-float opacity-30" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-card-gradient border-b border-space-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-neon-blue/20 rounded-lg flex items-center justify-center">
                <Rocket className="w-6 h-6 text-neon-blue" />
              </div>
              <div>
                <h1 className="text-xl font-orbitron font-bold text-white">
                  Galactic Empire
                </h1>
                <p className="text-xs text-gray-400">Lobby de Universos</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={refreshUniverses}
              disabled={lobbyState.loading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${lobbyState.loading ? 'animate-spin' : ''}`} />
              Actualizar
            </Button>

            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 px-3 py-2 bg-space-700/50 rounded-lg hover:bg-space-600/50 transition-colors"
              >
                <div className="w-8 h-8 bg-neon-purple/20 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-neon-purple" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-rajdhani font-medium text-white">
                    {authState.user?.username}
                  </p>
                  <p className="text-xs text-gray-400">{authState.user?.email}</p>
                </div>
              </button>
              
              {showUserMenu && (
                <div>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute top-full right-0 mt-2 w-64 bg-card-gradient border border-space-600 rounded-lg shadow-xl z-[100] backdrop-blur-sm">
                    <div className="p-2">
                      <div className="px-3 py-2 border-b border-space-600 mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-neon-purple/20 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-neon-purple" />
                          </div>
                          <div>
                            <p className="text-sm font-rajdhani font-medium text-white">
                              {authState.user?.username}
                            </p>
                            <p className="text-xs text-gray-400">{authState.user?.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="px-3 py-2">
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="text-center p-2 bg-space-700/30 rounded">
                              <p className="text-gray-400">Cuenta creada</p>
                              <p className="text-white font-rajdhani font-medium">
                                {new Date(authState.user?.createdAt || 0).toLocaleDateString('es-ES', { 
                                  month: 'short', 
                                  year: 'numeric' 
                                })}
                              </p>
                            </div>
                            <div className="text-center p-2 bg-space-700/30 rounded">
                              <p className="text-gray-400">Última conexión</p>
                              <p className="text-white font-rajdhani font-medium">
                                {new Date(authState.user?.lastLogin || 0).toLocaleDateString('es-ES', { 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t border-space-600 pt-2">
                          <div className="px-3 py-1">
                            <p className="text-xs text-gray-400 mb-2">Preferencias</p>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-300">Idioma:</span>
                                <span className="text-xs text-neon-blue font-rajdhani font-medium">
                                  {authState.user?.preferences.language === 'es' ? 'Español' : 
                                   authState.user?.preferences.language === 'en' ? 'English' :
                                   authState.user?.preferences.language === 'fr' ? 'Français' : 'Deutsch'}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-300">Tema:</span>
                                <span className="text-xs text-neon-blue font-rajdhani font-medium capitalize">
                                  {authState.user?.preferences.theme}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-300">Notificaciones:</span>
                                <span className={`text-xs font-rajdhani font-medium ${
                                  authState.user?.preferences.notifications ? 'text-neon-green' : 'text-neon-red'
                                }`}>
                                  {authState.user?.preferences.notifications ? 'Activadas' : 'Desactivadas'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-space-600 pt-2">
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            setShowAccountSettings(true);
                          }}
                          className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-space-600/50 rounded transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Configuración de Cuenta</span>
                        </button>
                        
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            setShowGlobalStats(true);
                          }}
                          className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-space-600/50 rounded transition-colors"
                        >
                          <TrendingUp className="w-4 h-4" />
                          <span>Estadísticas Globales</span>
                        </button>
                        
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            setShowHallOfFame(true);
                          }}
                          className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-space-600/50 rounded transition-colors"
                        >
                          <Trophy className="w-4 h-4" />
                          <span>Salón de la Fama</span>
                        </button>
                      </div>
                      
                      <div className="border-t border-space-600 mt-2 pt-2">
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            logout();
                          }}
                          className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-neon-red hover:bg-neon-red/10 rounded transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Cerrar Sesión</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-0 p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-orbitron font-bold text-white mb-2">
              Selecciona tu Universo
            </h2>
            <p className="text-gray-400 font-rajdhani">
              Cada universo ofrece una experiencia única de conquista galáctica
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Universe List */}
            <div className="lg:col-span-2">
              <Card title="Universos Disponibles" glowing>
                {lobbyState.loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-neon-blue animate-spin" />
                    <span className="ml-3 text-gray-400">Cargando universos...</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {lobbyState.universes.map((universe) => (
                      <div
                        key={universe.id}
                        onClick={() => setSelectedUniverseId(universe.id)}
                        className={`p-3 lg:p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-[1.02] touch-manipulation ${
                          selectedUniverseId === universe.id
                            ? 'bg-neon-blue/10 border-neon-blue/50'
                            : 'bg-space-700/30 border-space-600 hover:border-neon-purple/30'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-orbitron font-bold text-white">
                                {universe.name}
                              </h3>
                              <div className="flex items-center space-x-2 flex-wrap">
                                <span className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${getUniverseStatusColor(universe.status)} bg-current/10`}>
                                  {getUniverseStatusText(universe.status)}
                                </span>
                                <span className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${getUniverseTypeColor(universe.type)} bg-current/10`}>
                                  {getUniverseTypeText(universe.type)}
                                </span>
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-400 mb-3">{universe.description}</p>
                            
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 text-xs">
                              <div className="flex items-center space-x-2">
                                <Users className="w-3 h-3 text-gray-400" />
                                <span className="text-gray-400">
                                  {universe.currentPlayers.toLocaleString()}/{universe.maxPlayers.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Zap className="w-3 h-3 text-neon-orange" />
                                <span className="text-gray-400">Velocidad x{universe.speed}</span>
                              </div>
                              <div className="flex items-center space-x-2 col-span-2 lg:col-span-1">
                                <Clock className="w-3 h-3 text-gray-400" />
                                <span className="text-gray-400">Inicio: {formatDate(universe.startDate)}</span>
                              </div>
                              {universe.playerData?.hasAccount && (
                                <div className="flex items-center space-x-2 col-span-2 lg:col-span-1">
                                  <Trophy className="w-3 h-3 text-neon-blue" />
                                  <span className="text-neon-blue">Rango #{universe.playerData.rank}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {universe.playerData?.hasAccount && (
                            <div className="ml-2 lg:ml-4 flex-shrink-0">
                              <div className="px-3 py-1 bg-neon-green/20 text-neon-green rounded-full text-xs font-rajdhani font-medium">
                                Cuenta Existente
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Features */}
                        <div className="mt-4 pt-3 border-t border-space-600">
                          <div className="flex flex-wrap gap-2">
                            {universe.features.slice(0, 4).map((feature) => (
                              <div
                                key={feature.id}
                                className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${
                                  feature.enabled 
                                    ? 'bg-neon-green/20 text-neon-green' 
                                    : 'bg-gray-500/20 text-gray-400'
                                }`}
                              >
                                {feature.name}
                              </div>
                            ))}
                            {universe.features.length > 4 && (
                              <span className="text-xs text-gray-400">
                                +{universe.features.length - 4} más
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>

            {/* Universe Details */}
            <div className="space-y-4 lg:space-y-6">
              {selectedUniverse ? (
                <div>
                  <Card title="Detalles del Universo" glowing>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-orbitron font-bold text-white mb-2">
                          {selectedUniverse.name}
                        </h3>
                        <p className="text-sm text-gray-400">{selectedUniverse.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-space-700/30 rounded-lg">
                          <Users className="w-6 h-6 text-neon-blue mx-auto mb-2" />
                          <p className="text-lg font-orbitron font-bold text-white">
                            {selectedUniverse.currentPlayers.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-400">Jugadores Activos</p>
                        </div>
                        <div className="text-center p-3 bg-space-700/30 rounded-lg">
                          <Zap className="w-6 h-6 text-neon-orange mx-auto mb-2" />
                          <p className="text-lg font-orbitron font-bold text-white">
                            x{selectedUniverse.speed}
                          </p>
                          <p className="text-xs text-gray-400">Velocidad</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Estado:</span>
                          <span className={`font-rajdhani font-medium ${getUniverseStatusColor(selectedUniverse.status)}`}>
                            {getUniverseStatusText(selectedUniverse.status)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Tipo:</span>
                          <span className={`font-rajdhani font-medium ${getUniverseTypeColor(selectedUniverse.type)}`}>
                            {getUniverseTypeText(selectedUniverse.type)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Inicio:</span>
                          <span className="text-sm text-white font-rajdhani font-medium">
                            {formatDate(selectedUniverse.startDate)}
                          </span>
                        </div>
                        {selectedUniverse.endDate && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Fin:</span>
                            <span className="text-sm text-neon-orange font-rajdhani font-medium">
                              {formatDate(selectedUniverse.endDate)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Player Status */}
                      {selectedUniverse.playerData?.hasAccount && (
                        <div className="p-3 bg-neon-green/10 border border-neon-green/30 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-neon-green" />
                            <span className="text-sm font-rajdhani font-medium text-white">
                              Cuenta Existente
                            </span>
                          </div>
                          <div className="space-y-1 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">Rango:</span>
                              <span className="text-neon-blue font-rajdhani font-medium">
                                #{selectedUniverse.playerData.rank}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">Puntos:</span>
                              <span className="text-white font-rajdhani font-medium">
                                {selectedUniverse.playerData.points?.toLocaleString()}
                              </span>
                            </div>
                            {selectedUniverse.playerData.lastActive && (
                              <div className="flex items-center justify-between">
                                <span className="text-gray-400">Última conexión:</span>
                                <span className="text-gray-300">
                                  {formatDate(selectedUniverse.playerData.lastActive)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Features */}
                      <div>
                        <h4 className="text-sm font-rajdhani font-semibold text-white mb-3">
                          Características
                        </h4>
                        <div className="space-y-2">
                          {selectedUniverse.features.map((feature) => (
                            <div
                              key={feature.id}
                              className={`flex items-center space-x-3 p-2 rounded ${
                                feature.enabled 
                                  ? 'bg-neon-green/10 border border-neon-green/20' 
                                  : 'bg-gray-500/10 border border-gray-500/20'
                              }`}
                            >
                              {feature.enabled ? (
                                <CheckCircle className="w-4 h-4 text-neon-green" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-gray-400" />
                              )}
                              <div className="min-w-0 flex-1">
                                <p className={`text-sm font-rajdhani font-medium ${
                                  feature.enabled ? 'text-white' : 'text-gray-400'
                                }`}>
                                  {feature.name}
                                </p>
                                <p className="text-xs text-gray-500 hidden sm:block">{feature.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Join Button */}
                      <div className="pt-4 border-t border-space-600">
                        <Button
                          variant="primary"
                          onClick={handleJoinUniverse}
                          disabled={selectedUniverse.status === 'maintenance' || selectedUniverse.status === 'ending'}
                          className="w-full py-3 font-rajdhani font-semibold touch-manipulation"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {selectedUniverse.playerData?.hasAccount ? 'Continuar Partida' : 'Unirse al Universo'}
                        </Button>
                        
                        {selectedUniverse.status === 'maintenance' && (
                          <p className="text-xs text-neon-orange text-center mt-2">
                            Universo en mantenimiento
                          </p>
                        )}
                        {selectedUniverse.status === 'ending' && (
                          <p className="text-xs text-neon-red text-center mt-2">
                            Universo finalizando - No se permiten nuevos jugadores
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>

                  {/* Universe News Feed */}
                  <div>
                    <h4 className="text-sm font-rajdhani font-semibold text-white mb-3 flex items-center">
                      <Radio className="w-4 h-4 mr-2 text-neon-red animate-pulse" />
                      Galactic News Network
                    </h4>
                    <UniverseNewsFeed 
                      universeId={selectedUniverse.id} 
                      universeName={selectedUniverse.name} 
                    />
                  </div>

                  {/* Quick Stats */}
                  <Card title="Estadísticas Rápidas">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Crown className="w-4 h-4 text-neon-orange" />
                          <span className="text-sm text-gray-400">Emperador:</span>
                        </div>
                        <span className="text-sm text-white font-rajdhani font-medium">
                          GalacticLord
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Sword className="w-4 h-4 text-neon-red" />
                          <span className="text-sm text-gray-400">Alianza #1:</span>
                        </div>
                        <span className="text-sm text-white font-rajdhani font-medium">
                          Dark Empire
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-neon-green" />
                          <span className="text-sm text-gray-400">Actividad:</span>
                        </div>
                        <span className="text-sm text-neon-green font-rajdhani font-medium">
                          Alta
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              ) : (
                <Card title="Selecciona un Universo">
                  <div className="text-center py-12">
                    <Globe className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 font-rajdhani">
                      Selecciona un universo de la lista para ver sus detalles
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
            </main>
      
      {/* Modals */}
      {showAccountSettings && (
        <AccountSettings onClose={() => setShowAccountSettings(false)} />
      )}
      
      {showGlobalStats && (
        <GlobalStats onClose={() => setShowGlobalStats(false)} />
      )}
      
      {showHallOfFame && (
        <HallOfFameModal
          mode="global"
          onClose={() => setShowHallOfFame(false)}
          onJoinUniverse={(universeId) => {
            setShowHallOfFame(false);
            setSelectedUniverseId(universeId);
          }}
        />
      )}
    </div>
  );
}