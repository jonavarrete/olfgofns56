import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { 
  FlaskConical, 
  Zap, 
  Cpu, 
  Rocket, 
  Shield, 
  Sword, 
  Globe, 
  Brain,
  Clock,
  TrendingUp
} from 'lucide-react';

interface ResearchInfo {
  name: string;
  description: string;
  icon: React.ElementType;
  category: string;
  requirements?: { [key: string]: number };
}

export default function Research() {
  return (
    <div className="space-y-6">
      Coming Soon
    </div>
  );
}