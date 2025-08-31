import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { 
  X, 
  Gavel, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Coins,
  Eye
} from 'lucide-react';
import { AuctionItem, AuctionBid } from '../../types/trade';

interface AuctionBidModalProps {
  auction: AuctionItem;
  onClose: () => void;
  onBid: (auctionId: string, amount: number) => void;
  onBuyout?: (auctionId: string) => void;
}

export default function AuctionBidModal({ auction, onClose, onBid, onBuyout }: AuctionBidModalProps) {
  const { state } = useGame();
  const { player, selectedPlanet } = state;
  
  const [bidAmount, setBidAmount] = useState(auction.currentBid + 1000);
  const [showBidHistory, setShowBidHistory] = useState(false);

  const minBid = auction.currentBid + Math.max(1000, Math.floor(auction.currentBid * 0.05));
  const canAffordBid = selectedPlanet.resources.metal + selectedPlanet.resources.crystal + selectedPlanet.resources.deuterium >= bidAmount;
  const canAffordBuyout = auction.buyoutPrice ? 
    selectedPlanet.resources.metal + selectedPlanet.resources.crystal + selectedPlanet.resources.deuterium >= auction.buyoutPrice : 
    false;

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

  const handleBid = () => {
    if (bidAmount < minBid) {
      alert(`La puja mínima es ${formatNumber(minBid)}`);
      return;
    }
    
    if (!canAffordBid) {
      alert('No tienes suficientes recursos para esta puja');
      return;
    }

    onBid(auction.id, bidAmount);
  };

  const handleBuyout = () => {
    if (!auction.buyoutPrice || !canAffordBuyout) return;
    
    if (window.confirm(`¿Confirmas la compra directa por ${formatNumber(auction.buyoutPrice)} recursos?`)) {
      onBuyout?.(auction.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-2xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-6 border-b border-space-600">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-orbitron font-bold text-white">
                {auction.item.name}
              </h2>
              <p className="text-gray-400 mt-1">
                Subasta por {auction.sellerName}
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
          {/* Item Details */}
          <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-neon-purple/20 rounded-lg">
                {auction.item.type === 'ship' && <Rocket className="w-6 h-6 text-neon-purple" />}
                {auction.item.type === 'technology' && <Zap className="w-6 h-6 text-neon-purple" />}
              </div>
              <div className="flex-1">
                <h3 className="font-rajdhani font-semibold text-white text-lg">
                  {auction.item.name}
                </h3>
                <p className="text-sm text-gray-400 mt-1">{auction.item.description}</p>
                <div className="flex items-center space-x-4 mt-3 text-xs text-gray-400">
                  <span>Cantidad: {auction.item.quantity}</span>
                  <span>Ubicación: {auction.coordinates}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
              <h4 className="font-rajdhani font-semibold text-white mb-3">Estado Actual</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Puja actual:</span>
                  <span className="text-lg font-orbitron font-bold text-neon-purple">
                    {formatNumber(auction.currentBid)}
                  </span>
                </div>
                {auction.currentBidder && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Mejor postor:</span>
                    <span className="text-sm text-white">{auction.currentBidderName}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Tiempo restante:</span>
                  <span className="text-sm text-neon-orange font-rajdhani font-medium">
                    {formatTimeRemaining(auction.endTime)}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-space-700/30 rounded-lg border border-space-600">
              <h4 className="font-rajdhani font-semibold text-white mb-3">Tu Puja</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Cantidad (mínimo: {formatNumber(minBid)})
                  </label>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(parseInt(e.target.value) || minBid)}
                    min={minBid}
                    className="w-full px-3 py-2 bg-space-700 border border-space-600 rounded text-white text-sm focus:border-neon-blue focus:outline-none"
                  />
                </div>
                
                <Button 
                  variant="primary" 
                  onClick={handleBid}
                  disabled={!canAffordBid || bidAmount < minBid}
                  className="w-full"
                >
                  <Gavel className="w-4 h-4 mr-2" />
                  Pujar {formatNumber(bidAmount)}
                </Button>
              </div>
            </div>
          </div>

          {/* Buyout Option */}
          {auction.buyoutPrice && (
            <div className="p-4 bg-neon-orange/10 border border-neon-orange/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-rajdhani font-semibold text-white">Compra Directa</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Compra inmediatamente por {formatNumber(auction.buyoutPrice)} recursos
                  </p>
                </div>
                <Button 
                  variant="warning" 
                  onClick={handleBuyout}
                  disabled={!canAffordBuyout}
                >
                  <Coins className="w-4 h-4 mr-2" />
                  Comprar Ya
                </Button>
              </div>
            </div>
          )}

          {/* Bid History */}
          <div>
            <button
              onClick={() => setShowBidHistory(!showBidHistory)}
              className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>
                {showBidHistory ? 'Ocultar' : 'Ver'} historial de pujas ({auction.bidHistory.length})
              </span>
            </button>

            {showBidHistory && auction.bidHistory.length > 0 && (
              <div className="mt-3 p-4 bg-space-700/30 rounded-lg border border-space-600">
                <div className="space-y-2">
                  {auction.bidHistory.map((bid) => (
                    <div key={bid.id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">{bid.bidderName}</span>
                      <div className="flex items-center space-x-3">
                        <span className="text-white font-rajdhani font-medium">
                          {formatNumber(bid.amount)}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {new Date(bid.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-space-600">
            <Button variant="secondary" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}