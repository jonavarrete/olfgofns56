import React, { useState } from 'react';
import AdminCard from '../components/AdminCard';
import Button from '../../components/UI/Button';
import GlobalMessageCreator from '../components/GlobalMessageCreator';
import { 
  MessageSquare, 
  Mail, 
  Bot, 
  Radio,
  Send,
  Users,
  Globe,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { GlobalMessage } from '../../types/admin';

type CommunicationTab = 'messages' | 'email' | 'telegram' | 'templates';

export default function CommunicationCenter() {
  

  return (
    <div className="space-y-6">
      Coming Soon
    </div>
  );
}
