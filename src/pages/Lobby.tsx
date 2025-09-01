import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLobby } from '../hooks/useLobby';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import AccountSettings from '../components/Lobby/AccountSettings';
import GlobalStats from '../components/Lobby/GlobalStats';
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
  RefreshCw
} from 'lucide-react';
import { Universe } from '../types/auth';

export default function Lobby() {
  return (
    <div className="space-y-6">
      Coming Soon
    </div>
  );
}