import React, { useState } from 'react';
import { AdminPvEMission } from '../../types/admin';
import Button from '../../components/UI/Button';
import { 
  X, 
  Save, 
  Target, 
  Globe,
  Clock,
  Award,
  Rocket,
  FlaskConical,
  Users,
  Crown,
  Zap,
  Star,
  Sword,
  MessageSquare,
  Package,
  Shield
} from 'lucide-react';

interface PvEMissionEditorProps {
  mission?: AdminPvEMission | null;
  onSave: (mission: Partial<AdminPvEMission>) => void;
  onClose: () => void;
}

export default function PvEMissionEditor({ mission, onSave, onClose }: PvEMissionEditorProps) {
  const [formData, setFormData] = useState({
    name: mission?.name || '',
    description: mission?.description || '',
    type: mission?.type || 'exploration' as AdminPvEMission['type'],
    difficulty: mission?.difficulty || 'easy' as AdminPvEMission['difficulty'],
    universeId: mission?.universeId || '',
    requirements: mission?.requirements || { level: 1 },
    rewards: mission?.rewards || { experience: 100 },
    duration: mission?.duration || 30,
    cooldown: mission?.cooldown || 24,
    location: mission?.location || '',
    lore: mission?.lore || '',
    image: mission?.image || 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
    active: mission?.active ?? true,
  });

  const missionTypes = [
    { value: 'exploration', label: 'Exploración', icon: Globe },
    { value: 'combat', label: 'Combate', icon: Sword },
    { value: 'diplomacy', label: 'Diplomacia', icon: MessageSquare },
    { value: 'trade', label: 'Comercio', icon: Package },
    { value: 'rescue', label: 'Rescate', icon: Shield },
    { value: 'artifact', label: 'Artefacto', icon: Star },
  ];

  const difficulties = [
    { value: 'easy', label: 'Fácil', color: 'text-neon-green' },
    { value: 'medium', label: 'Medio', color: 'text-neon-blue' },
    { value: 'hard', label: 'Difícil', color: 'text-neon-orange' },
    { value: 'extreme', label: 'Extremo', color: 'text-neon-red' },
    { value: 'legendary', label: 'Legendario', color: 'text-neon-purple' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-6 border-b border-space-600">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-orbitron font-bold text-white">
              {mission ? 'Editar Misión PvE' : 'Nueva Misión PvE'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Nombre de la Misión
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Ubicación
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
              rows={3}
              required
            />
          </div>

          {/* Type and Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Tipo de Misión
              </label>
              <div className="grid grid-cols-2 gap-2">
                {missionTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: type.value as any })}
                    className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 ${
                      formData.type === type.value
                        ? 'bg-neon-purple/20 border-neon-purple/30 text-neon-purple'
                        : 'bg-space-700/30 border-space-600 text-gray-400 hover:text-white'
                    }`}
                  >
                    <type.icon className="w-4 h-4" />
                    <span className="text-sm font-rajdhani font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Dificultad
              </label>
              <div className="space-y-2">
                {difficulties.map((diff) => (
                  <button
                    key={diff.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, difficulty: diff.value as any })}
                    className={`w-full flex items-center justify-between p-2 rounded border transition-all duration-200 ${
                      formData.difficulty === diff.value
                        ? 'bg-neon-blue/20 border-neon-blue/30 text-neon-blue'
                        : 'bg-space-700/30 border-space-600 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="text-sm font-rajdhani font-medium">{diff.label}</span>
                    <span className={`text-xs ${diff.color}`}>●</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Duration and Cooldown */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Duración (minutos)
              </label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Cooldown (horas)
              </label>
              <input
                type="number"
                value={formData.cooldown}
                onChange={(e) => setFormData({ ...formData, cooldown: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                min="0"
                required
              />
            </div>
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
              Requisitos (JSON)
            </label>
            <textarea
              value={JSON.stringify(formData.requirements, null, 2)}
              onChange={(e) => {
                try {
                  setFormData({ ...formData, requirements: JSON.parse(e.target.value) });
                } catch (error) {
                  // Invalid JSON, keep typing
                }
              }}
              className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none font-mono"
              rows={4}
              placeholder='{"level": 5, "fleet": {"lightFighter": 10}}'
            />
          </div>

          {/* Rewards */}
          <div>
            <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
              Recompensas (JSON)
            </label>
            <textarea
              value={JSON.stringify(formData.rewards, null, 2)}
              onChange={(e) => {
                try {
                  setFormData({ ...formData, rewards: JSON.parse(e.target.value) });
                } catch (error) {
                  // Invalid JSON, keep typing
                }
              }}
              className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none font-mono"
              rows={4}
              placeholder='{"experience": 1000, "resources": {"metal": 10000}}'
            />
          </div>

          {/* Lore */}
          <div>
            <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
              Historia/Lore
            </label>
            <textarea
              value={formData.lore}
              onChange={(e) => setFormData({ ...formData, lore: e.target.value })}
              className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
              rows={4}
              required
            />
          </div>

          {/* Active Status */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="rounded border-space-600 bg-space-700 text-neon-blue focus:ring-neon-blue"
            />
            <label htmlFor="active" className="text-sm font-rajdhani font-medium text-gray-300">
              Misión Activa
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-space-600">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              <Save className="w-4 h-4 mr-2" />
              {mission ? 'Actualizar' : 'Crear'} Misión
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}