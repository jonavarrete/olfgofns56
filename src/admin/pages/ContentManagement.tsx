import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminCard from '../components/AdminCard';
import Button from '../../components/UI/Button';
import PvEMissionEditor from '../components/PvEMissionEditor';
import AlienRaceEditor from '../components/AlienRaceEditor';
import GNNNewsEditor from '../components/GNNNewsEditor';
import { 
  Target, 
  Crown, 
  Radio, 
  Plus,
  Edit,
  Eye,
  Trash2,
  Search,
  Filter,
  Globe,
  Star,
  Sword,
  Package,
  Calendar,
  Activity
} from 'lucide-react';
import { AdminPvEMission, AdminAlienRace } from '../../types/admin';

type ContentTab = 'missions' | 'aliens' | 'news';

export default function ContentManagement() {
  

  return (
    <div className="space-y-6">
      Coming Soon
    </div>
  );
}