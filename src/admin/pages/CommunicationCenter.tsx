import React, { useState, useEffect } from 'react';
import AdminCard from '../components/AdminCard';
import Button from '../../components/UI/Button';
import GlobalMessageCreator from '../components/GlobalMessageCreator';
import EmailCampaignCreator from '../components/EmailCampaignCreator';
import EmailViewer from '../components/EmailViewer';
import TelegramBotManager from '../components/TelegramBotManager';
import TemplateEditor from '../components/TemplateEditor';
import { 
  MessageSquare, 
  Mail, 
  Bot, 
  FileText,
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
  AlertTriangle,
  X,
  Settings,
  Activity,
  TrendingUp,
  Zap,
  Copy,
  ExternalLink,
  BarChart3,
  Star,
  Target,
  MousePointer,
  RefreshCw
} from 'lucide-react';
import { GlobalMessage, AdminTemplate } from '../../types/admin';

type CommunicationTab = 'messages' | 'email' | 'telegram' | 'templates';

export default function CommunicationCenter() {
  const [activeTab, setActiveTab] = useState<CommunicationTab>('messages');
  const [showMessageCreator, setShowMessageCreator] = useState(false);
  const [showEmailCreator, setShowEmailCreator] = useState(false);
  const [showEmailViewer, setShowEmailViewer] = useState(false);
  const [showTelegramManager, setShowTelegramManager] = useState(false);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<AdminTemplate | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState<GlobalMessage[]>([]);
  const [emailCampaigns, setEmailCampaigns] = useState<any[]>([]);
  const [templates, setTemplates] = useState<AdminTemplate[]>([]);
  const [editingMessage, setEditingMessage] = useState<GlobalMessage | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'sent' | 'scheduled' | 'draft'>('all');
  const [filterType, setFilterType] = useState<'all' | AdminTemplate['type']>('all');

  useEffect(() => {
    loadMessages();
    loadEmailCampaigns();
    loadTemplates();
  }, []);

  const loadMessages = async () => {
    const mockMessages: GlobalMessage[] = [
      {
        id: 'msg_1',
        title: 'Mantenimiento Programado del Servidor',
        content: 'El servidor estará en mantenimiento el próximo domingo de 02:00 a 06:00 GMT. Durante este tiempo, el juego no estará disponible.\n\nActividades afectadas:\n• Acceso al juego\n• Funciones de alianza\n• Comercio entre jugadores\n\nLas construcciones y investigaciones en progreso continuarán normalmente.',
        type: 'maintenance',
        priority: 'high',
        targetAudience: 'all',
        sentAt: Date.now() - 86400000,
        sentBy: 'admin_1',
        status: 'sent',
        readBy: ['user1', 'user2', 'user3']
      },
      {
        id: 'msg_2',
        title: 'Nuevo Evento: Portal Dimensional',
        content: 'Un portal dimensional se ha abierto en todos los universos. Los comandantes pueden acceder a misiones especiales con recompensas únicas durante las próximas 72 horas.',
        type: 'event',
        priority: 'medium',
        targetAudience: 'all',
        sentAt: Date.now() - 86400000 * 2,
        sentBy: 'admin_1',
        status: 'sent',
        readBy: ['user1', 'user4']
      },
      {
        id: 'msg_3',
        title: 'Actualización de Seguridad v2.1',
        content: 'Hemos implementado nuevas medidas de seguridad para proteger las cuentas de los jugadores.',
        type: 'announcement',
        priority: 'medium',
        targetAudience: 'all',
        scheduledFor: Date.now() + 86400000,
        sentBy: 'admin_1',
        status: 'scheduled',
        readBy: []
      },
      {
        id: 'msg_4',
        title: 'Celebración del Primer Aniversario',
        content: 'Galactic Empire cumple un año. Eventos especiales y bonificaciones durante toda la semana.',
        type: 'celebration',
        priority: 'high',
        targetAudience: 'all',
        sentBy: 'admin_1',
        status: 'draft',
        readBy: []
      }
    ];
    setMessages(mockMessages);
  };

  const loadEmailCampaigns = async () => {
    const mockCampaigns = [
      {
        id: 'email_1',
        name: 'Bienvenida Nuevos Usuarios',
        subject: '¡Bienvenido a Galactic Empire, {{username}}!',
        content: 'Hola {{username}},\n\n¡Bienvenido a Galactic Empire! Tu aventura galáctica comienza ahora.\n\nPrimeros pasos:\n1. Explora tu planeta inicial\n2. Construye tu primera mina\n3. Únete a una alianza\n\nQue la fuerza te acompañe en tu conquista del universo.\n\nEl Equipo de Galactic Empire',
        targetAudience: 'new_users',
        status: 'active',
        sentCount: 2345,
        openRate: 78.5,
        clickRate: 45.2,
        createdAt: Date.now() - 86400000 * 30,
        lastSent: Date.now() - 3600000
      },
      {
        id: 'email_2',
        name: 'Evento Portal Dimensional',
        subject: '🌌 ¡Portal Dimensional Abierto! Recompensas Épicas Te Esperan',
        content: 'Comandante {{username}},\n\nUn portal dimensional se ha abierto en {{universe}}. Esta es tu oportunidad de obtener:\n\n🎁 Tecnología alienígena avanzada\n💎 Recursos premium\n🚀 Naves experimentales\n\nEl portal estará abierto solo 72 horas. ¡No pierdas esta oportunidad única!\n\n[JUGAR AHORA] → {{game_url}}\n\nConquista las estrellas,\nGalactic Empire',
        targetAudience: 'all',
        status: 'sent',
        sentCount: 47892,
        openRate: 82.3,
        clickRate: 56.7,
        createdAt: Date.now() - 86400000 * 7,
        lastSent: Date.now() - 86400000 * 2
      },
      {
        id: 'email_3',
        name: 'Mantenimiento Programado',
        subject: '⚠️ Mantenimiento del Servidor - {{date}}',
        content: 'Estimado Comandante {{username}},\n\nTe informamos que realizaremos un mantenimiento programado:\n\n📅 Fecha: {{maintenance_date}}\n⏰ Hora: {{maintenance_time}}\n⌛ Duración: {{duration}} horas\n\nDurante este tiempo:\n• El juego no estará disponible\n• Las construcciones e investigaciones continuarán\n• Tus datos están completamente seguros\n\nGracias por tu comprensión.\n\nEquipo Técnico de Galactic Empire',
        targetAudience: 'all',
        status: 'scheduled',
        scheduledFor: Date.now() + 86400000,
        sentCount: 0,
        openRate: 0,
        clickRate: 0,
        createdAt: Date.now() - 86400000 * 2
      }
    ];
    setEmailCampaigns(mockCampaigns);
  };

  const loadTemplates = async () => {
    const mockTemplates: AdminTemplate[] = [
      {
        id: '1',
        name: 'Mensaje de Mantenimiento',
        type: 'message',
        content: {
          title: 'Mantenimiento Programado',
          content: 'El servidor estará en mantenimiento desde {{start_time}} hasta {{end_time}}.\n\nDurante este tiempo:\n• El juego no estará disponible\n• Las construcciones continuarán\n• Los datos están seguros\n\nGracias por tu paciencia.',
          type: 'maintenance',
          priority: 'high'
        },
        description: 'Plantilla estándar para anuncios de mantenimiento',
        category: 'sistema',
        createdBy: 'admin_1',
        createdAt: Date.now() - 86400000 * 90,
        usageCount: 15
      },
      {
        id: '2',
        name: 'Bienvenida Nuevo Usuario',
        type: 'email',
        content: {
          subject: '¡Bienvenido a Galactic Empire, {{username}}!',
          content: 'Hola {{username}},\n\n¡Bienvenido a Galactic Empire! Tu aventura galáctica comienza ahora.\n\nPrimeros pasos:\n1. Explora tu planeta inicial\n2. Construye tu primera mina\n3. Únete a una alianza\n\nQue la fuerza te acompañe en tu conquista del universo.\n\nEl Equipo de Galactic Empire',
          template: 'welcome'
        },
        description: 'Email de bienvenida para nuevos usuarios',
        category: 'usuario',
        createdBy: 'admin_1',
        createdAt: Date.now() - 86400000 * 60,
        usageCount: 234
      },
      {
        id: '3',
        name: 'Penalización por Trampa',
        type: 'penalty',
        content: {
          reason: 'Uso de software automatizado (bots) detectado en tu cuenta',
          type: 'temporary_ban',
          duration: 72,
          warning: 'Futuras violaciones resultarán en baneos permanentes. El uso de bots está estrictamente prohibido.',
          appeal: 'Si crees que esto es un error, contacta al soporte con el ID de caso: {{case_id}}'
        },
        description: 'Penalización estándar por uso de bots',
        category: 'seguridad',
        createdBy: 'admin_1',
        createdAt: Date.now() - 86400000 * 120,
        usageCount: 8
      }
    ];
    setTemplates(mockTemplates);
  };

  const tabs = [
    { id: 'messages', name: 'Mensajes Globales', icon: MessageSquare, count: messages.length },
    { id: 'email', name: 'Email Masivo', icon: Mail, count: emailCampaigns.length },
    { id: 'telegram', name: 'Bot Telegram', icon: Bot, count: 8 },
    { id: 'templates', name: 'Plantillas', icon: FileText, count: templates.length },
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

  const getStatusText = (status: GlobalMessage['status']) => {
    switch (status) {
      case 'sent': return 'ENVIADO';
      case 'scheduled': return 'PROGRAMADO';
      case 'draft': return 'BORRADOR';
      case 'expired': return 'EXPIRADO';
      default: return 'DESCONOCIDO';
    }
  };

  const getTypeText = (type: GlobalMessage['type']) => {
    switch (type) {
      case 'announcement': return 'Anuncio';
      case 'maintenance': return 'Mantenimiento';
      case 'event': return 'Evento';
      case 'warning': return 'Advertencia';
      case 'celebration': return 'Celebración';
      default: return 'Otro';
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

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || message.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const filteredEmails = emailCampaigns.filter(email => {
    return email.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           email.subject.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || template.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const handleEditMessage = (message: GlobalMessage) => {
    setEditingMessage(message);
    setShowMessageCreator(true);
  };

  const handleDeleteMessage = (messageId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este mensaje?')) {
      setMessages(prev => prev.filter(m => m.id !== messageId));
    }
  };

  const handleDuplicateMessage = (message: GlobalMessage) => {
    const duplicated: GlobalMessage = {
      ...message,
      id: Date.now().toString(),
      title: `${message.title} (Copia)`,
      status: 'draft',
      sentAt: undefined,
      readBy: []
    };
    setMessages(prev => [duplicated, ...prev]);
  };

  const handleViewEmail = (email: any) => {
    setSelectedEmail(email);
    setShowEmailViewer(true);
  };

  const handleEditTemplate = (template: AdminTemplate) => {
    setSelectedTemplate(template);
    setShowTemplateEditor(true);
  };

  const handleDeleteTemplate = (templateId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta plantilla?')) {
      setTemplates(prev => prev.filter(t => t.id !== templateId));
    }
  };

  const handleDuplicateTemplate = (template: AdminTemplate) => {
    const duplicated: AdminTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copia)`,
      createdAt: Date.now(),
      usageCount: 0
    };
    setTemplates(prev => [duplicated, ...prev]);
  };

  const getTemplateTypeIcon = (type: AdminTemplate['type']) => {
    switch (type) {
      case 'message': return MessageSquare;
      case 'email': return Mail;
      case 'penalty': return AlertTriangle;
      case 'mission': return Target;
      case 'alien_race': return Star;
      case 'news': return Globe;
      default: return FileText;
    }
  };

  const getTemplateTypeColor = (type: AdminTemplate['type']) => {
    switch (type) {
      case 'message': return 'neon-blue';
      case 'email': return 'neon-green';
      case 'penalty': return 'neon-red';
      case 'mission': return 'neon-purple';
      case 'alien_race': return 'neon-orange';
      case 'news': return 'neon-blue';
      default: return 'gray-400';
    }
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
          onClick={() => {
            setEditingMessage(null);
            setSelectedTemplate(null);
            if (activeTab === 'messages') setShowMessageCreator(true);
            else if (activeTab === 'email') setShowEmailCreator(true);
            else if (activeTab === 'telegram') setShowTelegramManager(true);
            else if (activeTab === 'templates') setShowTemplateEditor(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          {activeTab === 'messages' ? 'Crear Mensaje' :
           activeTab === 'email' ? 'Nueva Campaña' :
           activeTab === 'telegram' ? 'Configurar Bot' :
           'Nueva Plantilla'}
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
          value={templates.length.toString()}
          icon={FileText}
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
            <span className="px-2 py-0.5 bg-current/20 rounded text-xs font-rajdhani font-bold">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar mensajes..."
                  className="w-full pl-10 pr-4 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                />
              </div>
              
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
              >
                <option value="all">Todos los estados</option>
                <option value="sent">Enviados</option>
                <option value="scheduled">Programados</option>
                <option value="draft">Borradores</option>
              </select>
            </div>

            {/* Messages List */}
            <div className="space-y-4">
              {filteredMessages.map((message) => (
                <div key={message.id} className="p-4 bg-space-700/30 rounded-lg border border-space-600 hover:border-neon-blue/30 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-3 py-1 rounded text-xs font-rajdhani font-bold ${getMessageTypeColor(message.type)}`}>
                          {getTypeText(message.type)}
                        </span>
                        <span className={`px-3 py-1 rounded text-xs font-rajdhani font-bold ${getStatusColor(message.status)} bg-current/10`}>
                          {getStatusText(message.status)}
                        </span>
                        {message.sentAt && (
                          <span className="text-xs text-gray-400">
                            {formatTimeAgo(message.sentAt)}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-rajdhani font-semibold text-white mb-2">
                        {message.title}
                      </h3>
                      
                      <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                        {message.content}
                      </p>

                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>Para: {message.targetAudience === 'all' ? 'Todos' : message.targetAudience}</span>
                        </div>
                        {message.readBy && (
                          <div className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{message.readBy.length} lectores</span>
                          </div>
                        )}
                        {message.scheduledFor && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>Programado: {new Date(message.scheduledFor).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditMessage(message)}
                        className="p-2 text-gray-400 hover:text-neon-blue transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDuplicateMessage(message)}
                        className="p-2 text-gray-400 hover:text-neon-green transition-colors"
                        title="Duplicar"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(message.id)}
                        className="p-2 text-gray-400 hover:text-neon-red transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Email Tab */}
        {activeTab === 'email' && (
          <>
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar campañas de email..."
                className="w-full pl-10 pr-4 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
              />
            </div>

            {/* Email Campaigns */}
            <div className="space-y-4">
              {filteredEmails.map((email) => (
                <div key={email.id} className="p-4 bg-space-700/30 rounded-lg border border-space-600 hover:border-neon-blue/30 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-rajdhani font-semibold text-white">
                          {email.name}
                        </h3>
                        <span className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${
                          email.status === 'active' ? 'bg-neon-green/20 text-neon-green' :
                          email.status === 'sent' ? 'bg-neon-blue/20 text-neon-blue' :
                          email.status === 'scheduled' ? 'bg-neon-orange/20 text-neon-orange' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {email.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-400 mb-3">
                        <strong>Asunto:</strong> {email.subject}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div className="text-center p-2 bg-space-800/50 rounded">
                          <p className="text-lg font-orbitron font-bold text-white">
                            {email.sentCount?.toLocaleString() || '0'}
                          </p>
                          <p className="text-xs text-gray-400">Enviados</p>
                        </div>
                        <div className="text-center p-2 bg-space-800/50 rounded">
                          <p className="text-lg font-orbitron font-bold text-neon-green">
                            {email.openRate?.toFixed(1) || '0.0'}%
                          </p>
                          <p className="text-xs text-gray-400">Apertura</p>
                        </div>
                        <div className="text-center p-2 bg-space-800/50 rounded">
                          <p className="text-lg font-orbitron font-bold text-neon-purple">
                            {email.clickRate?.toFixed(1) || '0.0'}%
                          </p>
                          <p className="text-xs text-gray-400">Clics</p>
                        </div>
                        <div className="text-center p-2 bg-space-800/50 rounded">
                          <p className="text-lg font-orbitron font-bold text-neon-blue">
                            {email.targetAudience === 'all' ? 'Todos' : 
                             email.targetAudience === 'new_users' ? 'Nuevos' :
                             email.targetAudience}
                          </p>
                          <p className="text-xs text-gray-400">Audiencia</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <span>Creado: {new Date(email.createdAt).toLocaleDateString()}</span>
                        {email.lastSent && (
                          <span>Último envío: {formatTimeAgo(email.lastSent)}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewEmail(email)}
                        className="p-2 text-gray-400 hover:text-neon-blue transition-colors"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDuplicateEmail(email)}
                        className="p-2 text-gray-400 hover:text-neon-green transition-colors"
                        title="Duplicar"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => console.log('Edit email:', email.id)}
                        className="p-2 text-gray-400 hover:text-neon-orange transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Telegram Tab */}
        {activeTab === 'telegram' && (
          <div className="space-y-6">
            <AdminCard title="Estado del Bot de Telegram" icon={Bot} color="neon-purple">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
                    <span className="text-white font-rajdhani font-medium">Bot Conectado</span>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => setShowTelegramManager(true)}>
                    <Settings className="w-4 h-4 mr-2" />
                    Configurar
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-orbitron font-bold text-white">892</p>
                    <p className="text-xs text-gray-400">Usuarios</p>
                  </div>
                  <div>
                    <p className="text-2xl font-orbitron font-bold text-white">156</p>
                    <p className="text-xs text-gray-400">Comandos hoy</p>
                  </div>
                  <div>
                    <p className="text-2xl font-orbitron font-bold text-white">98%</p>
                    <p className="text-xs text-gray-400">Uptime</p>
                  </div>
                </div>
              </div>
            </AdminCard>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar plantillas..."
                  className="w-full pl-10 pr-4 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                />
              </div>
              
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
              >
                <option value="all">Todos los tipos</option>
                <option value="message">Mensajes</option>
                <option value="email">Emails</option>
                <option value="penalty">Penalizaciones</option>
                <option value="mission">Misiones</option>
                <option value="alien_race">Razas Alienígenas</option>
                <option value="news">Noticias</option>
              </select>
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((template) => {
                const Icon = getTemplateTypeIcon(template.type);
                const typeColor = getTemplateTypeColor(template.type);
                return (
                  <div key={template.id} className="p-4 bg-space-700/30 rounded-lg border border-space-600 hover:border-neon-blue/30 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-2 rounded border bg-${typeColor}/20 border-${typeColor}/30`}>
                        <Icon className={`w-5 h-5 text-${typeColor}`} />
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleEditTemplate(template)}
                          className="p-1 text-gray-400 hover:text-neon-blue transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDuplicateTemplate(template)}
                          className="p-1 text-gray-400 hover:text-neon-green transition-colors"
                          title="Duplicar"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="p-1 text-gray-400 hover:text-neon-red transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-rajdhani font-semibold text-white mb-2">
                      {template.name}
                    </h3>
                    
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                      {template.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 bg-${typeColor}/20 text-${typeColor} rounded text-xs font-rajdhani font-medium`}>
                          {template.type}
                        </span>
                        <span className="px-2 py-1 bg-space-600 text-gray-300 rounded text-xs font-rajdhani font-medium">
                          {template.category}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-orbitron font-bold text-white">
                          {template.usageCount}
                        </p>
                        <p className="text-xs text-gray-400">usos</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-rajdhani font-semibold text-gray-400 mb-2">
                  {searchTerm ? 'Sin resultados' : 'No hay plantillas'}
                </h3>
                <p className="text-gray-500">
                  {searchTerm 
                    ? `No se encontraron plantillas que coincidan con "${searchTerm}"`
                    : 'Aún no has creado ninguna plantilla'
                  }
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      {showMessageCreator && (
        <GlobalMessageCreator
          message={editingMessage}
          onClose={() => {
            setShowMessageCreator(false);
            setEditingMessage(null);
          }}
          onSave={(messageData) => {
            if (editingMessage) {
              setMessages(prev => prev.map(m => m.id === editingMessage.id ? { ...messageData, id: editingMessage.id, readBy: editingMessage.readBy } as GlobalMessage : m));
            } else {
              const newMessage: GlobalMessage = {
                ...messageData,
                id: Date.now().toString(),
                readBy: []
              };
              setMessages(prev => [newMessage, ...prev]);
            }
            setShowMessageCreator(false);
            setEditingMessage(null);
          }}
        />
      )}

      {showEmailCreator && (
        <EmailCampaignCreator
          onClose={() => setShowEmailCreator(false)}
          onSave={(campaignData) => {
            setEmailCampaigns(prev => [campaignData, ...prev]);
            setShowEmailCreator(false);
          }}
        />
      )}

      {showEmailViewer && selectedEmail && (
        <EmailViewer
          email={selectedEmail}
          onClose={() => {
            setShowEmailViewer(false);
            setSelectedEmail(null);
          }}
          onEdit={() => {
            setShowEmailViewer(false);
            // Here you would open the email editor with the selected email
            console.log('Edit email:', selectedEmail.id);
          }}
        />
      )}

      {showTelegramManager && (
        <TelegramBotManager
          onClose={() => setShowTelegramManager(false)}
          onSave={(configData) => {
            console.log('Telegram config saved:', configData);
            setShowTelegramManager(false);
          }}
        />
      )}

      {showTemplateEditor && (
        <TemplateEditor
          template={selectedTemplate}
          onClose={() => {
            setShowTemplateEditor(false);
            setSelectedTemplate(null);
          }}
          onSave={(templateData) => {
            if (selectedTemplate) {
              setTemplates(prev => prev.map(t => t.id === selectedTemplate.id ? { ...templateData, id: selectedTemplate.id, createdBy: selectedTemplate.createdBy, createdAt: selectedTemplate.createdAt, usageCount: selectedTemplate.usageCount } as AdminTemplate : t));
            } else {
              const newTemplate: AdminTemplate = {
                ...templateData,
                id: Date.now().toString(),
                createdBy: 'current_admin_id',
                createdAt: Date.now(),
                usageCount: 0
              };
              setTemplates(prev => [newTemplate, ...prev]);
            }
            setShowTemplateEditor(false);
            setSelectedTemplate(null);
          }}
        />
      )}
    </div>
  );
}