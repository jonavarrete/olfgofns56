import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Building, 
  FlaskConical, 
  Rocket, 
  Swords, 
  Trophy, 
  Users, 
  MessageSquare,
  Settings,
  Globe,
  Book,
  Calculator,
  Target,
  Store,
  Crown,
  BarChart3,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: 'Imperio', href: '/', icon: Home },
  { name: 'Vista Imperio', href: '/empire', icon: BarChart3 },
  { name: 'Edificios', href: '/buildings', icon: Building },
  { name: 'Investigación', href: '/research', icon: FlaskConical },
  { name: 'Astillero', href: '/shipyard', icon: Rocket },
  { name: 'Flota', href: '/fleet', icon: Swords },
  { name: 'Oficiales', href: '/officers', icon: Crown },
  { name: 'Galaxia', href: '/galaxy', icon: Globe },
  { name: 'Comercio', href: '/trade', icon: Store },
  { name: 'Calculador', href: '/resource-calculator', icon: Calculator },
  { name: 'Árbol Tecnológico', href: '/technology-tree', icon: Target },
  { name: 'Simulador', href: '/simulator', icon: Calculator },
  { name: 'Misiones PvE', href: '/pve-missions', icon: Target },
  { name: 'Guía Galáctica', href: '/guide', icon: Book },
  { name: 'Salón de la Fama', href: '/hall-of-fame', icon: Trophy },
  { name: 'Rankings', href: '/rankings', icon: Trophy },
  { name: 'Alianza', href: '/alliance', icon: Users },
  { name: 'Mensajes', href: '/messages', icon: MessageSquare },
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();

  const handleNavClick = () => {
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

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
          <div className="w-10 h-10 bg-neon-blue rounded-lg flex items-center justify-center animate-glow">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-orbitron font-bold text-white">
              Galactic Empire
            </h1>
            <p className="text-xs text-gray-400">v2.0 Next Gen</p>
          </div>
          
          <button 
            onClick={() => {
              localStorage.removeItem('selected_universe');
              window.location.replace('/lobby');
            }}
            className="relative p-2 text-gray-400 hover:text-neon-orange transition-colors hidden lg:block"
            title="Volver al Lobby"
          >
            <Globe className="w-5 h-5" />
          </button>
        </div>
      </div>

      <nav className="px-3 flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `flex items-center px-3 py-3 text-sm font-rajdhani font-medium rounded-lg transition-all duration-200 group touch-manipulation ${
                    isActive
                      ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
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
        {/* Mobile Lobby Button */}
        <button 
          onClick={() => {
            localStorage.removeItem('selected_universe');
            window.location.replace('/lobby');
          }}
          className="w-full lg:hidden flex items-center justify-center px-3 py-3 mb-3 text-sm font-rajdhani font-medium rounded-lg text-gray-300 hover:text-white hover:bg-space-700/50 transition-colors"
        >
          <Globe className="w-5 h-5 mr-3" />
          Volver al Lobby
        </button>
        
        <NavLink
          to="/settings"
          onClick={handleNavClick}
          className={({ isActive }) =>
            `flex items-center px-3 py-3 text-sm font-rajdhani font-medium rounded-lg transition-all duration-200 touch-manipulation ${
              isActive
                ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                : 'text-gray-300 hover:text-white hover:bg-space-700/50'
            }`
          }
        >
          <Settings className="w-5 h-5 mr-3" />
          Configuración
        </NavLink>
      </div>
      </div>
    </>
  );
}