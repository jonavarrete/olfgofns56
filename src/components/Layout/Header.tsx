import React from 'react';
import { useGame } from '../../context/GameContext';
import { useGNN } from '../../hooks/useGNN';
import { User, LogOut, Globe, Menu, Gem } from 'lucide-react';
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
        {/* Left Section - Menu Button & Planet Selector */}
        <div className="flex items-center space-x-2 lg:space-x-4 min-w-0">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors flex-shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Planet Selector */}
          <div className="flex-shrink-0 min-w-[120px] md:min-w-[140px]">
            <PlanetSelector />
          </div>
        </div>

        {/* Center Section - Resources (Desktop and Medium screens) */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-4 mx-2 xl:mx-4 min-w-0 flex-1 justify-center">
          <div className="min-w-0">
            <ResourceDisplay 
              resources={selectedPlanet.resources} 
              showDebris={true}
              compact={true}
            />
          </div>
          
          {/* Dark Matter Display */}
          <div className="flex items-center space-x-2 px-2 lg:px-3 py-1 lg:py-2 bg-neon-purple/20 rounded-lg border border-neon-purple/30 flex-shrink-0">
            <Gem className="w-3 lg:w-4 h-3 lg:h-4 text-neon-purple" />
            <span className="text-neon-purple font-orbitron font-bold text-xs lg:text-sm">
              {player.officers.darkMatter.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Right Section - User & Notifications */}
        <div className="flex items-center space-x-2 lg:space-x-3 flex-shrink-0">
          {/* Notification Center - Desktop */}
          <div className="hidden sm:block">
            <NotificationCenter />
          </div>
          
          {/* GNN Button */}
          <div className="flex-shrink-0">
            <GNNButton 
              unreadCount={gnnState.unreadCount}
              hasBreakingNews={hasBreakingNews}
              onClick={() => {
                const event = new CustomEvent('openGNN');
                window.dispatchEvent(event);
              }}
            />
          </div>

          {/* User Info - Desktop */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3 px-2 lg:px-3 py-1 lg:py-2 bg-space-700/50 rounded-lg">
            <div className="w-6 lg:w-8 h-6 lg:h-8 bg-neon-purple/20 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-3 lg:w-4 h-3 lg:h-4 text-neon-purple" />
            </div>
            <div className="hidden xl:block min-w-0">
              <p className="text-xs lg:text-sm font-rajdhani font-medium text-white truncate">
                {player.username}
              </p>
              <p className="text-xs text-gray-400">
                #{player.rank} • Lv.{player.level}
              </p>
            </div>
          </div>

          {/* Mobile Section - Notifications and User */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Notification Center - Mobile (separado del usuario) */}
            <div className="sm:hidden">
              <NotificationCenter />
            </div>
            
            {/* User Avatar - Mobile */}
            <div className="w-8 h-8 bg-neon-purple/20 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-neon-purple" />
            </div>
          </div>
          
          {/* Logout Button - Desktop */}
          <button 
            onClick={() => {
              localStorage.clear();
              window.location.replace('/login');
            }}
            className="hidden lg:block p-2 text-gray-400 hover:text-neon-red transition-colors flex-shrink-0"
            title="Cerrar Sesión"
          >
            <LogOut className="w-4 lg:w-5 h-4 lg:h-5" />
          </button>

          {/* Logout Button - Mobile */}
          <button 
            onClick={() => {
              localStorage.clear();
              window.location.replace('/login');
            }}
            className="lg:hidden p-2 text-gray-400 hover:text-neon-red transition-colors flex-shrink-0"
            title="Cerrar Sesión"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Mobile Resources Display */}
      <div className="md:hidden mt-4 pt-4 border-t border-space-600">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <ResourceDisplay 
              resources={selectedPlanet.resources} 
              showDebris={true} 
              compact={true} 
            />
          </div>
          
          {/* Mobile Dark Matter */}
          <div className="flex items-center space-x-2 px-2 py-1 bg-neon-purple/20 rounded border border-neon-purple/30 flex-shrink-0 ml-2">
            <Gem className="w-3 h-3 text-neon-purple" />
            <span className="text-neon-purple font-orbitron font-bold text-xs">
              {player.officers.darkMatter.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}