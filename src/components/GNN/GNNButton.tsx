import React from 'react';
import { Radio } from 'lucide-react';

interface GNNButtonProps {
  unreadCount: number;
  onClick: () => void;
  hasBreakingNews?: boolean;
}

export default function GNNButton({ unreadCount, onClick, hasBreakingNews = false }: GNNButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative p-2 text-gray-400 hover:text-white transition-all duration-200 group"
      title="Galactic News Network"
    >
      <div className={`relative ${hasBreakingNews ? 'animate-pulse' : ''}`}>
        <Radio className={`w-5 h-5 transition-colors ${
          hasBreakingNews ? 'text-neon-red' : 'group-hover:text-neon-blue'
        }`} />
        
        {/* Signal waves animation */}
        <div className="absolute -inset-1">
          <div className={`absolute inset-0 rounded-full border-2 border-current opacity-20 animate-ping ${
            hasBreakingNews ? 'text-neon-red' : 'text-neon-blue'
          }`} style={{ animationDuration: '2s' }} />
          <div className={`absolute inset-0 rounded-full border border-current opacity-40 animate-ping ${
            hasBreakingNews ? 'text-neon-red' : 'text-neon-blue'
          }`} style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
        </div>
      </div>
      
      {/* Unread count badge */}
      {unreadCount > 0 && (
        <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-rajdhani font-bold text-white ${
          hasBreakingNews ? 'bg-neon-red animate-pulse' : 'bg-neon-blue'
        }`}>
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
      
      {/* Breaking news indicator */}
      {hasBreakingNews && (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
          <div className="w-1 h-1 bg-neon-red rounded-full animate-pulse"></div>
        </div>
      )}
    </button>
  );
}