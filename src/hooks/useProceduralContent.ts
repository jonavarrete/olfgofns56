import { useState, useEffect } from 'react';
import { AlienRace, PvEMission } from '../types/game';
import { ProceduralGenerator } from '../utils/proceduralGeneration';
import { alienRaces as staticAlienRaces } from '../data/alienRaces';
import { pveMissions as staticPvEMissions } from '../data/pveMissions';

export function useProceduralContent() {
  const [discoveredRaces, setDiscoveredRaces] = useState<AlienRace[]>(staticAlienRaces);
  const [availableMissions, setAvailableMissions] = useState<PvEMission[]>(staticPvEMissions);
  const [totalRacesEncountered, setTotalRacesEncountered] = useState(0);

  // Generate new races periodically
  useEffect(() => {
    const generateNewRace = () => {
      const newRace = ProceduralGenerator.generateAlienRace();
      setDiscoveredRaces(prev => {
        // Check if we already have too many races
        if (prev.length >= 50) return prev;
        return [...prev, newRace];
      });
      setTotalRacesEncountered(prev => prev + 1);
    };

    // Generate initial races
    const initialRaces = Array.from({ length: 3 }, () => ProceduralGenerator.generateAlienRace());
    setDiscoveredRaces(prev => [...prev, ...initialRaces]);
    setTotalRacesEncountered(initialRaces.length + staticAlienRaces.length);

    // Generate new race every 5 minutes
    const raceInterval = setInterval(generateNewRace, 300000);

    return () => clearInterval(raceInterval);
  }, []);

  // Generate new missions periodically
  useEffect(() => {
    const generateNewMission = () => {
      const sources = ['system', 'alien', 'neutral'] as const;
      const source = sources[Math.floor(Math.random() * sources.length)];
      
      let alienRace: AlienRace | undefined;
      if (source === 'alien') {
        const availableRaces = discoveredRaces.filter(r => r.discovered);
        if (availableRaces.length > 0) {
          alienRace = availableRaces[Math.floor(Math.random() * availableRaces.length)];
        }
      }

      const newMission = ProceduralGenerator.generatePvEMission(source, alienRace);
      
      setAvailableMissions(prev => {
        // Remove old completed missions and add new one
        const activeMissions = prev.filter(m => 
          m.status !== 'completed' || 
          (Date.now() - (m.lastCompleted || 0)) < 86400000 * 7 // Keep completed missions for 7 days
        );
        
        // Limit total missions
        if (activeMissions.length >= 20) {
          activeMissions.shift(); // Remove oldest
        }
        
        return [...activeMissions, newMission];
      });
    };

    // Generate initial missions
    const initialMissions = Array.from({ length: 2 }, () => {
      const sources = ['system', 'neutral'] as const;
      const source = sources[Math.floor(Math.random() * sources.length)];
      return ProceduralGenerator.generatePvEMission(source);
    });
    setAvailableMissions(prev => [...prev, ...initialMissions]);

    // Generate new mission every 2 minutes
    const missionInterval = setInterval(generateNewMission, 120000);

    return () => clearInterval(missionInterval);
  }, [discoveredRaces]);

  const discoverRace = (raceId: string) => {
    setDiscoveredRaces(prev => 
      prev.map(race => 
        race.id === raceId 
          ? { ...race, discovered: true, discoveryDate: Date.now() }
          : race
      )
    );
  };

  const completeMission = (missionId: string) => {
    setAvailableMissions(prev =>
      prev.map(mission =>
        mission.id === missionId
          ? { ...mission, status: 'completed' as const, lastCompleted: Date.now() }
          : mission
      )
    );
  };

  const startMission = (missionId: string) => {
    setAvailableMissions(prev =>
      prev.map(mission =>
        mission.id === missionId
          ? { ...mission, status: 'active' as const, progress: 0 }
          : mission
      )
    );

    // Simulate mission progress
    const progressInterval = setInterval(() => {
      setAvailableMissions(prev =>
        prev.map(mission => {
          if (mission.id === missionId && mission.status === 'active') {
            const newProgress = Math.min(100, mission.progress + Math.random() * 10 + 5);
            if (newProgress >= 100) {
              clearInterval(progressInterval);
              return { ...mission, status: 'completed' as const, progress: 100, lastCompleted: Date.now() };
            }
            return { ...mission, progress: newProgress };
          }
          return mission;
        })
      );
    }, 5000); // Update every 5 seconds
  };

  return {
    discoveredRaces,
    availableMissions,
    totalRacesEncountered,
    discoverRace,
    completeMission,
    startMission: startMission,
  };
}