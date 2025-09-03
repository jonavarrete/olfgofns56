import React, { useState } from 'react';
import Button from '../../components/UI/Button';
import { 
  X, 
  Save, 
  Radio, 
  Globe,
  Users,
  MapPin,
  Clock,
  AlertTriangle,
  Info,
  Star,
  Zap,
  Plus,
  Minus
} from 'lucide-react';

interface GNNNewsEditorProps {
  onSave: (news: any) => void;
  onClose: () => void;
}

export default function GNNNewsEditor({ onSave, onClose }: GNNNewsEditorProps) {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'combat' as 'combat' | 'diplomacy' | 'exploration' | 'rankings' | 'events',
    priority: 'medium' as 'breaking' | 'high' | 'medium' | 'low',
    universe: 'universe_1',
    location: '',
    participants: [''],
    tags: [''],
  });

  const categories = [
    { value: 'combat', label: 'Combate', icon: AlertTriangle, color: 'text-neon-red' },
    { value: 'diplomacy', label: 'Diplomacia', icon: Users, color: 'text-neon-green' },
    { value: 'exploration', label: 'Exploración', icon: Star, color: 'text-neon-purple' },
    { value: 'rankings', label: 'Rankings', icon: Star, color: 'text-neon-blue' },
    { value: 'events', label: 'Eventos', icon: Zap, color: 'text-neon-orange' },
  ];

  const priorities = [
    { value: 'breaking', label: 'Última Hora', color: 'text-neon-red' },
    { value: 'high', label: 'Alta', color: 'text-neon-orange' },
    { value: 'medium', label: 'Media', color: 'text-neon-blue' },
    { value: 'low', label: 'Baja', color: 'text-gray-400' },
  ];

  const universes = [
    { id: 'universe_1', name: 'Galaxia Prima' },
    { id: 'universe_2', name: 'Nebulosa Veloce' },
    { id: 'universe_3', name: 'Sector Pacífico' },
    { id: 'universe_4', name: 'Abismo Hardcore' },
    { id: 'universe_5', name: 'Nueva Frontera' },
    { id: 'universe_6', name: 'Legado Ancestral' },
  ];

  const addParticipant = () => {
    setFormData(prev => ({
      ...prev,
      participants: [...prev.participants, '']
    }));
  };

  const removeParticipant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.filter((_, i) => i !== index)
    }));
  };

  const updateParticipant = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.map((p, i) => i === index ? value : p)
    }));
  };

  const addTag = () => {
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, '']
    }));
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const updateTag = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.map((t, i) => i === index ? value : t)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newsData = {
      ...formData,
      participants: formData.participants.filter(p => p.trim() !== ''),
      tags: formData.tags.filter(t => t.trim() !== ''),
      timestamp: Date.now(),
      id: Date.now().toString(),
    };
    
    onSave(newsData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-6 border-b border-space-600">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-orbitron font-bold text-white">
              Nueva Noticia GNN
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div>
            <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
              Título de la Noticia
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
              Resumen
            </label>
            <textarea
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
              rows={2}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
              Contenido Completo
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
              rows={6}
              required
            />
          </div>

          {/* Category and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Categoría
              </label>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat.value as any })}
                    className={`w-full flex items-center space-x-3 p-3 rounded border transition-all duration-200 ${
                      formData.category === cat.value
                        ? 'bg-neon-red/20 border-neon-red/30 text-neon-red'
                        : 'bg-space-700/30 border-space-600 text-gray-400 hover:text-white'
                    }`}
                  >
                    <cat.icon className="w-4 h-4" />
                    <span className="font-rajdhani font-medium">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Prioridad
              </label>
              <div className="space-y-2">
                {priorities.map((priority) => (
                  <button
                    key={priority.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, priority: priority.value as any })}
                    className={`w-full flex items-center justify-between p-2 rounded border transition-all duration-200 ${
                      formData.priority === priority.value
                        ? 'bg-neon-blue/20 border-neon-blue/30 text-neon-blue'
                        : 'bg-space-700/30 border-space-600 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="text-sm font-rajdhani font-medium">{priority.label}</span>
                    <span className={`text-xs ${priority.color}`}>●</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Universe and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Universo
              </label>
              <select
                value={formData.universe}
                onChange={(e) => setFormData({ ...formData, universe: e.target.value })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
              >
                {universes.map(universe => (
                  <option key={universe.id} value={universe.id}>{universe.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Ubicación (opcional)
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                placeholder="Sector Alfa-7"
              />
            </div>
          </div>

          {/* Participants */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-rajdhani font-medium text-gray-400">
                Participantes
              </label>
              <button
                type="button"
                onClick={addParticipant}
                className="p-1 text-gray-400 hover:text-neon-green transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {formData.participants.map((participant, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={participant}
                    onChange={(e) => updateParticipant(index, e.target.value)}
                    className="flex-1 px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                    placeholder="Nombre del participante"
                  />
                  <button
                    type="button"
                    onClick={() => removeParticipant(index)}
                    className="p-2 text-gray-400 hover:text-neon-red transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-rajdhani font-medium text-gray-400">
                Etiquetas
              </label>
              <button
                type="button"
                onClick={addTag}
                className="p-1 text-gray-400 hover:text-neon-green transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {formData.tags.map((tag, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => updateTag(index, e.target.value)}
                    className="flex-1 px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                    placeholder="etiqueta"
                  />
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="p-2 text-gray-400 hover:text-neon-red transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-space-600">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              <Save className="w-4 h-4 mr-2" />
              Crear Noticia
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}