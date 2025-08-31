import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { 
  Store, 
  TrendingUp, 
  Gavel, 
  Recycle,
  Plus,
  Search,
  Filter,
  Clock,
  Star,
  Package,
  Coins,
  ArrowUpDown,
  Eye,
  ShoppingCart,
  Truck,
  AlertTriangle,
  CheckCircle,
  X,
  Zap,
  Rocket,
  Shield
} from 'lucide-react';
import { TradeOffer, AuctionItem, ScrapDealerOffer, MerchantOffer } from '../types/trade';
import { mockTradeOffers, mockAuctions, mockScrapDealer, mockMerchant } from '../data/tradeData';

type TradeTab = 'merchant' | 'import_export' | 'auction' | 'scrap_dealer';

export default function Trade() {
  const { state } = useGame();
  const { player, selectedPlanet } = state;
  
  const [activeTab, setActiveTab] = useState<TradeTab>('merchant');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'buy' | 'sell'>('all');
  const [showCreateOffer, setShowCreateOffer] = useState(false);
  
  // Trade data (in a real app, this would come from context/API)
  const [tradeOffers] = useState<TradeOffer[]>(mockTradeOffers);
  const [auctions] = useState<AuctionItem[]>(mockAuctions);
  const [scrapDealer] = useState<ScrapDealerOffer[]>(mockScrapDealer);
  const [merchant] = useState<MerchantOffer[]>(mockMerchant);

  const tabs = [
    { id: 'merchant' as const, name: 'Mercader', icon: Store, color: 'neon-blue' },
    { id: 'import_export' as const, name: 'Import/Export', icon: TrendingUp, color: 'neon-green' },
    { id: 'auction' as const, name: 'Subasta', icon: Gavel, color: 'neon-purple' },
    { id: 'scrap_dealer' as const, name: 'Chatarrero', icon: Recycle, color: 'neon-orange' },
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const formatTimeRemaining = (timestamp: number) => {
    const remaining = Math.max(0, timestamp - Date.now());
    const hours = Math.floor(remaining / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'uncommon': return 'text-neon-green';
      case 'rare': return 'text-neon-blue';
      case 'epic': return 'text-neon-purple';
      case 'legendary': return 'text-neon-orange';
      default: return 'text-gray-400';
    }
  };

  const canAfford = (cost: { metal: number; crystal: number; deuterium: number }) => {
    return selectedPlanet.resources.metal >= cost.metal &&
           selectedPlanet.resources.crystal >= cost.crystal &&
           selectedPlanet.resources.deuterium >= cost.deuterium;
  };

  const renderMerchant = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-orbitron font-bold text-white">Mercader Galáctico</h2>
          <p className="text-gray-400 mt-1">Ofertas especiales y objetos únicos</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Próxima actualización en 2h 15m</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {merchant.map((offer) => (
          <Card key={offer.id} className="hover:scale-105 transition-transform duration-300">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-rajdhani font-semibold text-white">{offer.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{offer.description}</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${
                  offer.rarity === 'legendary' ? 'bg-neon-orange/20 text-neon-orange' :
                  offer.rarity === 'epic' ? 'bg-neon-purple/20 text-neon-purple' :
                  offer.rarity === 'rare' ? 'bg-neon-blue/20 text-neon-blue' :
                  offer.rarity === 'uncommon' ? 'bg-neon-green/20 text-neon-green' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {offer.rarity}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Costo:</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {offer.cost.metal > 0 && (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="text-gray-300">{formatNumber(offer.cost.metal)}</span>
                    </div>
                  )}
                  {offer.cost.crystal > 0 && (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                      <span className="text-neon-blue">{formatNumber(offer.cost.crystal)}</span>
                    </div>
                  )}
                  {offer.cost.deuterium > 0 && (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                      <span className="text-neon-green">{formatNumber(offer.cost.deuterium)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  Disponible: {offer.available}
                </span>
                <Button 
                  size="sm" 
                  variant={canAfford(offer.cost) ? "primary" : "secondary"}
                  disabled={!canAfford(offer.cost) || offer.available === 0}
                >
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Comprar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderImportExport = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-orbitron font-bold text-white">Import/Export</h2>
          <p className="text-gray-400 mt-1">Intercambia recursos con otros jugadores</p>
        </div>
        <Button variant="primary" onClick={() => setShowCreateOffer(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Crear Oferta
        </Button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar ofertas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-space-700 border border-space-600 rounded-lg text-white text-sm focus:border-neon-blue focus:outline-none"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as typeof filterType)}
          className="px-4 py-2 bg-space-700 border border-space-600 rounded-lg text-white text-sm focus:border-neon-blue focus:outline-none"
        >
          <option value="all">Todas</option>
          <option value="buy">Compra</option>
          <option value="sell">Venta</option>
        </select>
      </div>

      <div className="space-y-4">
        {tradeOffers
          .filter(offer => filterType === 'all' || offer.type === filterType)
          .filter(offer => 
            searchTerm === '' || 
            offer.playerName.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((offer) => (
            <Card key={offer.id} className="hover:border-neon-blue/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${
                    offer.type === 'sell' ? 'bg-neon-green/20' : 'bg-neon-blue/20'
                  }`}>
                    {offer.type === 'sell' ? (
                      <TrendingUp className={`w-5 h-5 ${
                        offer.type === 'sell' ? 'text-neon-green' : 'text-neon-blue'
                      }`} />
                    ) : (
                      <ArrowUpDown className="w-5 h-5 text-neon-blue" />
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-rajdhani font-semibold text-white">
                        {offer.playerName}
                      </h3>
                      <span className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${
                        offer.type === 'sell' ? 'bg-neon-green/20 text-neon-green' : 'bg-neon-blue/20 text-neon-blue'
                      }`}>
                        {offer.type === 'sell' ? 'VENDE' : 'COMPRA'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{offer.coordinates}</p>
                    
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-400">Ofrece:</span>
                        <div className="flex items-center space-x-1">
                          {offer.offering.metal > 0 && (
                            <span className="text-xs text-gray-300">{formatNumber(offer.offering.metal)}M</span>
                          )}
                          {offer.offering.crystal > 0 && (
                            <span className="text-xs text-neon-blue">{formatNumber(offer.offering.crystal)}C</span>
                          )}
                          {offer.offering.deuterium > 0 && (
                            <span className="text-xs text-neon-green">{formatNumber(offer.offering.deuterium)}D</span>
                          )}
                        </div>
                      </div>
                      
                      <ArrowUpDown className="w-3 h-3 text-gray-400" />
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-400">Pide:</span>
                        <div className="flex items-center space-x-1">
                          {offer.requesting.metal > 0 && (
                            <span className="text-xs text-gray-300">{formatNumber(offer.requesting.metal)}M</span>
                          )}
                          {offer.requesting.crystal > 0 && (
                            <span className="text-xs text-neon-blue">{formatNumber(offer.requesting.crystal)}C</span>
                          )}
                          {offer.requesting.deuterium > 0 && (
                            <span className="text-xs text-neon-green">{formatNumber(offer.requesting.deuterium)}D</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Ratio</p>
                    <p className="text-sm font-rajdhani font-bold text-white">
                      1:{offer.ratio}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatTimeRemaining(offer.expires)}
                    </p>
                  </div>
                  
                  <div className="flex flex-col space-y-1">
                    <Button size="sm" variant="primary">
                      <Truck className="w-3 h-3 mr-1" />
                      Aceptar
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Eye className="w-3 h-3 mr-1" />
                      Ver
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );

  const renderAuction = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-orbitron font-bold text-white">Casa de Subastas</h2>
          <p className="text-gray-400 mt-1">Puja por objetos únicos y valiosos</p>
        </div>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Crear Subasta
        </Button>
      </div>

      <div className="space-y-4">
        {auctions.map((auction) => (
          <Card key={auction.id} className="hover:border-neon-purple/50 transition-colors">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-neon-purple/20 rounded-lg">
                    {auction.item.type === 'ship' && <Rocket className="w-6 h-6 text-neon-purple" />}
                    {auction.item.type === 'defense' && <Shield className="w-6 h-6 text-neon-purple" />}
                    {auction.item.type === 'technology' && <Zap className="w-6 h-6 text-neon-purple" />}
                    {auction.item.type === 'resource_package' && <Package className="w-6 h-6 text-neon-purple" />}
                    {auction.item.type === 'artifact' && <Star className="w-6 h-6 text-neon-purple" />}
                  </div>
                  
                  <div>
                    <h3 className="font-rajdhani font-semibold text-white text-lg">
                      {auction.item.name}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">{auction.item.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs text-gray-400">
                        Vendedor: {auction.sellerName}
                      </span>
                      <span className="text-xs text-gray-400">
                        {auction.coordinates}
                      </span>
                      <span className="text-xs text-gray-400">
                        Cantidad: {auction.item.quantity}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-1 text-xs text-gray-400 mb-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatTimeRemaining(auction.endTime)}</span>
                  </div>
                  {auction.buyoutPrice && (
                    <div className="text-xs text-neon-orange">
                      Compra directa: {formatNumber(auction.buyoutPrice)}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">Puja actual:</span>
                    <span className="text-lg font-orbitron font-bold text-neon-purple">
                      {formatNumber(auction.currentBid)}
                    </span>
                  </div>
                  {auction.currentBidder && (
                    <p className="text-xs text-gray-400">
                      Por: {auction.currentBidderName}
                    </p>
                  )}
                </div>

                <div className="flex space-x-2">
                  {auction.buyoutPrice && (
                    <Button size="sm" variant="warning">
                      <Coins className="w-3 h-3 mr-1" />
                      Comprar Ya
                    </Button>
                  )}
                  <Button size="sm" variant="primary">
                    <Gavel className="w-3 h-3 mr-1" />
                    Pujar
                  </Button>
                </div>
              </div>

              {auction.bidHistory.length > 0 && (
                <div className="border-t border-space-600 pt-3">
                  <h4 className="text-xs font-rajdhani font-medium text-gray-400 mb-2">
                    Historial de Pujas (últimas 3)
                  </h4>
                  <div className="space-y-1">
                    {auction.bidHistory.slice(0, 3).map((bid) => (
                      <div key={bid.id} className="flex items-center justify-between text-xs">
                        <span className="text-gray-300">{bid.bidderName}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-rajdhani font-medium">
                            {formatNumber(bid.amount)}
                          </span>
                          <span className="text-gray-400">
                            {formatTimeRemaining(bid.timestamp)} atrás
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderScrapDealer = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-orbitron font-bold text-white">Chatarrero Espacial</h2>
          <p className="text-gray-400 mt-1">Convierte escombros y restos en recursos útiles</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Recycle className="w-4 h-4" />
          <span>Inventario actualizado cada 4 horas</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scrapDealer.map((offer) => (
          <Card key={offer.id} className="hover:scale-105 transition-transform duration-300">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-rajdhani font-semibold text-white">{offer.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{offer.description}</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${
                  offer.rarity === 'epic' ? 'bg-neon-purple/20 text-neon-purple' :
                  offer.rarity === 'rare' ? 'bg-neon-blue/20 text-neon-blue' :
                  offer.rarity === 'uncommon' ? 'bg-neon-green/20 text-neon-green' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {offer.rarity}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-400">Costo:</span>
                    <span className="text-xs text-gray-400">Eficiencia: {offer.efficiency}%</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {offer.cost.metal > 0 && (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="text-gray-300">{formatNumber(offer.cost.metal)}</span>
                      </div>
                    )}
                    {offer.cost.crystal > 0 && (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                        <span className="text-neon-blue">{formatNumber(offer.cost.crystal)}</span>
                      </div>
                    )}
                    {offer.cost.deuterium > 0 && (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                        <span className="text-neon-green">{formatNumber(offer.cost.deuterium)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {offer.type === 'debris' && (
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-400">Obtienes:</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {offer.value.metal > 0 && (
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <span className="text-gray-300">+{formatNumber(offer.value.metal)}</span>
                        </div>
                      )}
                      {offer.value.crystal > 0 && (
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                          <span className="text-neon-blue">+{formatNumber(offer.value.crystal)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">Disponible:</span>
                  <span className="text-xs text-white font-rajdhani font-medium">
                    {offer.available}
                  </span>
                </div>
                <Button 
                  size="sm" 
                  variant={canAfford(offer.cost) ? "primary" : "secondary"}
                  disabled={!canAfford(offer.cost) || offer.available === 0}
                >
                  <Recycle className="w-3 h-3 mr-1" />
                  {offer.type === 'debris' ? 'Procesar' : 'Comprar'}
                </Button>
              </div>

              <div className="text-xs text-gray-400 flex items-center justify-between border-t border-space-600 pt-2">
                <span>Se actualiza en: {formatTimeRemaining(offer.refreshTime)}</span>
                {offer.efficiency >= 80 && (
                  <span className="text-neon-green">¡Excelente valor!</span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'merchant': return renderMerchant();
      case 'import_export': return renderImportExport();
      case 'auction': return renderAuction();
      case 'scrap_dealer': return renderScrapDealer();
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            Centro de Comercio Galáctico
          </h1>
          <p className="text-gray-400 mt-1">
            Hub central para todas las actividades comerciales
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="px-4 py-2 bg-neon-green/20 rounded-lg border border-neon-green/30">
            <span className="text-neon-green font-rajdhani font-medium text-sm">
              Reputación: 4.8/5.0
            </span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-space-800/50 p-1 rounded-lg border border-space-600">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-rajdhani font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? `bg-${tab.color}/20 text-${tab.color} border border-${tab.color}/30`
                : 'text-gray-400 hover:text-white hover:bg-space-700/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="relative">
        {renderActiveTab()}
      </div>

      {/* Create Offer Modal */}
      {showCreateOffer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card-gradient border border-space-600 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-space-600">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-orbitron font-bold text-white">
                  Crear Oferta de Intercambio
                </h2>
                <button
                  onClick={() => setShowCreateOffer(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-neon-green/20 border border-neon-green/30 rounded-lg text-center">
                  <TrendingUp className="w-6 h-6 text-neon-green mx-auto mb-2" />
                  <span className="text-white font-rajdhani font-medium">Vender Recursos</span>
                </button>
                <button className="p-4 bg-neon-blue/20 border border-neon-blue/30 rounded-lg text-center">
                  <ArrowUpDown className="w-6 h-6 text-neon-blue mx-auto mb-2" />
                  <span className="text-white font-rajdhani font-medium">Comprar Recursos</span>
                </button>
              </div>

              <div className="text-center text-gray-400">
                <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Funcionalidad en desarrollo</p>
                <p className="text-xs mt-1">Próximamente podrás crear ofertas personalizadas</p>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-space-600">
                <Button variant="secondary" onClick={() => setShowCreateOffer(false)}>
                  Cancelar
                </Button>
                <Button variant="primary" disabled>
                  Crear Oferta
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}