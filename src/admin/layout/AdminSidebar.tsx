import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { 
  Shield, 
  BarChart3,
  Users, 
  Globe, 
  MessageSquare,
  Settings,
  Database,
  Radio,
  Target,
  Crown,
  AlertTriangle,
  Mail,
  Bot,
  FileText,
  Languages,
  ExternalLink,
  Menu,
  X,
  LogOut,
  Eye,
  Ban,
  UserX,
  Gavel
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/admin/dashboard', 
    icon: BarChart3,
    category: 'main'
  },
  { 
    name: 'Gestión de Usuarios', 
    href: '/admin/users', 
    icon: Users,
    category: 'users'
  },
  { 
    name: 'Crear Usuario', 
    href: '/admin/users/create', 
    icon: Users,
    category: 'users',
    indent: true
  },
  { 
    name: 'Rastreo de Usuarios', 
    href: '/admin/users/tracking', 
    icon: Eye,
    category: 'users',
    indent: true
  },
  { 
    name: 'Universos', 
    href: '/admin/content/universes', 
    icon: Globe,
    category: 'content'
  },
  { 
    name: 'Contenido PvE', 
    href: '/admin/content', 
    icon: Target,
    category: 'content'
  },
  { 
    name: 'Misiones PvE', 
    href: '/admin/content/missions', 
    icon: Target,
    category: 'content',
    indent: true
  },
  { 
    name: 'Razas Alienígenas', 
    href: '/admin/content/aliens', 
    icon: Crown,
    category: 'content',
    indent: true
  },
  { 
    name: 'Noticias GNN', 
    href: '/admin/content/news', 
    icon: Radio,
    category: 'content',
    indent: true
  },
  { 
    name: 'Gestión de Universos', 
    href: '/admin/content/universes', 
    icon: Globe,
    category: 'content',
    indent: true
  },
  { 
    name: 'Comunicación', 
    href: '/admin/communication', 
    icon: MessageSquare,
    category: 'communication'
  },
  { 
    name: 'Mensajes Globales', 
    href: '/admin/communication/global', 
    icon: MessageSquare,
    category: 'communication',
    indent: true
  },
  { 
    name: 'Email Masivo', 
    href: '/admin/communication/email', 
    icon: Mail,
    category: 'communication',
    indent: true
  },
  { 
    name: 'Bot Telegram', 
    href: '/admin/communication/telegram', 
    icon: Bot,
    category: 'communication',
    indent: true
  },
  { 
    name: 'Seguridad', 
    href: '/admin/security', 
    icon: Shield,
    category: 'security'
  },
  { 
    name: 'Violaciones', 
    href: '/admin/security/violations', 
    icon: AlertTriangle,
    category: 'security',
    indent: true
  },
  { 
    name: 'Baneos IP', 
    href: '/admin/security/ip-bans', 
    icon: Ban,
    category: 'security',
    indent: true
  },
  { 
    name: 'Baneos Usuario', 
    href: '/admin/security/user-bans', 
    icon: UserX,
    category: 'security',
    indent: true
  },
  { 
    name: 'Penalizaciones', 
    href: '/admin/security/penalties', 
    icon: Gavel,
    category: 'security',
    indent: true
  },
  { 
    name: 'Configuración', 
    href: '/admin/config', 
    icon: Settings,
    category: 'system'
  },
  { 
    name: 'Plataforma', 
    href: '/admin/config/platform', 
    icon: Settings,
    category: 'system',
    indent: true
  },
  { 
    name: 'APIs Externas', 
    href: '/admin/config/apis', 
    icon: ExternalLink,
    category: 'system',
    indent: true
  },
  { 
    name: 'Plantillas', 
    href: '/admin/config/templates', 
    icon: FileText,
    category: 'system',
    indent: true
  },
  { 
    name: 'Idiomas', 
    href: '/admin/config/languages', 
    icon: Languages,
    category: 'system',
    indent: true
  },
];

export default function AdminSidebar({ isOpen, onToggle }: AdminSidebarProps) {
  const { logout } = useAdmin();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:relative top-0 left-0 h-full w-64 bg-space-gradient border-r border-space-600 z-50 lg:z-20
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile Close Button */}
        <div className="lg:hidden absolute top-4 right-4">
          <button
            onClick={onToggle}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-neon-red rounded-lg flex items-center justify-center animate-glow">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-orbitron font-bold text-white">
                Admin Panel
              </h1>
              <p className="text-xs text-gray-400">Galactic Empire</p>
            </div>
          </div>
        </div>

        <nav className="px-3 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      onToggle();
                    }
                  }}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-3 text-sm font-rajdhani font-medium rounded-lg transition-all duration-200 group ${
                      item.indent ? 'ml-6' : ''
                    } ${
                      isActive
                        ? 'bg-neon-red/20 text-neon-red border border-neon-red/30'
                        : 'text-gray-300 hover:text-white hover:bg-space-700/50'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-space-600 mt-auto">
          <button
            onClick={logout}
            className="w-full flex items-center px-3 py-3 text-sm font-rajdhani font-medium rounded-lg text-gray-300 hover:text-neon-red hover:bg-neon-red/10 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </>
  );
}