import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { 
  X, 
  Shield, 
  Handshake, 
  Sword, 
  FlaskConical, 
  Package, 
  Users,
  AlertTriangle,
  Clock,
  FileText,
  Plus,
  Minus
} from 'lucide-react';
import { DiplomaticPact, PactType, Alliance } from '../../types/game';

interface PactCreatorProps {
  targetAlliance: Alliance;
  onClose: () => void;
  onPropose: (pact: DiplomaticPact) => void;
}

const pactTypeConfig = {
  non_aggression: {
    name: 'Pacto de No Agresión',
    icon: Shield,
    color: 'neon-blue',
    description: 'Prohibición mutua de ataques directos',
    incompatible: ['military_alliance'],
    benefits: 'Protección contra ataques, zonas seguras'
  },
  trade_agreement: {
    name: 'Acuerdo Comercial',
    icon: Package,
    color: 'neon-green',
    description: 'Intercambio preferencial de recursos',
    incompatible: [],
    benefits: 'Descuentos comerciales, rutas protegidas'
  },
  military_alliance: {
    name: 'Alianza Militar',
    icon: Sword,
    color: 'neon-red',
    description: 'Cooperación militar y ataques coordinados',
    incompatible: ['non_aggression'],
    benefits: 'Ataques conjuntos, compartir flotas'
  },
  research_cooperation: {
    name: 'Cooperación Científica',
    icon: FlaskConical,
    color: 'neon-purple',
    description: 'Intercambio de conocimientos y tecnologías',
    incompatible: [],
    benefits: 'Bonus de investigación, tecnologías compartidas'
  },
  mutual_defense: {
    name: 'Defensa Mutua',
    icon: Users,
    color: 'neon-orange',
    description: 'Asistencia automática en caso de ataque',
    incompatible: [],
    benefits: 'Protección automática, respuesta rápida'
  },
  resource_sharing: {
    name: 'Intercambio de Recursos',
    icon: Handshake,
    color: 'neon-blue',
    description: 'Compartir recursos automáticamente',
    incompatible: [],
    benefits: 'Recursos automáticos, estabilidad económica'
  }
};

export default function PactCreator({ targetAlliance, onClose, onPropose }: PactCreatorProps) {
  const { state } = useGame();
  const { player, alliances } = state;
  
  const currentAlliance = alliances.find(a => a.name === player.alliance);
  
  const [selectedTypes, setSelectedTypes] = useState<PactType[]>([]);
  const [pactName, setPactName] = useState('');
  const [duration, setDuration] = useState(90);
  const [terms, setTerms] = useState({
    description: '',
    conditions: [''],
    penalties: [''],
    renewalOptions: 'manual' as const
  });
  const [benefits, setBenefits] = useState({
    tradeDiscount: 0,
    researchBonus: 0,
    resourceSharing: { metal: 0, crystal: 0, deuterium: 0 },
    militarySupport: {
      fleetSharing: false,
      coordinatedAttacks: false,
      defenseAssistance: false
    },
    diplomaticImmunity: false
  });

  const togglePactType = (type: PactType) => {
    const config = pactTypeConfig[type];
    
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
      return;
    }

    // Check for incompatible types
    const hasIncompatible = selectedTypes.some(selectedType => 
      config.incompatible.includes(selectedType) || 
      pactTypeConfig[selectedType].incompatible.includes(type)
    );

    if (hasIncompatible) {
      alert('Este tipo de pacto es incompatible con los tipos ya seleccionados');
      return;
    }

    setSelectedTypes([...selectedTypes, type]);
  };

  const addCondition = () => {
    setTerms({
      ...terms,
      conditions: [...terms.conditions, '']
    });
  };

  const updateCondition = (index: number, value: string) => {
    const newConditions = [...terms.conditions];
    newConditions[index] = value;
    setTerms({ ...terms, conditions: newConditions });
  };

  const removeCondition = (index: number) => {
    if (terms.conditions.length > 1) {
      setTerms({
        ...terms,
        conditions: terms.conditions.filter((_, i) => i !== index)
      });
    }
  };

  const addPenalty = () => {
    setTerms({
      ...terms,
      penalties: [...terms.penalties, '']
    });
  };

  const updatePenalty = (index: number, value: string) => {
    const newPenalties = [...terms.penalties];
    newPenalties[index] = value;
    setTerms({ ...terms, penalties: newPenalties });
  };

  const removePenalty = (index: number) => {
    if (terms.penalties.length > 1) {
      setTerms({
        ...terms,
        penalties: terms.penalties.filter((_, i) => i !== index)
      });
    }
  };

  const handlePropose = () => {
    if (!currentAlliance) {
      alert('Debes estar en una alianza para proponer pactos');
      return;
    }

    if (selectedTypes.length === 0) {
      alert('Debes seleccionar al menos un tipo de pacto');
      return;
    }

    if (!pactName.trim()) {
      alert('Debes especificar un nombre para el pacto');
      return;
    }

    if (!terms.description.trim()) {
      alert('Debes proporcionar una descripción del pacto');
      return;
    }

    const validConditions = terms.conditions.filter(c => c.trim());
    const validPenalties = terms.penalties.filter(p => p.trim());

    if (validConditions.length === 0) {
      alert('Debes especificar al menos una condición');
      return;
    }

    const newPact: DiplomaticPact = {
      id: Date.now().toString(),
      name: pactName,
      alliance1: currentAlliance.id,
      alliance2: targetAlliance.id,
      types: selectedTypes,
      status: 'proposed',
      proposedBy: currentAlliance.id,
      proposedDate: Date.now(),
      duration,
      terms: {
        ...terms,
        conditions: validConditions,
        penalties: validPenalties
      },
      signatures: {
        alliance1: true, // Auto-sign by proposer
        alliance2: false
      },
      benefits,
      restrictions: {
        exclusivityClauses: []
      }
    };

    onPropose(newPact);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-6 border-b border-space-600">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-orbitron font-bold text-white">
                Proponer Pacto Diplomático
              </h2>
              <p className="text-gray-400 mt-1">
                Con {targetAlliance.name} [{targetAlliance.tag}]
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Nombre del Pacto *
              </label>
              <input
                type="text"
                value={pactName}
                onChange={(e) => setPactName(e.target.value)}
                placeholder="Ej: Alianza de Cooperación Galáctica"
                className="w-full px-3 py-2 bg-space-700 border border-space-600 rounded text-white text-sm focus:border-neon-blue focus:outline-none"
                maxLength={50}
              />
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Duración (días) *
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 30)}
                min="7"
                max="365"
                className="w-full px-3 py-2 bg-space-700 border border-space-600 rounded text-white text-sm focus:border-neon-blue focus:outline-none"
              />
            </div>
          </div>

          {/* Pact Types */}
          <div>
            <h3 className="text-lg font-rajdhani font-semibold text-white mb-4">
              Tipos de Pacto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(pactTypeConfig).map(([type, config]) => {
                const isSelected = selectedTypes.includes(type as PactType);
                const isIncompatible = selectedTypes.some(selectedType => 
                  config.incompatible.includes(selectedType) || 
                  pactTypeConfig[selectedType].incompatible.includes(type as PactType)
                );

                return (
                  <button
                    key={type}
                    onClick={() => togglePactType(type as PactType)}
                    disabled={isIncompatible && !isSelected}
                    className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                      isSelected
                        ? `bg-${config.color}/20 border-${config.color}/50 text-${config.color}`
                        : isIncompatible
                        ? 'bg-space-700/30 border-space-600 text-gray-500 cursor-not-allowed opacity-50'
                        : 'bg-space-700/50 border-space-600 text-gray-300 hover:border-neon-blue/30 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <config.icon className="w-5 h-5" />
                      <h4 className="font-rajdhani font-semibold">
                        {config.name}
                      </h4>
                    </div>
                    <p className="text-xs opacity-80">
                      {config.description}
                    </p>
                    <p className="text-xs mt-1 opacity-60">
                      {config.benefits}
                    </p>
                  </button>
                );
              })}
            </div>
            
            {selectedTypes.length > 0 && (
              <div className="mt-4 p-3 bg-neon-blue/10 border border-neon-blue/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <FileText className="w-4 h-4 text-neon-blue" />
                  <span className="text-sm font-rajdhani font-medium text-white">
                    Tipos seleccionados:
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTypes.map(type => (
                    <span
                      key={type}
                      className={`px-2 py-1 bg-${pactTypeConfig[type].color}/20 text-${pactTypeConfig[type].color} rounded text-xs font-rajdhani font-medium`}
                    >
                      {pactTypeConfig[type].name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Terms and Conditions */}
          <div>
            <h3 className="text-lg font-rajdhani font-semibold text-white mb-4">
              Términos y Condiciones
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                  Descripción General *
                </label>
                <textarea
                  value={terms.description}
                  onChange={(e) => setTerms({ ...terms, description: e.target.value })}
                  placeholder="Describe el propósito y alcance general del pacto..."
                  className="w-full px-3 py-2 bg-space-700 border border-space-600 rounded text-white text-sm focus:border-neon-blue focus:outline-none resize-none"
                  rows={3}
                  maxLength={300}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {terms.description.length}/300 caracteres
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-rajdhani font-medium text-gray-400">
                    Condiciones del Pacto *
                  </label>
                  <Button variant="secondary" size="sm" onClick={addCondition}>
                    <Plus className="w-3 h-3 mr-1" />
                    Agregar
                  </Button>
                </div>
                <div className="space-y-2">
                  {terms.conditions.map((condition, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={condition}
                        onChange={(e) => updateCondition(index, e.target.value)}
                        placeholder={`Condición ${index + 1}...`}
                        className="flex-1 px-3 py-2 bg-space-700 border border-space-600 rounded text-white text-sm focus:border-neon-blue focus:outline-none"
                        maxLength={100}
                      />
                      {terms.conditions.length > 1 && (
                        <button
                          onClick={() => removeCondition(index)}
                          className="p-2 text-gray-400 hover:text-neon-red transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-rajdhani font-medium text-gray-400">
                    Penalizaciones por Incumplimiento
                  </label>
                  <Button variant="secondary" size="sm" onClick={addPenalty}>
                    <Plus className="w-3 h-3 mr-1" />
                    Agregar
                  </Button>
                </div>
                <div className="space-y-2">
                  {terms.penalties.map((penalty, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={penalty}
                        onChange={(e) => updatePenalty(index, e.target.value)}
                        placeholder={`Penalización ${index + 1}...`}
                        className="flex-1 px-3 py-2 bg-space-700 border border-space-600 rounded text-white text-sm focus:border-neon-blue focus:outline-none"
                        maxLength={100}
                      />
                      {terms.penalties.length > 1 && (
                        <button
                          onClick={() => removePenalty(index)}
                          className="p-2 text-gray-400 hover:text-neon-red transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Configuration */}
          {selectedTypes.length > 0 && (
            <div>
              <h3 className="text-lg font-rajdhani font-semibold text-white mb-4">
                Beneficios del Pacto
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedTypes.includes('trade_agreement') && (
                  <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <h4 className="font-rajdhani font-semibold text-white mb-3">
                      Beneficios Comerciales
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-400 block mb-1">
                          Descuento Comercial (%)
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="50"
                          value={benefits.tradeDiscount}
                          onChange={(e) => setBenefits({ ...benefits, tradeDiscount: parseInt(e.target.value) })}
                          className="w-full"
                        />
                        <span className="text-xs text-gray-400">{benefits.tradeDiscount}%</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTypes.includes('research_cooperation') && (
                  <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <h4 className="font-rajdhani font-semibold text-white mb-3">
                      Cooperación Científica
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-400 block mb-1">
                          Bonus de Investigación (%)
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="25"
                          value={benefits.researchBonus}
                          onChange={(e) => setBenefits({ ...benefits, researchBonus: parseInt(e.target.value) })}
                          className="w-full"
                        />
                        <span className="text-xs text-gray-400">{benefits.researchBonus}%</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTypes.includes('military_alliance') && (
                  <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <h4 className="font-rajdhani font-semibold text-white mb-3">
                      Cooperación Militar
                    </h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={benefits.militarySupport.fleetSharing}
                          onChange={(e) => setBenefits({
                            ...benefits,
                            militarySupport: {
                              ...benefits.militarySupport,
                              fleetSharing: e.target.checked
                            }
                          })}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-300">Compartir flotas</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={benefits.militarySupport.coordinatedAttacks}
                          onChange={(e) => setBenefits({
                            ...benefits,
                            militarySupport: {
                              ...benefits.militarySupport,
                              coordinatedAttacks: e.target.checked
                            }
                          })}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-300">Ataques coordinados</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={benefits.militarySupport.defenseAssistance}
                          onChange={(e) => setBenefits({
                            ...benefits,
                            militarySupport: {
                              ...benefits.militarySupport,
                              defenseAssistance: e.target.checked
                            }
                          })}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-300">Asistencia defensiva</span>
                      </label>
                    </div>
                  </div>
                )}

                {selectedTypes.includes('resource_sharing') && (
                  <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
                    <h4 className="font-rajdhani font-semibold text-white mb-3">
                      Intercambio de Recursos (por semana)
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-400 block mb-1">Metal</label>
                        <input
                          type="number"
                          value={benefits.resourceSharing.metal}
                          onChange={(e) => setBenefits({
                            ...benefits,
                            resourceSharing: {
                              ...benefits.resourceSharing,
                              metal: parseInt(e.target.value) || 0
                            }
                          })}
                          className="w-full px-3 py-2 bg-space-700 border border-space-600 rounded text-white text-sm focus:border-neon-blue focus:outline-none"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 block mb-1">Cristal</label>
                        <input
                          type="number"
                          value={benefits.resourceSharing.crystal}
                          onChange={(e) => setBenefits({
                            ...benefits,
                            resourceSharing: {
                              ...benefits.resourceSharing,
                              crystal: parseInt(e.target.value) || 0
                            }
                          })}
                          className="w-full px-3 py-2 bg-space-700 border border-space-600 rounded text-white text-sm focus:border-neon-blue focus:outline-none"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 block mb-1">Deuterio</label>
                        <input
                          type="number"
                          value={benefits.resourceSharing.deuterium}
                          onChange={(e) => setBenefits({
                            ...benefits,
                            resourceSharing: {
                              ...benefits.resourceSharing,
                              deuterium: parseInt(e.target.value) || 0
                            }
                          })}
                          className="w-full px-3 py-2 bg-space-700 border border-space-600 rounded text-white text-sm focus:border-neon-blue focus:outline-none"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Warning about incompatible types */}
          {selectedTypes.length > 0 && (
            <div className="p-4 bg-neon-orange/10 border border-neon-orange/30 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-neon-orange mt-0.5" />
                <div>
                  <h4 className="font-rajdhani font-semibold text-white mb-1">
                    Información Importante
                  </h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Los pactos militares son incompatibles con pactos de no agresión</li>
                    <li>• Ambas alianzas deben firmar el pacto para que entre en vigor</li>
                    <li>• Los pactos pueden ser cancelados por cualquiera de las partes</li>
                    <li>• Las violaciones pueden resultar en penalizaciones automáticas</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4 border-t border-space-600">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handlePropose}>
              <FileText className="w-4 h-4 mr-2" />
              Proponer Pacto
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}