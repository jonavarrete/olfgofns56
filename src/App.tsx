import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import SpaceBackground from './components/UI/SpaceBackground';
import Dashboard from './pages/Dashboard';
import Buildings from './pages/Buildings';
import Research from './pages/Research';
import Shipyard from './pages/Shipyard';
import Fleet from './pages/Fleet';
import Galaxy from './pages/Galaxy';
import Simulator from './pages/Simulator';
import Rankings from './pages/Rankings';
import Alliance from './pages/Alliance';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import GalacticGuide from './pages/GalacticGuide';
import PvEMissions from './pages/PvEMissions';

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="min-h-screen bg-space-gradient text-white relative">
          <SpaceBackground />
          <div className="flex relative z-10">
            <Sidebar />
            <div className="flex-1 relative">
              <Header />
              <main className="p-6 relative">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/buildings" element={<Buildings />} />
                  <Route path="/research" element={<Research />} />
                  <Route path="/shipyard" element={<Shipyard />} />
                  <Route path="/fleet" element={<Fleet />} />
                  <Route path="/galaxy" element={<Galaxy />} />
                  <Route path="/simulator" element={<Simulator />} />
                  <Route path="/pve-missions" element={<PvEMissions />} />
                  <Route path="/guide" element={<GalacticGuide />} />
                  <Route path="/rankings" element={<Rankings />} />
                  <Route path="/alliance" element={<Alliance />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </main>
            </div>
          </div>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;