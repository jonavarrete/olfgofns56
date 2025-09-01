import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { GameProvider } from './context/GameContext';
import Login from './pages/Login';
import Lobby from './pages/Lobby';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import SpaceBackground from './components/UI/SpaceBackground';
import Dashboard from './pages/Dashboard';
import Empire from './pages/Empire';
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
import Trade from './pages/Trade';
import Officers from './pages/Officers';
import TechnologyTree from './pages/TechnologyTree';
import ResourceCalculator from './pages/ResourceCalculator';
import { Rocket} from 'lucide-react';

// Componente para proteger rutas que requieren autenticación
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { state } = useAuth();
  const { user, isAuthenticated, loading } = state;
  
  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-space-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-neon-blue/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
            <Rocket className="w-8 h-8 text-neon-blue animate-float" />
          </div>
          <p className="text-gray-400 font-rajdhani">Verificando autenticación...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

// Game wrapper component that checks for universe selection
function GameWrapper() {
  const { state } = useAuth();
  const { user } = state;
  const selectedUniverse = localStorage.getItem('selected_universe');
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (!selectedUniverse) {
    return <Navigate to="/lobby" replace />;
  }

  return (
    <GameProvider>
      <div className="min-h-screen bg-space-gradient text-white relative">
        <SpaceBackground />
        <div className="flex relative z-10">
          <Sidebar />
          <div className="flex-1 relative">
            <Header />
            <main className="p-6 relative">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/empire" element={<Empire />} />
                <Route path="/buildings" element={<Buildings />} />
                <Route path="/research" element={<Research />} />
                <Route path="/shipyard" element={<Shipyard />} />
                <Route path="/fleet" element={<Fleet />} />
                <Route path="/officers" element={<Officers />} />
                <Route path="/galaxy" element={<Galaxy />} />
                <Route path="/trade" element={<Trade />} />
                <Route path="/resource-calculator" element={<ResourceCalculator />} />
                <Route path="/technology-tree" element={<TechnologyTree />} />
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
    </GameProvider>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/lobby" element={
            <AuthGuard>
              <Lobby />
            </AuthGuard>
          } />
          <Route path="/*" element={
            <AuthGuard>
              <GameWrapper />
            </AuthGuard>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;