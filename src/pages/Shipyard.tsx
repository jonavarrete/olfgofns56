import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { 
  Rocket, 
  Package, 
  Sword, 
  Shield, 
  Eye, 
  Bomb,
  Clock,
  Plus,
  Minus
} from 'lucide-react';

interface ShipInfo {
  name: string;
  description: string;
  icon: React.ElementType;
  category: string;
  cost: { metal: number; crystal: number; deuterium: number };
  requirements?: { [key: string]: number };
}



export default function Shipyard() {
  return (
    <div className="space-y-6">
      Coming Soon
    </div>
  );
}