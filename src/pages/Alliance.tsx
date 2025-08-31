import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import AllianceBanner from '../components/Alliance/AllianceBanner';
import BannerCreator from '../components/Alliance/BannerCreator';
import PactCreator from '../components/Alliance/PactCreator';
import { 
  Users, 
  Crown, 
  MessageSquare, 
  UserPlus, 
  Settings, 
  Trophy,
  TrendingUp,
  Shield,
  Target,
  Globe,
  X,
  Check,
  FileText,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Alliance as AllianceType, BannerElement, DiplomaticPact } from '../types/game';

export default function Alliance() {
  const { state, proposePact, signPact, cancelPact } = useGame();
  const { player, alliances } = state;
  const [selectedTab, setSelectedTab] = useState<'overview' | 'members' | 'diplomacy' | 'wars'>('overview');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBannerCreator, setShowBannerCreator] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showPactCreator, setShowPactCreator] = useState(false);
  const [selectedAllianceForPact, setSelectedAllianceForPact] = useState<AllianceType | null>(null);
  const [allianceForm, setAllianceForm] = useState({
    name: '',
    tag: '',
    description: '',
    isPublic: true,
    requiresApproval: true
  });
  const [bannerData, setBannerData] = useState<{ elements: BannerElement[]; background: string } | null>(null);

  const currentAlliance = alliances.find(a => a.name === player.alliance);;//false
  const isInAlliance = !!currentAlliance;

  // Get pacts involving current alliance
  const currentAlliancePacts = state.diplomaticPacts.filter(pact => 
    currentAlliance && (pact.alliance1 === currentAlliance.id || pact.alliance2 === currentAlliance.id)
  );

  const activePacts = currentAlliancePacts.filter(pact => pact.status === 'active');
  const pendingPacts = currentAlliancePacts.filter(pact => pact.status === 'pending_signature' || pact.status === 'proposed');

  const tabs = [
    { key: 'overview' as const, name: 'Resumen', icon: Users },
    { key: 'members' as const, name: 'Miembros', icon: UserPlus },
    { key: 'diplomacy' as const, name: 'Diplomacia', icon: MessageSquare },
    { key: 'wars' as const, name: 'Guerras', icon: Target },
  ];

  // Mock alliance members
  const mockMembers = [
    { username: 'AllianceLeader', role: 'Líder', points: 450000, planets: 8, online: true },
    { username: 'ViceCommander', role: 'Sublíder', points: 380000, planets: 6, online: true },
    { username: 'SpaceCommander', role: 'Miembro', points: 89567, planets: 2, online: true },
    { username: 'StarExplorer', role: 'Miembro', points: 156000, planets: 4, online: false },
    { username: 'GalaxyDefender', role: 'Miembro', points: 203000, planets: 5, online: true },
  ];

  const handleCreateAlliance = () => {
    if (!allianceForm.name.trim() || !allianceForm.tag.trim()) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    if (allianceForm.tag.length > 5) {
      alert('La etiqueta no puede tener más de 5 caracteres');
      return;
    }

    // Check if tag already exists
    const tagExists = alliances.some(alliance => 
      alliance.tag.toLowerCase() === allianceForm.tag.toLowerCase()
    );

    if (tagExists) {
      alert('Esta etiqueta ya está en uso');
      return;
    }

    // Create new alliance (this would normally be handled by the game context)
    console.log('Creating alliance:', {
      ...allianceForm,
      banner: bannerData,
      founder: player.username
    });

    // Reset form and close modal
    setAllianceForm({
      name: '',
      tag: '',
      description: '',
      isPublic: true,
      requiresApproval: true
    });
    setBannerData(null);
    setShowCreateModal(false);
    setShowBannerCreator(false);

    alert('¡Alianza creada exitosamente! (En una implementación real, esto se guardaría en la base de datos)');
  };

  const handleJoinAlliance = (allianceId: string) => {
    const alliance = alliances.find(a => a.id === allianceId);
    if (alliance) {
      console.log('Joining alliance:', alliance.name);
      alert(`Solicitud enviada a ${alliance.name}! (En una implementación real, esto se procesaría)`);
    }
  };

  const handleProposePact = (targetAlliance: AllianceType) => {
    setSelectedAllianceForPact(targetAlliance);
    setShowPactCreator(true);
  };

  const handlePactProposal = (pact: DiplomaticPact) => {
    proposePact(pact);
    setShowPactCreator(false);
    setSelectedAllianceForPact(null);
    alert('¡Pacto propuesto exitosamente! La otra alianza debe firmarlo para que entre en vigor.');
  };

  const handleSignPact = (pactId: string) => {
    if (!currentAlliance) return;
    signPact(pactId, currentAlliance.id);
    alert('¡Pacto firmado exitosamente!');
  };

  const handleCancelPact = (pactId: string) => {
    if (confirm('¿Estás seguro de que quieres cancelar este pacto?')) {
      cancelPact(pactId);
      alert('Pacto cancelado.');
    }
  };

  const getPactStatusColor = (status: DiplomaticPact['status']) => {
    switch (status) {
      case 'active': return 'text-neon-green';
      case 'pending_signature': return 'text-neon-orange';
      case 'proposed': return 'text-neon-blue';
      case 'expired': return 'text-gray-400';
      case 'cancelled': return 'text-neon-red';
      default: return 'text-gray-400';
    }
  };

  const getPactStatusIcon = (status: DiplomaticPact['status']) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'pending_signature': return Clock;
      case 'proposed': return AlertCircle;
      case 'expired': return XCircle;
      case 'cancelled': return XCircle;
      default: return AlertCircle;
    }
  };

  const getOtherAlliance = (pact: DiplomaticPact) => {
    if (!currentAlliance) return null;
    const otherAllianceId = pact.alliance1 === currentAlliance.id ? pact.alliance2 : pact.alliance1;
    return alliances.find(a => a.id === otherAllianceId);
  };

  if (showBannerCreator) {
    return (
      <BannerCreator
        onSave={(data) => {
          setBannerData(data);
          setShowBannerCreator(false);
        }}
        onCancel={() => setShowBannerCreator(false)}
        initialData={bannerData || undefined}
      />
    );
  }

  if (showPactCreator && selectedAllianceForPact) {
    return (
      <PactCreator
        targetAlliance={selectedAllianceForPact}
        onClose={() => {
          setShowPactCreator(false);
          setSelectedAllianceForPact(null);
        }}
        onPropose={handlePactProposal}
      />
    );
  }

  if (!isInAlliance) {
    return (
      <>
        <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-orbitron font-bold text-white">
              Alianzas
            </h1>
            <p className="text-gray-400 mt-1">
              Únete a una alianza o crea la tuya propia
            </p>
          </div>
        </div>

        <Card title="No tienes alianza">
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-500" />
            <h3 className="text-xl font-rajdhani font-semibold text-white mb-2">
              Únete a una Alianza
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Las alianzas te permiten coordinar ataques, compartir recursos y defenderte 
              junto a otros jugadores en el vasto universo.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="primary" onClick={() => setShowSearchModal(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Buscar Alianza
              </Button>
              <Button variant="secondary" onClick={() => setShowCreateModal(true)}>
                <Crown className="w-4 h-4 mr-2" />
                Crear Alianza
              </Button>
            </div>
          </div>
        </Card>

        {/* Available Alliances */}
        <Card title="Alianzas Disponibles">
          <div className="space-y-4">
            {alliances.slice(0, 5).map((alliance) => (
              <div
                key={alliance.id}
                className="flex items-center justify-between p-4 bg-space-700/50 rounded-lg border border-space-600"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-neon-purple/30 to-neon-blue/30 rounded-lg flex items-center justify-center">
                    {alliance.banner ? (
                      <AllianceBanner
                        elements={alliance.banner.elements}
                        background={alliance.banner.background}
                        width={48}
                        height={36}
                        className="rounded"
                      />
                    ) : (
                      <Users className="w-6 h-6 text-neon-purple" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-rajdhani font-semibold text-white">
                        {alliance.name}
                      </h3>
                      <span className="px-2 py-1 bg-neon-blue/20 text-neon-blue rounded text-sm font-rajdhani font-medium">
                        [{alliance.tag}]
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">
                      {alliance.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <span>Rango #{alliance.rank}</span>
                      <span>{alliance.members} miembros</span>
                      <span>{alliance.points.toLocaleString()} puntos</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="secondary" size="sm">
                    Ver Detalles
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => handleJoinAlliance(alliance.id)}>
                    Solicitar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
        </div>

        {/* Create Alliance Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card-gradient border border-space-600 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-space-600">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-orbitron font-bold text-white">
                    Crear Nueva Alianza
                  </h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                      Nombre de la Alianza *
                    </label>
                    <input
                      type="text"
                      value={allianceForm.name}
                      onChange={(e) => setAllianceForm({ ...allianceForm, name: e.target.value })}
                      placeholder="Ej: Imperio Galáctico"
                      className="w-full px-3 py-2 bg-space-700 border border-space-600 rounded text-white text-sm focus:border-neon-blue focus:outline-none"
                      maxLength={30}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                      Etiqueta (TAG) *
                    </label>
                    <input
                      type="text"
                      value={allianceForm.tag}
                      onChange={(e) => setAllianceForm({ ...allianceForm, tag: e.target.value.toUpperCase() })}
                      placeholder="Ej: GALA"
                      className="w-full px-3 py-2 bg-space-700 border border-space-600 rounded text-white text-sm focus:border-neon-blue focus:outline-none"
                      maxLength={5}
                    />
                    <p className="text-xs text-gray-500 mt-1">Máximo 5 caracteres</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={allianceForm.description}
                    onChange={(e) => setAllianceForm({ ...allianceForm, description: e.target.value })}
                    placeholder="Describe los objetivos y valores de tu alianza..."
                    className="w-full px-3 py-2 bg-space-700 border border-space-600 rounded text-white text-sm focus:border-neon-blue focus:outline-none resize-none"
                    rows={3}
                    maxLength={200}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {allianceForm.description.length}/200 caracteres
                  </p>
                </div>

                {/* Banner Preview */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-rajdhani font-medium text-gray-400">
                      Estandarte de la Alianza
                    </label>
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => setShowBannerCreator(true)}
                    >
                      {bannerData ? 'Editar Estandarte' : 'Crear Estandarte'}
                    </Button>
                  </div>
                  
                  {bannerData ? (
                    <div className="flex items-center space-x-4 p-4 bg-space-700/30 rounded-lg border border-space-600">
                      <AllianceBanner
                        elements={bannerData.elements}
                        background={bannerData.background}
                        width={80}
                        height={60}
                        className="rounded"
                      />
                      <div>
                        <p className="text-sm text-white font-rajdhani font-medium">
                          Estandarte personalizado
                        </p>
                        <p className="text-xs text-gray-400">
                          {bannerData.elements.length} elementos
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-space-700/30 rounded-lg border border-space-600 text-center">
                      <Crown className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                      <p className="text-sm text-gray-400">
                        No se ha creado un estandarte
                      </p>
                    </div>
                  )}
                </div>

                {/* Settings */}
                <div className="space-y-4">
                  <h3 className="text-sm font-rajdhani font-medium text-gray-400">
                    Configuración de la Alianza
                  </h3>
                  
                  <div className="flex items-center justify-between p-3 bg-space-700/30 rounded-lg">
                    <div>
                      <p className="text-sm font-rajdhani font-medium text-white">
                        Alianza Pública
                      </p>
                      <p className="text-xs text-gray-400">
                        Visible en la lista de alianzas disponibles
                      </p>
                    </div>
                    <button
                      onClick={() => setAllianceForm({ ...allianceForm, isPublic: !allianceForm.isPublic })}
                      className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                        allianceForm.isPublic ? 'bg-neon-green' : 'bg-space-600'
                      }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                        allianceForm.isPublic ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-space-700/30 rounded-lg">
                    <div>
                      <p className="text-sm font-rajdhani font-medium text-white">
                        Requiere Aprobación
                      </p>
                      <p className="text-xs text-gray-400">
                        Las solicitudes deben ser aprobadas por líderes
                      </p>
                    </div>
                    <button
                      onClick={() => setAllianceForm({ ...allianceForm, requiresApproval: !allianceForm.requiresApproval })}
                      className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                        allianceForm.requiresApproval ? 'bg-neon-blue' : 'bg-space-600'
                      }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                        allianceForm.requiresApproval ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-space-600">
                  <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                    Cancelar
                  </Button>
                  <Button variant="primary" onClick={handleCreateAlliance}>
                    <Crown className="w-4 h-4 mr-2" />
                    Crear Alianza
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Alliance Modal */}
        {showSearchModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card-gradient border border-space-600 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-space-600">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-orbitron font-bold text-white">
                    Buscar Alianza
                  </h2>
                  <button
                    onClick={() => setShowSearchModal(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Buscar por nombre o etiqueta..."
                    className="w-full px-4 py-2 bg-space-700 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                  />
                </div>

                <div className="space-y-4">
                  {alliances.map((alliance) => (
                    <div
                      key={alliance.id}
                      className="flex items-center justify-between p-4 bg-space-700/50 rounded-lg border border-space-600 hover:border-neon-blue/30 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-12 bg-gradient-to-br from-neon-purple/30 to-neon-blue/30 rounded-lg flex items-center justify-center">
                          {alliance.banner ? (
                            <AllianceBanner
                              elements={alliance.banner.elements}
                              background={alliance.banner.background}
                              width={64}
                              height={48}
                              className="rounded"
                            />
                          ) : (
                            <Users className="w-8 h-8 text-neon-purple" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-rajdhani font-semibold text-white">
                              {alliance.name}
                            </h3>
                            <span className="px-2 py-1 bg-neon-blue/20 text-neon-blue rounded text-sm font-rajdhani font-medium">
                              [{alliance.tag}]
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 mb-2">
                            {alliance.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-400">
                            <span>Rango #{alliance.rank}</span>
                            <span>{alliance.members} miembros</span>
                            <span>{alliance.points.toLocaleString()} puntos</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button variant="secondary" size="sm">
                          Ver Detalles
                        </Button>
                        <Button variant="primary" size="sm" onClick={() => handleJoinAlliance(alliance.id)}>
                          <UserPlus className="w-4 h-4 mr-1" />
                          Solicitar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            {currentAlliance?.name}
          </h1>
          <p className="text-gray-400 mt-1">
            [{currentAlliance?.tag}] • Rango #{currentAlliance?.rank}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="secondary">
            <Settings className="w-4 h-4 mr-2" />
            Configuración
          </Button>
          <Button variant="primary">
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat
          </Button>
        </div>
      </div>

      {/* Alliance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-neon-purple/20 rounded-lg">
              <Trophy className="w-6 h-6 text-neon-purple" />
            </div>
            <div>
              <p className="text-lg font-orbitron font-bold text-white">
                #{currentAlliance?.rank}
              </p>
              <p className="text-sm text-gray-400">Ranking</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-neon-blue/20 rounded-lg">
              <Users className="w-6 h-6 text-neon-blue" />
            </div>
            <div>
              <p className="text-lg font-orbitron font-bold text-white">
                {currentAlliance?.members}
              </p>
              <p className="text-sm text-gray-400">Miembros</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-neon-green/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-neon-green" />
            </div>
            <div>
              <p className="text-lg font-orbitron font-bold text-white">
                {currentAlliance?.points.toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">Puntos totales</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-neon-orange/20 rounded-lg">
              <Shield className="w-6 h-6 text-neon-orange" />
            </div>
            <div>
              <p className="text-lg font-orbitron font-bold text-white">
                {Math.floor((currentAlliance?.points || 0) / (currentAlliance?.members || 1)).toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">Promedio</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="relative flex space-x-1 bg-space-800 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={`flex items-center space-x-2 flex-1 px-4 py-2 text-sm font-rajdhani font-medium rounded-md transition-all duration-200 ${
              selectedTab === tab.key
                ? 'bg-neon-purple text-white shadow-[0_0_10px_rgba(139,92,246,0.3)]'
                : 'text-gray-400 hover:text-white hover:bg-space-600'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {selectedTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Información de la Alianza" glowing>
            <div className="flex items-center space-x-4 mb-4">
              {currentAlliance?.banner && (
                <AllianceBanner
                  elements={currentAlliance.banner.elements}
                  background={currentAlliance.banner.background}
                  width={80}
                  height={60}
                  className="rounded-lg"
                />
              )}
              <div>
                <h3 className="text-xl font-orbitron font-bold text-white">
                  {currentAlliance?.name}
                </h3>
                <p className="text-neon-blue font-rajdhani font-medium">
                  [{currentAlliance?.tag}]
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-rajdhani font-medium text-gray-400 mb-1">
                  Descripción
                </h4>
                <p className="text-gray-300">
                  {currentAlliance?.description}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-rajdhani font-medium text-gray-400 mb-1">
                    Fundada
                  </h4>
                  <p className="text-white">
                    {currentAlliance?.foundedDate ? 
                      `Hace ${Math.floor((Date.now() - currentAlliance.foundedDate) / (1000 * 60 * 60 * 24))} días` : 
                      'Hace 156 días'
                    }
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-rajdhani font-medium text-gray-400 mb-1">
                    Líder
                  </h4>
                  <p className="text-white">{currentAlliance?.leader || 'AllianceLeader'}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Últimas Actividades">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-2 bg-space-700/30 rounded-lg">
                <Target className="w-4 h-4 text-neon-red" />
                <div>
                  <p className="text-sm text-white">Ataque coordinado exitoso</p>
                  <p className="text-xs text-gray-400">Hace 2 horas</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-space-700/30 rounded-lg">
                <UserPlus className="w-4 h-4 text-neon-green" />
                <div>
                  <p className="text-sm text-white">Nuevo miembro: StarExplorer</p>
                  <p className="text-xs text-gray-400">Hace 1 día</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-space-700/30 rounded-lg">
                <Shield className="w-4 h-4 text-neon-blue" />
                <div>
                  <p className="text-sm text-white">Defensa exitosa del sector 7</p>
                  <p className="text-xs text-gray-400">Hace 3 días</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {selectedTab === 'members' && (
        <Card title="Miembros de la Alianza" glowing>
          <div className="space-y-1">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 text-sm font-rajdhani font-medium text-gray-400 border-b border-space-600 pb-3">
              <div className="col-span-4">Jugador</div>
              <div className="col-span-2">Rol</div>
              <div className="col-span-2">Puntos</div>
              <div className="col-span-2">Planetas</div>
              <div className="col-span-2">Estado</div>
            </div>

            {/* Members */}
            {mockMembers.map((member, index) => (
              <div
                key={member.username}
                className={`grid grid-cols-12 gap-4 py-3 rounded-lg transition-all duration-200 hover:bg-space-700/30 ${
                  member.username === player.username ? 'bg-neon-blue/10 border border-neon-blue/30' : ''
                }`}
              >
                <div className="col-span-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      member.role === 'Líder' ? 'bg-yellow-500/20' :
                      member.role === 'Sublíder' ? 'bg-neon-blue/20' :
                      'bg-neon-purple/20'
                    }`}>
                      {member.role === 'Líder' ? (
                        <Crown className="w-5 h-5 text-yellow-400" />
                      ) : (
                        <span className="text-sm font-orbitron font-bold text-white">
                          {member.username.substring(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className={`font-rajdhani font-semibold ${
                        member.username === player.username ? 'text-neon-blue' : 'text-white'
                      }`}>
                        {member.username}
                      </p>
                      <p className="text-xs text-gray-400">
                        Miembro #{index + 1}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-span-2">
                  <span className={`px-2 py-1 rounded text-sm font-rajdhani font-medium ${
                    member.role === 'Líder' ? 'bg-yellow-500/20 text-yellow-400' :
                    member.role === 'Sublíder' ? 'bg-neon-blue/20 text-neon-blue' :
                    'bg-neon-purple/20 text-neon-purple'
                  }`}>
                    {member.role}
                  </span>
                </div>

                <div className="col-span-2">
                  <p className="text-sm font-orbitron font-bold text-white">
                    {member.points.toLocaleString()}
                  </p>
                </div>

                <div className="col-span-2">
                  <p className="text-sm font-rajdhani font-medium text-gray-300">
                    {member.planets}
                  </p>
                </div>

                <div className="col-span-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      member.online ? 'bg-neon-green' : 'bg-gray-500'
                    }`} />
                    <span className="text-xs text-gray-400">
                      {member.online ? 'En línea' : 'Desconectado'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {selectedTab === 'diplomacy' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Relaciones Diplomáticas">
            <div className="space-y-4 mb-4">
              <div className="flex items-center justify-between">
                <h4 className="font-rajdhani font-semibold text-white">Otras Alianzas</h4>
                <Button variant="primary" size="sm">
                  <FileText className="w-4 h-4 mr-1" />
                  Nuevo Pacto
                </Button>
              </div>
              
              {alliances
                .filter(alliance => alliance.id !== currentAlliance?.id)
                .slice(0, 4)
                .map((alliance) => {
                  const existingPact = activePacts.find(pact => 
                    pact.alliance1 === alliance.id || pact.alliance2 === alliance.id
                  );
                  
                  return (
                    <div key={alliance.id} className="flex items-center justify-between p-3 bg-space-700/30 border border-space-600 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-neon-purple/30 to-neon-blue/30 rounded flex items-center justify-center">
                          {alliance.banner ? (
                            <AllianceBanner
                              elements={alliance.banner.elements}
                              background={alliance.banner.background}
                              width={32}
                              height={24}
                              className="rounded"
                            />
                          ) : (
                            <Users className="w-4 h-4 text-neon-purple" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-rajdhani font-semibold text-white">
                            {alliance.name}
                          </p>
                          <p className="text-xs text-gray-400">[{alliance.tag}]</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {existingPact ? (
                          <div className="flex items-center space-x-2">
                            <div className="flex flex-wrap gap-1">
                              {existingPact.types.slice(0, 2).map(type => (
                                <span
                                  key={type}
                                  className="px-2 py-1 bg-neon-green/20 text-neon-green rounded text-xs font-rajdhani"
                                >
                                  {type === 'non_aggression' ? 'No Agresión' :
                                   type === 'trade_agreement' ? 'Comercial' :
                                   type === 'military_alliance' ? 'Militar' :
                                   type === 'research_cooperation' ? 'Investigación' :
                                   type === 'mutual_defense' ? 'Defensa' :
                                   'Recursos'}
                                </span>
                              ))}
                              {existingPact.types.length > 2 && (
                                <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs font-rajdhani">
                                  +{existingPact.types.length - 2}
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <Button 
                            variant="secondary" 
                            size="sm"
                            onClick={() => handleProposePact(alliance)}
                          >
                            Proponer Pacto
                          </Button>
                        )}
                      </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card title="Pactos y Tratados">
            <div className="space-y-4">
              {/* Active Pacts */}
              {activePacts.length > 0 && (
                <div>
                  <h4 className="font-rajdhani font-semibold text-white mb-3">Pactos Activos</h4>
                  <div className="space-y-3">
                    {activePacts.map((pact) => {
                      const otherAlliance = getOtherAlliance(pact);
                      const StatusIcon = getPactStatusIcon(pact.status);
                      const daysRemaining = pact.expirationDate ? 
                        Math.ceil((pact.expirationDate - Date.now()) / (1000 * 60 * 60 * 24)) : null;

                      return (
                        <div key={pact.id} className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <StatusIcon className={`w-4 h-4 ${getPactStatusColor(pact.status)}`} />
                                <h5 className="font-rajdhani font-semibold text-white">
                                  {pact.name}
                                </h5>
                              </div>
                              <p className="text-sm text-gray-400">
                                Con {otherAlliance?.name} [{otherAlliance?.tag}]
                              </p>
                              {daysRemaining && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Vigente por {daysRemaining} días más
                                </p>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="secondary" size="sm">
                                Ver Detalles
                              </Button>
                              <Button 
                                variant="danger" 
                                size="sm"
                                onClick={() => handleCancelPact(pact.id)}
                              >
                                Cancelar
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {pact.types.map(type => (
                              <span
                                key={type}
                                className="px-2 py-1 bg-neon-green/20 text-neon-green rounded text-xs font-rajdhani font-medium"
                              >
                                {type === 'non_aggression' ? 'No Agresión' :
                                 type === 'trade_agreement' ? 'Comercial' :
                                 type === 'military_alliance' ? 'Militar' :
                                 type === 'research_cooperation' ? 'Investigación' :
                                 type === 'mutual_defense' ? 'Defensa Mutua' :
                                 'Intercambio de Recursos'}
                              </span>
                            ))}
                          </div>

                          <p className="text-sm text-gray-300">
                            {pact.terms.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Pending Pacts */}
              {pendingPacts.length > 0 && (
                <div>
                  <h4 className="font-rajdhani font-semibold text-white mb-3">Pactos Pendientes</h4>
                  <div className="space-y-3">
                    {pendingPacts.map((pact) => {
                      const otherAlliance = getOtherAlliance(pact);
                      const StatusIcon = getPactStatusIcon(pact.status);
                      const needsSignature = currentAlliance && 
                        ((pact.alliance1 === currentAlliance.id && !pact.signatures.alliance1) ||
                         (pact.alliance2 === currentAlliance.id && !pact.signatures.alliance2));

                      return (
                        <div key={pact.id} className="p-4 bg-neon-orange/10 border border-neon-orange/30 rounded-lg">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <StatusIcon className={`w-4 h-4 ${getPactStatusColor(pact.status)}`} />
                                <h5 className="font-rajdhani font-semibold text-white">
                                  {pact.name}
                                </h5>
                              </div>
                              <p className="text-sm text-gray-400">
                                {pact.proposedBy === currentAlliance?.id ? 'Propuesto por ti' : `Propuesto por ${otherAlliance?.name}`}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Hace {Math.floor((Date.now() - pact.proposedDate) / (1000 * 60 * 60 * 24))} días
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              {needsSignature && (
                                <Button 
                                  variant="primary" 
                                  size="sm"
                                  onClick={() => handleSignPact(pact.id)}
                                >
                                  <Check className="w-4 h-4 mr-1" />
                                  Firmar
                                </Button>
                              )}
                              <Button variant="secondary" size="sm">
                                Ver Detalles
                              </Button>
                              <Button 
                                variant="danger" 
                                size="sm"
                                onClick={() => handleCancelPact(pact.id)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {pact.types.map(type => (
                              <span
                                key={type}
                                className="px-2 py-1 bg-neon-orange/20 text-neon-orange rounded text-xs font-rajdhani font-medium"
                              >
                                {type === 'non_aggression' ? 'No Agresión' :
                                 type === 'trade_agreement' ? 'Comercial' :
                                 type === 'military_alliance' ? 'Militar' :
                                 type === 'research_cooperation' ? 'Investigación' :
                                 type === 'mutual_defense' ? 'Defensa Mutua' :
                                 'Intercambio de Recursos'}
                              </span>
                            ))}
                          </div>

                          <p className="text-sm text-gray-300">
                            {pact.terms.description}
                          </p>

                          {/* Signature Status */}
                          <div className="mt-3 pt-3 border-t border-space-600">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                  {pact.signatures.alliance1 ? (
                                    <CheckCircle className="w-3 h-3 text-neon-green" />
                                  ) : (
                                    <Clock className="w-3 h-3 text-neon-orange" />
                                  )}
                                  <span className="text-gray-400">
                                    {alliances.find(a => a.id === pact.alliance1)?.tag}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  {pact.signatures.alliance2 ? (
                                    <CheckCircle className="w-3 h-3 text-neon-green" />
                                  ) : (
                                    <Clock className="w-3 h-3 text-neon-orange" />
                                  )}
                                  <span className="text-gray-400">
                                    {alliances.find(a => a.id === pact.alliance2)?.tag}
                                  </span>
                                </div>
                              </div>
                              <span className="text-gray-400">
                                Duración: {pact.duration} días
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activePacts.length === 0 && pendingPacts.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No hay pactos diplomáticos</p>
                  <p className="text-sm mt-1">Propón pactos con otras alianzas para obtener beneficios mutuos</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {selectedTab === 'wars' && (
        <Card title="Conflictos Activos" glowing>
          <div className="space-y-4">
            <div className="p-4 bg-neon-red/10 border border-neon-red/30 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Target className="w-6 h-6 text-neon-red" />
                  <div>
                    <h3 className="text-lg font-rajdhani font-semibold text-white">
                      Guerra contra Dark Empire
                    </h3>
                    <p className="text-sm text-gray-400">
                      Iniciada hace 5 días • 23 batallas
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-neon-red/20 text-neon-red rounded font-rajdhani font-medium">
                  ACTIVA
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-orbitron font-bold text-neon-green">14</p>
                  <p className="text-xs text-gray-400">Victorias</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-orbitron font-bold text-neon-red">9</p>
                  <p className="text-xs text-gray-400">Derrotas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-orbitron font-bold text-neon-orange">3</p>
                  <p className="text-xs text-gray-400">Batallas activas</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="danger" size="sm">
                  <Target className="w-4 h-4 mr-2" />
                  Coordinar Ataque
                </Button>
                <Button variant="secondary" size="sm">
                  Ver Historial
                </Button>
              </div>
            </div>

            <div className="text-center py-8 text-gray-400">
              <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No hay otros conflictos activos</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}