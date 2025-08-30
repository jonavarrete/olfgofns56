import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import Card from '../components/UI/Card';
import { Trophy, TrendingUp, Users, Medal, Crown, Award } from 'lucide-react';

export default function Rankings() {
  const { state } = useGame();
  const { rankings, alliances } = state;
  const [selectedTab, setSelectedTab] = useState<'players' | 'alliances'>('players');

  const tabs = [
    { key: 'players' as const, name: 'Jugadores', icon: Trophy },
    { key: 'alliances' as const, name: 'Alianzas', icon: Users },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />;
    if (rank === 3) return <Award className="w-5 h-5 text-orange-400" />;
    return <span className="text-sm font-rajdhani font-bold text-gray-400">#{rank}</span>;
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank <= 10) return 'bg-neon-blue/20 text-neon-blue border-neon-blue/30';
    if (rank <= 50) return 'bg-neon-green/20 text-neon-green border-neon-green/30';
    if (rank <= 100) return 'bg-neon-orange/20 text-neon-orange border-neon-orange/30';
    return 'bg-space-600/50 text-gray-400 border-space-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            Rankings Galácticos
          </h1>
          <p className="text-gray-400 mt-1">
            Clasificación de los mejores comandantes del universo
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-space-800 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={`flex items-center space-x-2 flex-1 px-4 py-2 text-sm font-rajdhani font-medium rounded-md transition-all duration-200 ${
              selectedTab === tab.key
                ? 'bg-neon-blue text-white shadow-[0_0_10px_rgba(0,212,255,0.3)]'
                : 'text-gray-400 hover:text-white hover:bg-space-600'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {selectedTab === 'players' && (
        <Card title="Ranking de Jugadores" glowing>
          <div className="space-y-1">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 text-sm font-rajdhani font-medium text-gray-400 border-b border-space-600 pb-3">
              <div className="col-span-1">Rank</div>
              <div className="col-span-4">Jugador</div>
              <div className="col-span-2">Alianza</div>
              <div className="col-span-2">Puntos</div>
              <div className="col-span-2">Planetas</div>
              <div className="col-span-1">Tendencia</div>
            </div>

            {/* Rankings */}
            {rankings.map((player, index) => (
              <div
                key={player.id}
                className={`grid grid-cols-12 gap-4 py-3 rounded-lg transition-all duration-200 hover:bg-space-700/30 ${
                  player.rank <= 3 ? 'bg-gradient-to-r from-yellow-900/10 to-transparent' :
                  player.username === state.player.username ? 'bg-neon-blue/10 border border-neon-blue/30' : ''
                }`}
              >
                <div className="col-span-1 flex items-center">
                  {getRankIcon(player.rank)}
                </div>

                <div className="col-span-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-neon-blue/30 to-neon-purple/30 rounded-full flex items-center justify-center">
                      <span className="text-sm font-orbitron font-bold text-white">
                        {player.username.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className={`font-rajdhani font-semibold ${
                        player.username === state.player.username ? 'text-neon-blue' : 'text-white'
                      }`}>
                        {player.username}
                      </p>
                      <p className="text-xs text-gray-400">
                        Nivel {player.level}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-span-2">
                  {player.alliance ? (
                    <span className="px-2 py-1 bg-neon-purple/20 text-neon-purple rounded text-sm font-rajdhani font-medium">
                      {player.alliance}
                    </span>
                  ) : (
                    <span className="text-gray-500 text-sm">-</span>
                  )}
                </div>

                <div className="col-span-2">
                  <p className="text-lg font-orbitron font-bold text-white">
                    {player.points.toLocaleString()}
                  </p>
                </div>

                <div className="col-span-2">
                  <p className="text-sm font-rajdhani font-medium text-gray-300">
                    {player.planets?.length || 1} planetas
                  </p>
                </div>

                <div className="col-span-1 flex items-center">
                  <TrendingUp className={`w-4 h-4 ${
                    Math.random() > 0.5 ? 'text-neon-green' : 'text-neon-red rotate-180'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {selectedTab === 'alliances' && (
        <Card title="Ranking de Alianzas" glowing>
          <div className="space-y-1">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 text-sm font-rajdhani font-medium text-gray-400 border-b border-space-600 pb-3">
              <div className="col-span-1">Rank</div>
              <div className="col-span-4">Alianza</div>
              <div className="col-span-2">Tag</div>
              <div className="col-span-2">Puntos</div>
              <div className="col-span-2">Miembros</div>
              <div className="col-span-1">Promedio</div>
            </div>

            {/* Alliance Rankings */}
            {alliances.sort((a, b) => a.rank - b.rank).map((alliance) => (
              <div
                key={alliance.id}
                className={`grid grid-cols-12 gap-4 py-3 rounded-lg transition-all duration-200 hover:bg-space-700/30 ${
                  alliance.rank <= 3 ? 'bg-gradient-to-r from-purple-900/10 to-transparent' :
                  alliance.name === state.player.alliance ? 'bg-neon-purple/10 border border-neon-purple/30' : ''
                }`}
              >
                <div className="col-span-1 flex items-center">
                  {getRankIcon(alliance.rank)}
                </div>

                <div className="col-span-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-neon-purple/30 to-neon-blue/30 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-neon-purple" />
                    </div>
                    <div>
                      <p className={`font-rajdhani font-semibold ${
                        alliance.name === state.player.alliance ? 'text-neon-purple' : 'text-white'
                      }`}>
                        {alliance.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {alliance.description.substring(0, 40)}...
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-span-2">
                  <span className={`px-3 py-1 rounded-lg border font-rajdhani font-bold ${getRankBadgeColor(alliance.rank)}`}>
                    [{alliance.tag}]
                  </span>
                </div>

                <div className="col-span-2">
                  <p className="text-lg font-orbitron font-bold text-white">
                    {alliance.points.toLocaleString()}
                  </p>
                </div>

                <div className="col-span-2">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-rajdhani font-medium text-gray-300">
                      {alliance.members}
                    </span>
                  </div>
                </div>

                <div className="col-span-1">
                  <p className="text-sm font-rajdhani font-medium text-gray-300">
                    {Math.floor(alliance.points / alliance.members).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Player Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-neon-blue/20 rounded-lg">
              <Trophy className="w-6 h-6 text-neon-blue" />
            </div>
            <div>
              <p className="text-lg font-orbitron font-bold text-white">
                #{state.player.rank}
              </p>
              <p className="text-sm text-gray-400">Tu posición</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-neon-green/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-neon-green" />
            </div>
            <div>
              <p className="text-lg font-orbitron font-bold text-white">
                {state.player.points.toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">Puntos totales</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-neon-purple/20 rounded-lg">
              <Users className="w-6 h-6 text-neon-purple" />
            </div>
            <div>
              <p className="text-lg font-orbitron font-bold text-white">
                {state.player.alliance || 'Sin alianza'}
              </p>
              <p className="text-sm text-gray-400">Tu alianza</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-neon-orange/20 rounded-lg">
              <Award className="w-6 h-6 text-neon-orange" />
            </div>
            <div>
              <p className="text-lg font-orbitron font-bold text-white">
                {state.player.level}
              </p>
              <p className="text-sm text-gray-400">Nivel actual</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}