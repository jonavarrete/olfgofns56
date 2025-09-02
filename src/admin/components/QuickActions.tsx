import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminCard from './AdminCard';
import Button from '../../components/UI/Button';
import { 
  UserPlus, 
  MessageSquare, 
  Shield, 
  Globe,
  Radio,
  Settings,
  Database,
  Mail,
  Bot,
  AlertTriangle
} from 'lucide-react';

export default function QuickActions() {
  const navigate = useNavigate();

  const quickActions = [
    {
      name: 'Crear Usuario',
      description: 'Crear nueva cuenta de jugador',
      icon: UserPlus,
      color: 'neon-green',
      action: () => navigate('/admin/users/create')
    },
    {
      name: 'Mensaje Global',
      description: 'Enviar mensaje a todos los usuarios',
      icon: MessageSquare,
      color: 'neon-blue',
      action: () => navigate('/admin/messages/global')
    },
    {
      name: 'Crear Misión PvE',
      description: 'Diseñar nueva misión',
      icon: Globe,
      color: 'neon-purple',
      action: () => navigate('/admin/content/missions/create')
    },
    {
      name: 'Publicar Noticia',
      description: 'Crear noticia para GNN',
      icon: Radio,
      color: 'neon-orange',
      action: () => navigate('/admin/content/news/create')
    },
    {
      name: 'Revisar Reportes',
      description: 'Gestionar violaciones',
      icon: Shield,
      color: 'neon-red',
      action: () => navigate('/admin/security/violations')
    },
    {
      name: 'Configuración',
      description: 'Ajustes de plataforma',
      icon: Settings,
      color: 'neon-blue',
      action: () => navigate('/admin/config/platform')
    }
  ];

  return (
    <AdminCard title="Acciones Rápidas" icon={Settings} color="neon-green">
      <div className="space-y-3">
        {quickActions.map((action) => (
          <button
            key={action.name}
            onClick={action.action}
            className="w-full flex items-center space-x-3 p-3 bg-space-700/30 rounded-lg border border-space-600 hover:border-neon-blue/30 transition-all duration-200 group"
          >
            <div className={`p-2 rounded border bg-${action.color}/20 border-${action.color}/30`}>
              <action.icon className={`w-4 h-4 text-${action.color}`} />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-rajdhani font-medium text-white group-hover:text-neon-blue transition-colors">
                {action.name}
              </p>
              <p className="text-xs text-gray-400">
                {action.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </AdminCard>
  );
}