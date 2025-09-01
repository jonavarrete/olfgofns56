import React from 'react';
import { useGame } from '../../context/GameContext';
import { useGNN } from '../../hooks/useGNN';
import { User, LogOut, Globe } from 'lucide-react';
import { Gem } from 'lucide-react';
import ResourceDisplay from '../UI/ResourceDisplay';
import PlanetSelector from '../UI/PlanetSelector';
import NotificationCenter from '../UI/NotificationCenter';
import GNNButton from '../GNN/GNNButton';

export default function Header() {
  const { state } = useGame();
  const { player, selectedPlanet } = state;
  
  // Get current universe and GNN data
  const currentUniverse = localStorage.getItem('selected_universe') || 'universe_1';
  const { state: gnnState, getBreakingNewsItems } = useGNN(currentUniverse, player.id);
  
  const breakingNews = getBreakingNewsItems();
  const hasBreakingNews = breakingNews.length > 0;

  return (
    <header className="relative bg-card-gradient border-b border-space-600 px-6 py-4 z-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <PlanetSelector />
          <ResourceDisplay resources={selectedPlanet.resources} showDebris={true} />
          
          {/* Dark Matter Display */}
          <div className="flex items-center space-x-2 px-3 py-2 bg-neon-purple/20 rounded-lg border border-neon-purple/30">
            <Gem className="w-4 h-4 text-neon-purple" />
            <span className="text-neon-purple font-orbitron font-bold">
              {player.officers.darkMatter.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
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

          <div className="relative flex items-center space-x-3 px-3 py-2 bg-space-700/50 rounded-lg">
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

          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <Globe className="w-5 h-5" />
          </button>

          <button 
            onClick={() => {
              localStorage.removeItem('selected_universe');
              window.location.replace('/lobby');
            }}
            className="relative p-2 text-gray-400 hover:text-neon-orange transition-colors"
            title="Volver al Lobby"
          >
            <Globe className="w-5 h-5" />
          </button>
          <button 
            onClick={() => {
              localStorage.clear();
              window.location.replace('/login');
            }}
            className="relative p-2 text-gray-400 hover:text-neon-red transition-colors"
            title="Cerrar Sesión"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}