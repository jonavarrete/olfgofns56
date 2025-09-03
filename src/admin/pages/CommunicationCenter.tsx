import React, { useState } from 'react';
import AdminCard from '../components/AdminCard';
import Button from '../../components/UI/Button';
import GlobalMessageCreator from '../components/GlobalMessageCreator';
import { 
  MessageSquare, 
  Mail, 
  Bot, 
  Radio,
  Send,
  Users,
  Globe,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { GlobalMessage } from '../../types/admin';

type CommunicationTab = 'messages' | 'email' | 'telegram' | 'templates';

export default function CommunicationCenter() {
  const [activeTab, setActiveTab] = useState<CommunicationTab>('messages');
  const [showMessageCreator, setShowMessageCreator] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState<GlobalMessage[]>([]);
  const [editingMessage, setEditingMessage] = useState<GlobalMessage | null>(null);
  const [viewingMessage, setViewingMessage] = useState<GlobalMessage | null>(null);

  React.useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    // Load mock messages
    const mockMessages: GlobalMessage[] = [
      {
        id: 'msg_1',
        title: 'Mantenimiento Programado del Servidor',
        content: 'El servidor estará en mantenimiento el próximo domingo de 02:00 a 06:00 GMT.',
        type: 'maintenance',
        priority: 'high',
        targetAudience: 'all',
        sentAt: Date.now() - 86400000,
        sentBy: 'admin_1',
        status: 'sent',
        readBy: []
      },
      {
        id: 'msg_2',
        title: 'Nuevo Evento: Portal Dimensional',
        content: 'Un portal dimensional se ha abierto en todos los universos.',
        type: 'event',
        priority: 'medium',
        targetAudience: 'all',
        sentAt: Date.now() - 86400000 * 2,
        sentBy: 'admin_1',
        status: 'sent',
        readBy: []
      }
    ];
    setMessages(mockMessages);
  };

  const tabs = [
    { id: 'messages', name: 'Mensajes Globales', icon: MessageSquare, count: 45 },
    { id: 'email', name: 'Email Masivo', icon: Mail, count: 12 },
    { id: 'telegram', name: 'Bot Telegram', icon: Bot, count: 8 },
    { id: 'templates', name: 'Plantillas', icon: Radio, count: 23 },
  ];

  const getMessageTypeColor = (type: GlobalMessage['type']) => {
    switch (type) {
      case 'announcement': return 'text-neon-blue bg-neon-blue/10 border-neon-blue/30';
      case 'maintenance': return 'text-neon-orange bg-neon-orange/10 border-neon-orange/30';
      case 'event': return 'text-neon-purple bg-neon-purple/10 border-neon-purple/30';
      case 'warning': return 'text-neon-red bg-neon-red/10 border-neon-red/30';
      case 'celebration': return 'text-neon-green bg-neon-green/10 border-neon-green/30';
      default: return 'text-gray-400 bg-space-700/30 border-space-600';
    }
  };

  const getStatusColor = (status: GlobalMessage['status']) => {
    switch (status) {
      case 'sent': return 'text-neon-green';
      case 'scheduled': return 'text-neon-blue';
      case 'draft': return 'text-gray-400';
      case 'expired': return 'text-neon-red';
      default: return 'text-gray-400';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            Centro de Comunicación
          </h1>
          <p className="text-gray-400 font-rajdhani mt-1">
            Gestionar comunicaciones masivas y notificaciones
          </p>
        </div>
        
        <Button 
          variant="primary"
          onClick={() => setShowMessageCreator(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Crear Mensaje
        </Button>
      </div>

      {/* Communication Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AdminCard
          title="Mensajes Enviados"
          value="1.2K"
          icon={MessageSquare}
          color="neon-blue"
          subtitle="Últimos 30 días"
        />
        
        <AdminCard
          title="Emails Enviados"
          value="5.6K"
          icon={Mail}
          color="neon-green"
          subtitle="Tasa apertura: 78%"
        />
        
        <AdminCard
          title="Usuarios Telegram"
          value="892"
          icon={Bot}
          color="neon-purple"
          subtitle="Activos: 645"
        />
        
        <AdminCard
          title="Plantillas"
          value="23"
          icon={Radio}
          color="neon-orange"
          subtitle="Más usada: Mantenimiento"
        />
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-space-700/50 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as CommunicationTab)}
            className={`flex items-center space-x-2 flex-1 py-3 px-4 rounded-md font-rajdhani font-medium transition-all duration-200 ${
              activeTab === tab.id 
                ? 'bg-neon-blue text-white shadow-lg' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.name}</span>
            <span className="px-2 py-0.5 bg-current/20 rounded-full text-xs">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <AdminCard 
        title={tabs.find(t => t.id === activeTab)?.name || 'Comunicación'} 
        icon={tabs.find(t => t.id === activeTab)?.icon || MessageSquare} 
        color="neon-blue"
      >
        {activeTab === 'messages' && (
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar mensajes..."
                  className="w-full pl-10 pr-4 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                />
              </div>
              
              <select className="px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none">
                <option value="all">Todos los estados</option>
                <option value="sent">Enviados</option>
                <option value="scheduled">Programados</option>
                <option value="draft">Borradores</option>
              </select>
            </div>

            {/* Messages List */}
<div className="space-y-3">
  {messages.map((message, index) => (
    <div key={message.id} className="flex items-center space-x-4 p-4 bg-space-700/30 rounded-lg border border-space-600 hover:border-neon-blue/30 transition-colors">
      <div className={`p-2 rounded border ${getMessageTypeColor(message.type)}`}>
        <MessageSquare className="w-4 h-4" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-rajdhani font-semibold text-white">
              {message.title}
            </h4>
            <p className="text-sm text-gray-400">
              Dirigido a: {message.targetAudience === 'all' ? 'Todos los usuarios' : message.targetAudience}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${getStatusColor(message.status)}`}>
              {message.status === 'sent' ? 'ENVIADO' : 
               message.status === 'scheduled' ? 'PROGRAMADO' : 
               message.status === 'draft' ? 'BORRADOR' : 
               'EXPIRADO'}
            </span>
            <button className="p-1 text-gray-400 hover:text-neon-blue transition-colors">
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-1 text-gray-400 hover:text-neon-orange transition-colors">
              <Edit className="w-4 h-4" />
            </button>
            <button className="p-1 text-gray-400 hover:text-neon-red transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
          <span>Creado hace {formatTimeAgo(message.sentAt)}</span>
          <span>Leído por: {message.readBy.length} usuarios</span>
          <span>Tipo: {message.type}</span>
        </div>
      </div>
    </div>
  ))}
</div>
          </div>
        )}

        {/* Other tabs content would go here */}
        {activeTab !== 'messages' && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-space-600 rounded-full flex items-center justify-center mx-auto mb-4">
              {React.createElement(tabs.find(t => t.id === activeTab)?.icon || MessageSquare, {
                className: "w-8 h-8 text-gray-400"
              })}
            </div>
            <h3 className="text-lg font-rajdhani font-semibold text-gray-400 mb-2">
              {tabs.find(t => t.id === activeTab)?.name} - En Desarrollo
            </h3>
            <p className="text-gray-500">
              Esta funcionalidad estará disponible próximamente
            </p>
          </div>
        )}
      </AdminCard>

      {/* Global Message Creator Modal */}
      {showMessageCreator && (
        <GlobalMessageCreator
          message={editingMessage}
          onClose={() => setShowMessageCreator(false)}
          onSave={(message) => {
            if (editingMessage) {
              setMessages(prev => prev.map(m => m.id === editingMessage.id ? { ...m, ...message } : m));
            } else {
              const newMessage: GlobalMessage = {
                id: Date.now().toString(),
                                ...message,
                readBy: []
              };
              setMessages(prev => [newMessage, ...prev]);
            }
            setShowMessageCreator(false);
            setEditingMessage(null);
          }}
        />
      )}

      {/* Message Viewer Modal */}
      {viewingMessage && (
        <MessageViewer
          message={viewingMessage}
          onClose={() => setViewingMessage(null)}
          onEdit={() => {
            setEditingMessage(viewingMessage);
            setViewingMessage(null);
            setShowMessageCreator(true);
          }}
        />
      )}
    </div>
  );
}

interface MessageViewerProps {
  message: GlobalMessage;
  onClose: () => void;
  onEdit: () => void;
}

function MessageViewer({ message, onClose, onEdit }: MessageViewerProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-space-600">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-orbitron font-bold text-white">
              {message.title}
            </h2>
            <div className="flex items-center space-x-3">
              <Button variant="secondary" onClick={onEdit}>
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-space-700/30 rounded border border-space-600">
              <span className="text-gray-400 text-sm">Tipo:</span>
              <p className="text-white mt-1 capitalize">{message.type}</p>
            </div>
            <div className="p-3 bg-space-700/30 rounded border border-space-600">
              <span className="text-gray-400 text-sm">Prioridad:</span>
              <p className="text-white mt-1 capitalize">{message.priority}</p>
            </div>
          </div>

          <div className="p-4 bg-space-700/30 rounded border border-space-600">
            <span className="text-gray-400 text-sm">Contenido:</span>
            <div className="mt-2 text-gray-300 whitespace-pre-wrap">
              {message.content}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-space-700/30 rounded border border-space-600">
              <span className="text-gray-400 text-sm">Enviado:</span>
              <p className="text-white mt-1">
                {message.sentAt ? new Date(message.sentAt).toLocaleString() : 'No enviado'}
              </p>
            </div>
            <div className="p-3 bg-space-700/30 rounded border border-space-600">
              <span className="text-gray-400 text-sm">Leído por:</span>
              <p className="text-white mt-1">{message.readBy.length} usuarios</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}