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
  

  return (
    <div className="space-y-6">
      Coming Soon
    </div>
  );
}