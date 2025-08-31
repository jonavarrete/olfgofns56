import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { 
  X, 
  TrendingUp, 
  ArrowUpDown, 
  Calculator,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users
} from 'lucide-react';
import { TradeOffer } from '../../types/trade';

interface CreateTradeOfferProps {
  onClose: () => void;
  onSubmit: (offer: Omit<TradeOffer, 'id' | 'created' | 'status'>) => void;
}

export default function CreateTradeOffer({ onClose, onSubmit }: CreateTradeOfferProps) {
  const { state } = useGame();
  const { player, selectedPlanet } = state;
  
  const [offerType, setOfferType] = useState<'sell' | 'buy'>('sell');
  const [offering, setOffering] = useState({ metal: 0, crystal: 0, deuterium: 0 });
  const [requesting, setRequesting] = useState({ metal: 0, crystal: 0, deuterium: 0 });
  const [duration, setDuration] = useState(24); // hours
  const [minRank, setMinRank] = useState<number | undefined>();
  const [maxRank, setMaxRank] = useState<number | undefined>();
  const [allianceOnly, setAllianceOnly] = useState(false);

  const calculateRatio = () => {
    const offeringTotal = offering.metal + offering.crystal * 2 + offering.deuterium * 3;
    const requestingTotal = requesting.metal + requesting.crystal * 2 + requesting.deuterium * 3;
    
    if (offeringTotal === 0 || requestingTotal === 0) return 0;
    return requestingTotal / offeringTotal;
  };

  const canAfford = () => {
    if (offerType === 'buy') return true; // For buy offers, we're requesting resources
    
    return selectedPlanet.resources.metal >= offering.metal &&
           selectedPlanet.resources.crystal >= offering.crystal &&
           selectedPlanet.resources.deuterium >= offering.deuterium;
  };

  const isValidOffer = () => {
    const hasOffering = offering.metal > 0 || offering.crystal > 0 || offering.deuterium > 0;
    const hasRequesting = requesting.metal > 0 || requesting.crystal > 0 || requesting.deuterium > 0;
    
    return hasOffering && hasRequesting && canAfford();
  };

  const handleSubmit = () => {
    if (!isValidOffer()) return;

    const newOffer: Omit<TradeOffer, 'id' | 'created' | 'status'> = {
      playerId: player.id,
      playerName: player.username,
      type: offerType,
      offering,
      requesting,
      ratio: calculateRatio(),
      expires: Date.now() + (duration * 3600000),
      coordinates: selectedPlanet.coordinates,
      minRank,
      maxRank,
      allianceOnly,
    };

    onSubmit(newOffer);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const getRatioColor = (ratio: number) => {
    if (ratio < 1.5) return 'text-neon-red';
    if (ratio < 2.0) return 'text-neon-orange';
    if (ratio < 2.5) return 'text-neon-green';
    return 'text-neon-blue';
  };

  const getRatioText = (ratio: number) => {
    if (ratio < 1.5) return 'Muy desfavorable';
    if (ratio < 2.0) return 'Desfavorable';
    if (ratio < 2.5) return 'Justo';
    if (ratio < 3.0) return 'Favorable';
    return 'Muy favorable';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-3xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-6 border-b border-space-600">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-orbitron font-bold text-white">
                Crear Oferta de Intercambio
              </h2>
              <p className="text-gray-400 mt-1">
                Desde {selectedPlanet.name} ({selectedPlanet.coordinates})
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
          {/* Offer Type */}
          <div>
            <h3 className="text-lg font-rajdhani font-semibold text-white mb-4">
              Tipo de Oferta
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setOfferType('sell')}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  offerType === 'sell'
                    ? 'bg-neon-green/20 border-neon-green text-neon-green'
                    : 'bg-space-700/50 border-space-600 text-gray-400 hover:text-white'
                }`}
              >
                <TrendingUp className="w-6 h-6 mx-auto mb-2" />
                <span className="font-rajdhani font-medium">Vender Recursos</span>
                <p className="text-xs mt-1 opacity-80">Ofreces tus recursos</p>
              </button>
              <button
                onClick={() => setOfferType('buy')}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  offerType === 'buy'
                    ? 'bg-neon-blue/20 border-neon-blue text-neon-blue'
                    : 'bg-space-700/50 border-space-600 text-gray-400 hover:text-white'
                }`}
              >
                <ArrowUpDown className="w-6 h-6 mx-auto mb-2" />
                <span className="font-rajdhani font-medium">Comprar Recursos</span>
                <p className="text-xs mt-1 opacity-80">Solicitas recursos</p>
              </button>
            </div>
          </div>

          {/* Resource Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Offering */}
            <div>
              <h4 className="text-md font-rajdhani font-semibold text-white mb-4">
                {offerType === 'sell' ? 'Recursos que Ofreces' : 'Recursos que Ofreces a Cambio'}
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-400">Metal</label>
                    <span className="text-xs text-gray-500">
                      Disponible: {formatNumber(selectedPlanet.resources.metal)}
                    </span>
                  </div>
                  <input
                    type="number"
                    value={offering.metal || ''}
                    onChange={(e) => setOffering({ ...offering, metal: parseInt(e.target.value) || 0 })}
                    max={offerType === 'sell' ? selectedPlanet.resources.metal : undefined}
                    className="w-full px-3 py-2 bg-space-700 border border-space-600 rounded text-white text-sm focus:border-neon-blue focus:outline-none"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-400">Cristal</label>
                    <span className="text-xs text-gray-500">
                      Disponible: {formatNumber(selectedPlanet.resources.crystal)}
                    </span>
                  </div>
                  <input
                    type="number"
                    value={offering.crystal || ''}
                    onChange={(e) => setOffering({ ...offering, crystal: parseInt(e.target.value) || 0 })}
                    max={offerType === 'sell' ? selectedPlanet.resources.crystal : undefined}
                    className="w-full px-3 py-2 bg-space-700 border border-space-600 rounded text-white text-sm focus:border-neon-blue focus:outline-none"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-400">Deuterio</label>
                    <span className="text-xs text-gray-500">
                      Disponible: {formatNumber(selectedPlanet.resources.deuterium)}
                    </span>
                  </div>
                  <input
                    type="number"
                    value={offering.deuterium || ''}
                    onChange={(e) => setOffering({ ...offering, deuterium: parseInt(e.target.value) || 0 })}
                    max={offerType === 'sell' ? selectedPlanet.resources.deuterium : undefined}
                    className="w-full px-3 py-2 bg-space-700 border border-space-600 rounded text-white text-sm focus:border-neon-blue focus:outline-none"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Requesting */}
            <div>
              <h4 className="text-md font-rajdhani font-semibold text-white mb-4">
                {offerType === 'sell' ? 'Recursos que Solicitas' : 'Recursos que Necesitas'}
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Metal</label>
                  <input
                    type="number"
                    value={requesting.metal || ''}
                    onChange={(e) => setRequesting({ ...requesting, metal: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-space-700 border border-space-600 rounded text-white text-sm focus:border-neon-blue focus:outline-none"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Cristal</label>
                  <input
                    type="number"
                    value={requesting.crystal || ''}
                    onChange={(e) => setRequesting({ ...requesting, crystal: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-space-700 border border-space-600 rounded text-white text-sm focus:border-neon-blue focus:outline-none"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Deuterio</label>
                  <input
                    type="number"
                    value={requesting.deuterium || ''}
                    onChange={(e) => setRequesting({ ...requesting, deuterium: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-space-700 border border-space-600 rounded text-white text-sm focus:border-neon-blue focus:outline-none"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Trade Analysis */}
          {isValidOffer() && (
            <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
              <div className="flex items-center space-x-3 mb-3">
                <Calculator className="w-5 h-5 text-neon-blue" />
                <h4 className="font-rajdhani font-semibold text-white">Análisis del Intercambio</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">Ratio de Intercambio</p>
                  <p className={`text-lg font-orbitron font-bold ${getRatioColor(calculateRatio())}`}>
                    1:{calculateRatio().toFixed(2)}
                  </p>
                  <p className={`text-xs ${getRatioColor(calculateRatio())}`}>
                    {getRatioText(calculateRatio())}
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">Valor Ofrecido</p>
                  <p className="text-lg font-orbitron font-bold text-white">
                    {formatNumber(offering.metal + offering.crystal * 2 + offering.deuterium * 3)}
                  </p>
                  <p className="text-xs text-gray-400">puntos de valor</p>
                </div>
                
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">Valor Solicitado</p>
                  <p className="text-lg font-orbitron font-bold text-white">
                    {formatNumber(requesting.metal + requesting.crystal * 2 + requesting.deuterium * 3)}
                  </p>
                  <p className="text-xs text-gray-400">puntos de valor</p>
                </div>
              </div>
            </div>
          )}

          {/* Additional Options */}
          <div className="space-y-4">
            <h4 className="text-md font-rajdhani font-semibold text-white">
              Opciones Adicionales
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Duración (horas)
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-space-700 border border-space-600 rounded text-white text-sm focus:border-neon-blue focus:outline-none"
                >
                  <option value={12}>12 horas</option>
                  <option value={24}>24 horas</option>
                  <option value={48}>48 horas</option>
                  <option value={72}>72 horas</option>
                  <option value={168}>1 semana</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Rango Mínimo (opcional)
                </label>
                <input
                  type="number"
                  value={minRank || ''}
                  onChange={(e) => setMinRank(parseInt(e.target.value) || undefined)}
                  placeholder="Sin límite"
                  min="1"
                  className="w-full px-3 py-2 bg-space-700 border border-space-600 rounded text-white text-sm focus:border-neon-blue focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Rango Máximo (opcional)
                </label>
                <input
                  type="number"
                  value={maxRank || ''}
                  onChange={(e) => setMaxRank(parseInt(e.target.value) || undefined)}
                  placeholder="Sin límite"
                  min="1"
                  className="w-full px-3 py-2 bg-space-700 border border-space-600 rounded text-white text-sm focus:border-neon-blue focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="allianceOnly"
                checked={allianceOnly}
                onChange={(e) => setAllianceOnly(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="allianceOnly" className="text-sm text-gray-300 flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Solo miembros de mi alianza</span>
              </label>
            </div>
          </div>

          {/* Warnings */}
          {!canAfford() && offerType === 'sell' && (
            <div className="p-3 bg-neon-red/10 border border-neon-red/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-neon-red" />
                <span className="text-sm text-neon-red font-rajdhani font-medium">
                  No tienes suficientes recursos para esta oferta
                </span>
              </div>
            </div>
          )}

          {calculateRatio() > 0 && calculateRatio() < 1.5 && (
            <div className="p-3 bg-neon-orange/10 border border-neon-orange/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-neon-orange" />
                <span className="text-sm text-neon-orange font-rajdhani font-medium">
                  Esta oferta es muy desfavorable. Considera ajustar las cantidades.
                </span>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4 border-t border-space-600">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSubmit}
              disabled={!isValidOffer()}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Crear Oferta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}