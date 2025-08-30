import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { ChevronDown, Globe, MapPin } from 'lucide-react';

export default function PlanetSelector() {
  const { state, selectPlanet } = useGame();
  const { player, selectedPlanet } = state;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-4 py-2 bg-space-700/50 rounded-lg border border-space-600 hover:border-neon-blue/50 transition-all duration-200"
      >
        <Globe className="w-5 h-5 text-neon-blue" />
        <div className="text-left">
          <p className="text-sm font-rajdhani font-medium text-white">
            {selectedPlanet.name}
          </p>
          <p className="text-xs text-gray-400">{selectedPlanet.coordinates}</p>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-80 bg-card-gradient border border-space-600 rounded-lg shadow-xl z-20 backdrop-blur-sm">
            <div className="relative p-4 border-b border-space-600">
              <h3 className="text-sm font-rajdhani font-medium text-white">
                Seleccionar Planeta
              </h3>
            </div>
            <div className="relative max-h-64 overflow-y-auto">
              {player.planets.map((planet) => (
                <button
                  key={planet.id}
                  onClick={() => {
                    selectPlanet(planet);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-space-600/50 transition-colors ${
                    selectedPlanet.id === planet.id ? 'bg-neon-blue/20' : ''
                  }`}
                >
                  <MapPin className="w-4 h-4 text-neon-blue" />
                  <div className="flex-1 text-left">
                    <p className="text-sm font-rajdhani font-medium text-white">
                      {planet.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {planet.coordinates} • {planet.usedFields}/{planet.fields} campos
                    </p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {planet.type === 'main' ? 'Principal' : 'Colonia'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}