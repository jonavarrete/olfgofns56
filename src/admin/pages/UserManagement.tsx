import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminCard from '../components/AdminCard';
import Button from '../../components/UI/Button';
import UserEditor from '../components/UserEditor';
import UserTimeline from '../components/UserTimeline';
import PlanetManager from '../components/PlanetManager';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Ban,
  UserX,
  Shield,
  Clock,
  Globe,
  Mail,
  AlertTriangle,
  CheckCircle,
  MoreVertical,
  Download,
  Upload
} from 'lucide-react';
import { PlayerAccount } from '../../types/admin';

export default function UserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<PlayerAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'banned' | 'suspended'>('all');
  const [selectedUser, setSelectedUser] = useState<PlayerAccount | null>(null);
  const [showUserEditor, setShowUserEditor] = useState(false);
  const [showUserTimeline, setShowUserTimeline] = useState(false);
  const [showPlanetManager, setShowPlanetManager] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUsers: PlayerAccount[] = [
        {
          id: '1',
          email: 'player1@galaxy.com',
          username: 'SpaceCommander',
          universeId: 'universe_1',
          level: 25,
          experience: 156890,
          rank: 42,
          points: 89567,
          alliance: 'Galactic Federation',
          planets: [],
          resources: { metal: 150000, crystal: 75000, deuterium: 25000, energy: 12000, darkMatter: 1250 },
          research: {} as any,
          fleet: {} as any,
          officers: { darkMatter: 1250, officers: [] },
          status: 'active',
          createdAt: Date.now() - 86400000 * 30,
          lastLogin: Date.now() - 3600000,
          ipAddress: '192.168.1.100',
          violations: [],
          timeline: []
        },
        {
          id: '2',
          email: 'cheater@galaxy.com',
          username: 'SpaceHacker',
          universeId: 'universe_1',
          level: 15,
          experience: 45000,
          rank: 156,
          points: 23456,
          planets: [],
          resources: { metal: 50000, crystal: 25000, deuterium: 10000, energy: 5000, darkMatter: 0 },
          research: {} as any,
          fleet: {} as any,
          officers: { darkMatter: 0, officers: [] },
          status: 'banned',
          createdAt: Date.now() - 86400000 * 15,
          lastLogin: Date.now() - 86400000 * 3,
          ipAddress: '192.168.1.200',
          violations: [
            {
              id: 'v1',
              type: 'cheating',
              description: 'Uso de bots para automatizar construcción',
              severity: 'severe',
              reportedBy: 'AutoDetection',
              reportedAt: Date.now() - 86400000 * 3,
              status: 'resolved'
            }
          ],
          timeline: []
        }
      ];
      
      setUsers(mockUsers);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: PlayerAccount['status']) => {
    switch (status) {
      case 'active': return 'text-neon-green';
      case 'banned': return 'text-neon-red';
      case 'suspended': return 'text-neon-orange';
      case 'vacation': return 'text-neon-blue';
      default: return 'text-gray-400';
    }
  };

  const getStatusText = (status: PlayerAccount['status']) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'banned': return 'Baneado';
      case 'suspended': return 'Suspendido';
      case 'vacation': return 'Vacaciones';
      default: return 'Desconocido';
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    return 'Ahora';
  };

  const handleUserAction = (action: string, user: PlayerAccount) => {
    setSelectedUser(user);
    
    switch (action) {
      case 'edit':
        setShowUserEditor(true);
        break;
      case 'timeline':
        setShowUserTimeline(true);
        break;
      case 'ban':
        // Handle ban logic
        break;
      case 'suspend':
        // Handle suspend logic
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            Gestión de Usuarios
          </h1>
          <p className="text-gray-400 font-rajdhani mt-1">
            Administrar cuentas de jugadores y configuraciones
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="secondary" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button 
            variant="primary" 
            onClick={() => navigate('/admin/users/create')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Crear Usuario
          </Button>
        </div>
      </div>

      {/* Filters */}
      <AdminCard title="Filtros y Búsqueda" icon={Filter} color="neon-blue">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por usuario o email..."
              className="w-full pl-10 pr-4 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="banned">Baneados</option>
            <option value="suspended">Suspendidos</option>
          </select>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">
              {filteredUsers.length} de {users.length} usuarios
            </span>
          </div>
        </div>
      </AdminCard>

      {/* Users Table */}
      <AdminCard title="Lista de Usuarios" icon={Users} color="neon-purple">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center space-x-4 p-4">
                  <div className="w-10 h-10 bg-space-600 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-space-600 rounded w-1/4"></div>
                    <div className="h-3 bg-space-600 rounded w-1/2"></div>
                  </div>
                  <div className="w-20 h-8 bg-space-600 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-space-600">
                  <th className="text-left py-3 px-4 text-sm font-rajdhani font-semibold text-gray-400">Usuario</th>
                  <th className="text-left py-3 px-4 text-sm font-rajdhani font-semibold text-gray-400">Estado</th>
                  <th className="text-left py-3 px-4 text-sm font-rajdhani font-semibold text-gray-400">Universo</th>
                  <th className="text-left py-3 px-4 text-sm font-rajdhani font-semibold text-gray-400">Nivel</th>
                  <th className="text-left py-3 px-4 text-sm font-rajdhani font-semibold text-gray-400">Última Conexión</th>
                  <th className="text-left py-3 px-4 text-sm font-rajdhani font-semibold text-gray-400">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-space-600/50 hover:bg-space-700/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-neon-blue/20 rounded-full flex items-center justify-center">
                          <span className="text-xs font-orbitron font-bold text-neon-blue">
                            {user.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-rajdhani font-medium text-white">
                            {user.username}
                          </p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${getStatusColor(user.status)} bg-current/10`}>
                        {getStatusText(user.status)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-300">
                        {user.universeId}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-center">
                        <p className="text-sm font-orbitron font-bold text-white">
                          {user.level}
                        </p>
                        <p className="text-xs text-gray-400">Rango #{user.rank}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-400">
                        {formatTimeAgo(user.lastLogin)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleUserAction('edit', user)}
                          className="p-1 text-gray-400 hover:text-neon-blue transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleUserAction('timeline', user)}
                          className="p-1 text-gray-400 hover:text-neon-green transition-colors"
                          title="Timeline"
                        >
                          <Clock className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowPlanetManager(true);
                          }}
                          className="p-1 text-gray-400 hover:text-neon-purple transition-colors"
                          title="Gestionar Planetas"
                        >
                          <Globe className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleUserAction('ban', user)}
                          className="p-1 text-gray-400 hover:text-neon-red transition-colors"
                          title="Banear"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>

      {/* User Editor Modal */}
      {showUserEditor && selectedUser && (
        <UserEditor
          user={selectedUser}
          onClose={() => {
            setShowUserEditor(false);
            setSelectedUser(null);
          }}
          onSave={(updatedUser) => {
            setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
            setShowUserEditor(false);
            setSelectedUser(null);
          }}
        />
      )}

      {/* User Timeline Modal */}
      {showUserTimeline && selectedUser && (
        <UserTimeline
          user={selectedUser}
          onClose={() => {
            setShowUserTimeline(false);
            setSelectedUser(null);
          }}
        />
      )}

      {/* Planet Manager Modal */}
      {showPlanetManager && selectedUser && (
        <PlanetManager
          userId={selectedUser.id}
          planets={selectedUser.planets}
          onSave={(planets) => {
            setUsers(prev => prev.map(u => 
              u.id === selectedUser.id ? { ...u, planets } : u
            ));
            setShowPlanetManager(false);
            setSelectedUser(null);
          }}
          onClose={() => {
            setShowPlanetManager(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}