import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { 
  MessageSquare, 
  Inbox, 
  Send, 
  Star, 
  Trash2, 
  Eye, 
  EyeOff,
  Target,
  Package,
  Users,
  Settings,
  Plus
} from 'lucide-react';
import { Message } from '../types/game';

export default function Messages() {
  const { state } = useGame();
  const { messages } = state;
  const [selectedCategory, setSelectedCategory] = useState<Message['type'] | 'all'>('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showCompose, setShowCompose] = useState(false);

  const categories = [
    { key: 'all' as const, name: 'Todos', icon: Inbox, count: messages.length },
    { key: 'combat' as const, name: 'Combate', icon: Target, count: messages.filter(m => m.type === 'combat').length },
    { key: 'spy' as const, name: 'Espionaje', icon: Eye, count: messages.filter(m => m.type === 'spy').length },
    { key: 'transport' as const, name: 'Transporte', icon: Package, count: messages.filter(m => m.type === 'transport').length },
    { key: 'alliance' as const, name: 'Alianza', icon: Users, count: messages.filter(m => m.type === 'alliance').length },
    { key: 'system' as const, name: 'Sistema', icon: Settings, count: messages.filter(m => m.type === 'system').length },
  ];

  const filteredMessages = selectedCategory === 'all' 
    ? messages 
    : messages.filter(m => m.type === selectedCategory);

  const unreadCount = messages.filter(m => !m.read).length;

  const getMessageIcon = (type: Message['type']) => {
    switch (type) {
      case 'combat': return Target;
      case 'spy': return Eye;
      case 'transport': return Package;
      case 'alliance': return Users;
      case 'system': return Settings;
      default: return MessageSquare;
    }
  };

  const getMessageColor = (type: Message['type']) => {
    switch (type) {
      case 'combat': return 'text-neon-red';
      case 'spy': return 'text-neon-purple';
      case 'transport': return 'text-neon-blue';
      case 'alliance': return 'text-neon-green';
      case 'system': return 'text-neon-orange';
      default: return 'text-gray-400';
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    if (diff < 3600000) { // Less than 1 hour
      const minutes = Math.floor(diff / 60000);
      return `Hace ${minutes}m`;
    }
    if (diff < 86400000) { // Less than 1 day
      const hours = Math.floor(diff / 3600000);
      return `Hace ${hours}h`;
    }
    const days = Math.floor(diff / 86400000);
    return `Hace ${days}d`;
  };

  if (showCompose) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-orbitron font-bold text-white">
              Nuevo Mensaje
            </h1>
            <p className="text-gray-400 mt-1">
              Enviar mensaje a otro jugador
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={() => setShowCompose(false)}
          >
            Cancelar
          </Button>
        </div>

        <Card title="Componer Mensaje" glowing>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-300 mb-2">
                Destinatario
              </label>
              <input
                type="text"
                placeholder="Nombre del jugador"
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-blue/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-300 mb-2">
                Asunto
              </label>
              <input
                type="text"
                placeholder="Asunto del mensaje"
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-blue/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-300 mb-2">
                Mensaje
              </label>
              <textarea
                rows={8}
                placeholder="Escribe tu mensaje aquí..."
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-blue/50 focus:outline-none resize-none"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="secondary"
                onClick={() => setShowCompose(false)}
              >
                Cancelar
              </Button>
              <Button variant="success">
                <Send className="w-4 h-4 mr-2" />
                Enviar
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (selectedMessage) {
    const MessageIcon = getMessageIcon(selectedMessage.type);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button
              variant="secondary"
              onClick={() => setSelectedMessage(null)}
            >
              ← Volver a mensajes
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="secondary" size="sm">
              <Star className="w-4 h-4" />
            </Button>
            <Button variant="danger" size="sm">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Card glowing>
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  selectedMessage.type === 'combat' ? 'bg-neon-red/20' :
                  selectedMessage.type === 'spy' ? 'bg-neon-purple/20' :
                  selectedMessage.type === 'transport' ? 'bg-neon-blue/20' :
                  selectedMessage.type === 'alliance' ? 'bg-neon-green/20' :
                  'bg-neon-orange/20'
                }`}>
                  <MessageIcon className={`w-5 h-5 ${getMessageColor(selectedMessage.type)}`} />
                </div>
                <div>
                  <h2 className="text-xl font-rajdhani font-bold text-white">
                    {selectedMessage.subject}
                  </h2>
                  <p className="text-sm text-gray-400">
                    De: {selectedMessage.from} • {formatTimestamp(selectedMessage.timestamp)}
                  </p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-rajdhani font-medium ${
                selectedMessage.type === 'combat' ? 'bg-neon-red/20 text-neon-red' :
                selectedMessage.type === 'spy' ? 'bg-neon-purple/20 text-neon-purple' :
                selectedMessage.type === 'transport' ? 'bg-neon-blue/20 text-neon-blue' :
                selectedMessage.type === 'alliance' ? 'bg-neon-green/20 text-neon-green' :
                'bg-neon-orange/20 text-neon-orange'
              }`}>
                {selectedMessage.type}
              </div>
            </div>

            <div className="border-t border-space-600 pt-6">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.content}
                </p>
              </div>
            </div>

            <div className="border-t border-space-600 pt-4">
              <div className="flex justify-between">
                <Button variant="primary">
                  <Send className="w-4 h-4 mr-2" />
                  Responder
                </Button>
                <div className="flex space-x-2">
                  <Button variant="secondary" size="sm">
                    Reenviar
                  </Button>
                  <Button variant="secondary" size="sm">
                    Archivar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            Mensajes
          </h1>
          <p className="text-gray-400 mt-1">
            {unreadCount > 0 && (
              <span className="text-neon-orange">
                {unreadCount} mensaje{unreadCount > 1 ? 's' : ''} sin leer
              </span>
            )}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="primary"
            onClick={() => setShowCompose(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Mensaje
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories */}
        <Card className="lg:col-span-1">
          <div className="space-y-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                    selectedCategory === category.key
                      ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                      : 'text-gray-400 hover:text-white hover:bg-space-600/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4" />
                    <span className="font-rajdhani font-medium">
                      {category.name}
                    </span>
                  </div>
                  {category.count > 0 && (
                    <span className={`px-2 py-1 rounded-full text-xs font-rajdhani font-bold ${
                      selectedCategory === category.key
                        ? 'bg-neon-blue text-white'
                        : 'bg-space-600 text-gray-300'
                    }`}>
                      {category.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Messages List */}
        <Card className="lg:col-span-3" title={`${categories.find(c => c.key === selectedCategory)?.name || 'Todos'} los mensajes`}>
          <div className="space-y-2">
            {filteredMessages.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No hay mensajes en esta categoría</p>
              </div>
            ) : (
              filteredMessages.map((message) => {
                const MessageIcon = getMessageIcon(message.type);
                return (
                  <div
                    key={message.id}
                    onClick={() => setSelectedMessage(message)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-space-700/30 ${
                      !message.read
                        ? 'bg-neon-blue/5 border-neon-blue/30 hover:border-neon-blue/50'
                        : 'bg-space-700/20 border-space-600 hover:border-space-500'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        message.type === 'combat' ? 'bg-neon-red/20' :
                        message.type === 'spy' ? 'bg-neon-purple/20' :
                        message.type === 'transport' ? 'bg-neon-blue/20' :
                        message.type === 'alliance' ? 'bg-neon-green/20' :
                        'bg-neon-orange/20'
                      }`}>
                        <MessageIcon className={`w-4 h-4 ${getMessageColor(message.type)}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            <h3 className={`text-sm font-rajdhani font-semibold truncate ${
                              !message.read ? 'text-white' : 'text-gray-300'
                            }`}>
                              {message.subject}
                            </h3>
                            {!message.read && (
                              <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-400">
                              {formatTimestamp(message.timestamp)}
                            </span>
                            {message.read ? (
                              <Eye className="w-3 h-3 text-gray-400" />
                            ) : (
                              <EyeOff className="w-3 h-3 text-neon-blue" />
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mb-2">
                          De: {message.from}
                        </p>
                        <p className="text-sm text-gray-300 line-clamp-2">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}