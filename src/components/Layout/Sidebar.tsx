import React from 'react';
import { NavLink } from 'react-router-dom';
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
  BarChart3
} from 'lucide-react';

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
  { name: 'Rankings', href: '/rankings', icon: Trophy },
  { name: 'Alianza', href: '/alliance', icon: Users },
  { name: 'Mensajes', href: '/messages', icon: MessageSquare },
];

export default function Sidebar() {
  return (
    <div className="relative w-64 bg-space-gradient border-r border-space-600 min-h-screen z-20">
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
        </div>
      </div>

      <nav className="px-3">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-rajdhani font-medium rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                      : 'text-gray-300 hover:text-white hover:bg-space-700/50'
                  }`
                }
              >
                <item.icon className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-space-600">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 text-sm font-rajdhani font-medium rounded-lg transition-all duration-200 ${
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
  );
}