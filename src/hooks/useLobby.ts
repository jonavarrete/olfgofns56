import { useState, useEffect } from 'react';
import { Universe } from '../types/auth';

interface LobbyState {
  universes: Universe[];
  selectedUniverse: Universe | null;
  loading: boolean;
  error: string | null;
}

const mockUniverses: Universe[] = [
  {
    id: 'universe_1',
    name: 'Galaxia Prima',
    description: 'El universo principal con velocidad estándar y todas las características habilitadas.',
    type: 'standard',
    speed: 1,
    maxPlayers: 5000,
    currentPlayers: 3247,
    status: 'active',
    startDate: Date.now() - 86400000 * 180, // 6 months ago
    features: [
      { id: 'alliances', name: 'Alianzas', description: 'Sistema completo de alianzas', icon: 'users', enabled: true },
      { id: 'officers', name: 'Oficiales', description: 'Sistema de oficiales premium', icon: 'crown', enabled: true },
      { id: 'expeditions', name: 'Expediciones', description: 'Misiones de exploración', icon: 'rocket', enabled: true },
      { id: 'acs', name: 'ACS', description: 'Ataques coordinados', icon: 'sword', enabled: true },
      { id: 'trade', name: 'Comercio', description: 'Sistema de comercio avanzado', icon: 'package', enabled: true },
    ],
    playerData: {
      hasAccount: true,
      rank: 42,
      points: 89567,
      lastActive: Date.now() - 86400000 * 2
    }
  },
  {
    id: 'universe_2',
    name: 'Nebulosa Veloce',
    description: 'Universo de alta velocidad para partidas rápidas e intensas.',
    type: 'speed',
    speed: 5,
    maxPlayers: 2000,
    currentPlayers: 1834,
    status: 'active',
    startDate: Date.now() - 86400000 * 45, // 1.5 months ago
    features: [
      { id: 'alliances', name: 'Alianzas', description: 'Sistema completo de alianzas', icon: 'users', enabled: true },
      { id: 'officers', name: 'Oficiales', description: 'Sistema de oficiales premium', icon: 'crown', enabled: false },
      { id: 'expeditions', name: 'Expediciones', description: 'Misiones de exploración', icon: 'rocket', enabled: true },
      { id: 'acs', name: 'ACS', description: 'Ataques coordinados', icon: 'sword', enabled: true },
      { id: 'trade', name: 'Comercio', description: 'Sistema de comercio básico', icon: 'package', enabled: true },
    ],
    playerData: {
      hasAccount: false
    }
  },
  {
    id: 'universe_3',
    name: 'Sector Pacífico',
    description: 'Universo enfocado en construcción y comercio, con combate limitado.',
    type: 'peaceful',
    speed: 2,
    maxPlayers: 3000,
    currentPlayers: 2156,
    status: 'active',
    startDate: Date.now() - 86400000 * 90, // 3 months ago
    features: [
      { id: 'alliances', name: 'Alianzas', description: 'Sistema completo de alianzas', icon: 'users', enabled: true },
      { id: 'officers', name: 'Oficiales', description: 'Sistema de oficiales premium', icon: 'crown', enabled: true },
      { id: 'expeditions', name: 'Expediciones', description: 'Misiones de exploración', icon: 'rocket', enabled: true },
      { id: 'acs', name: 'ACS', description: 'Ataques coordinados', icon: 'sword', enabled: false },
      { id: 'trade', name: 'Comercio', description: 'Sistema de comercio avanzado', icon: 'package', enabled: true },
      { id: 'peaceful_mode', name: 'Modo Pacífico', description: 'Protección para nuevos jugadores', icon: 'shield', enabled: true },
    ],
    playerData: {
      hasAccount: false
    }
  },
  {
    id: 'universe_4',
    name: 'Abismo Hardcore',
    description: 'Para comandantes veteranos. Sin protección, máxima dificultad.',
    type: 'hardcore',
    speed: 3,
    maxPlayers: 1000,
    currentPlayers: 789,
    status: 'active',
    startDate: Date.now() - 86400000 * 30, // 1 month ago
    features: [
      { id: 'alliances', name: 'Alianzas', description: 'Sistema completo de alianzas', icon: 'users', enabled: true },
      { id: 'officers', name: 'Oficiales', description: 'Sistema de oficiales premium', icon: 'crown', enabled: true },
      { id: 'expeditions', name: 'Expediciones', description: 'Misiones de exploración', icon: 'rocket', enabled: true },
      { id: 'acs', name: 'ACS', description: 'Ataques coordinados', icon: 'sword', enabled: true },
      { id: 'trade', name: 'Comercio', description: 'Sistema de comercio limitado', icon: 'package', enabled: true },
      { id: 'hardcore_mode', name: 'Modo Hardcore', description: 'Sin protección, pérdidas permanentes', icon: 'skull', enabled: true },
    ],
    playerData: {
      hasAccount: false
    }
  },
  {
    id: 'universe_5',
    name: 'Nueva Frontera',
    description: 'Universo recién abierto. ¡Sé uno de los primeros colonizadores!',
    type: 'standard',
    speed: 2,
    maxPlayers: 4000,
    currentPlayers: 234,
    status: 'new',
    startDate: Date.now() - 86400000 * 3, // 3 days ago
    features: [
      { id: 'alliances', name: 'Alianzas', description: 'Sistema completo de alianzas', icon: 'users', enabled: true },
      { id: 'officers', name: 'Oficiales', description: 'Sistema de oficiales premium', icon: 'crown', enabled: true },
      { id: 'expeditions', name: 'Expediciones', description: 'Misiones de exploración', icon: 'rocket', enabled: true },
      { id: 'acs', name: 'ACS', description: 'Ataques coordinados', icon: 'sword', enabled: true },
      { id: 'trade', name: 'Comercio', description: 'Sistema de comercio avanzado', icon: 'package', enabled: true },
      { id: 'newbie_protection', name: 'Protección Inicial', description: 'Protección extendida para nuevos jugadores', icon: 'shield', enabled: true },
    ],
    playerData: {
      hasAccount: false
    }
  },
  {
    id: 'universe_6',
    name: 'Legado Ancestral',
    description: 'Universo veterano próximo a finalizar. Únete a las batallas finales.',
    type: 'standard',
    speed: 1,
    maxPlayers: 5000,
    currentPlayers: 1456,
    status: 'ending',
    startDate: Date.now() - 86400000 * 365, // 1 year ago
    endDate: Date.now() + 86400000 * 30, // Ends in 30 days
    features: [
      { id: 'alliances', name: 'Alianzas', description: 'Sistema completo de alianzas', icon: 'users', enabled: true },
      { id: 'officers', name: 'Oficiales', description: 'Sistema de oficiales premium', icon: 'crown', enabled: true },
      { id: 'expeditions', name: 'Expediciones', description: 'Misiones de exploración', icon: 'rocket', enabled: true },
      { id: 'acs', name: 'ACS', description: 'Ataques coordinados', icon: 'sword', enabled: true },
      { id: 'trade', name: 'Comercio', description: 'Sistema de comercio avanzado', icon: 'package', enabled: true },
      { id: 'endgame_events', name: 'Eventos Finales', description: 'Eventos especiales de fin de universo', icon: 'star', enabled: true },
    ],
    playerData: {
      hasAccount: false
    }
  }
];

export function useLobby() {
  const [state, setState] = useState<LobbyState>({
    universes: [],
    selectedUniverse: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    loadUniverses();
  }, []);

  const loadUniverses = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setState(prev => ({
        ...prev,
        universes: mockUniverses,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Error al cargar los universos'
      }));
    }
  };

  const selectUniverse = (universe: Universe) => {
    setState(prev => ({ ...prev, selectedUniverse: universe }));
  };

  const joinUniverse = async (universeId: string) => {
    const universe = state.universes.find(u => u.id === universeId);
    if (!universe) throw new Error('Universo no encontrado');

    // Save selected universe
    localStorage.setItem('selected_universe', universeId);
    
    // In a real app, this would make an API call to join the universe
    // For now, we'll just simulate the process
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const refreshUniverses = () => {
    loadUniverses();
  };

  return {
    state,
    selectUniverse,
    joinUniverse,
    refreshUniverses
  };
}