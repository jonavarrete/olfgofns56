import React from 'react';
import { useGame } from '../../context/GameContext';
import { useGNN } from '../../hooks/useGNN';
import { User, LogOut, Globe, Menu } from 'lucide-react';
import { Gem } from 'lucide-react';
import ResourceDisplay from '../UI/ResourceDisplay';
import PlanetSelector from '../UI/PlanetSelector';
import NotificationCenter from '../UI/NotificationCenter';
import GNNButton from '../GNN/GNNButton';

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const { state } = useGame();
  const { player, selectedPlanet } = state;
  
  // Get current universe and GNN data
  const currentUniverse = localStorage.getItem('selected_universe') || 'universe_1';
  const { state: gnnState, getBreakingNewsItems } = useGNN(currentUniverse, player.id);
  
  const breakingNews = getBreakingNewsItems();
  const hasBreakingNews = breakingNews.length > 0;

  return (
    <header className="relative bg-card-gradient border-b border-space-600 px-4 lg:px-6 py-4 z-20">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="flex items-center space-x-2 lg:space-x-6 flex-1 lg:flex-initial overflow-x-auto">
          <PlanetSelector />
          <div className="hidden sm:block">
            <ResourceDisplay resources={selectedPlanet.resources} showDebris={true} />
          </div>
          
          {/* Dark Matter Display */}
          <div className="flex items-center space-x-2 px-2 lg:px-3 py-2 bg-neon-purple/20 rounded-lg border border-neon-purple/30 flex-shrink-0">
            <Gem className="w-4 h-4 text-neon-purple" />
            <span className="text-neon-purple font-orbitron font-bold text-sm lg:text-base">
              {player.officers.darkMatter.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 lg:space-x-4">
          <NotificationCenter />
          
          <GNNButton 
            unreadCount={gnnState.unreadCount}
            hasBreakingNews={hasBreakingNews}
            onClick={() => {
              // This will be handled by the Dashboard component
              const event = new CustomEvent('openGNN');
              window.dispatchEvent(event);
            }}
          />

          <div className="relative hidden md:flex items-center space-x-3 px-3 py-2 bg-space-700/50 rounded-lg">
            <div className="w-8 h-8 bg-neon-purple/20 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-neon-purple" />
            </div>
            <div>
              <p className="text-sm font-rajdhani font-medium text-white">
                {player.username}
              </p>
              <p className="text-xs text-gray-400">
                Rango #{player.rank} • Nivel {player.level}
              </p>
            </div>
          </div>
          
          {/* Mobile User Avatar */}
          <div className="md:hidden w-8 h-8 bg-neon-purple/20 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-neon-purple" />
          </div>
          
          <button 
            onClick={() => {
              localStorage.clear();
              window.location.replace('/login');
            }}
            className="relative p-2 text-gray-400 hover:text-neon-red transition-colors hidden lg:block"
            title="Cerrar Sesión"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Mobile Resources Display */}
      <div className="sm:hidden mt-4 pt-4 border-t border-space-600">
        <ResourceDisplay resources={selectedPlanet.resources} showDebris={true} />
      </div>
    </header>
  );
}