import React, { useState } from 'react';
import { AdminAlienRace } from '../../types/admin';
import Button from '../../components/UI/Button';
import { 
  X, 
  Save, 
  Crown, 
  Globe,
  Star,
  Sword,
  MessageSquare,
  Package,
  Shield,
  Plus,
  Minus
} from 'lucide-react';

interface AlienRaceEditorProps {
  alien?: AdminAlienRace | null;
  onSave: (alien: Partial<AdminAlienRace>) => void;
  onClose: () => void;
}

export default function AlienRaceEditor({ alien, onSave, onClose }: AlienRaceEditorProps) {
  const [formData, setFormData] = useState({
    name: alien?.name || '',
    description: alien?.description || '',
    homeworld: alien?.homeworld || '',
    type: alien?.type || 'neutral' as AdminAlienRace['type'],
    traits: alien?.traits || { technology: 5, military: 5, diplomacy: 5, trade: 5, expansion: 5 },
    specialties: alien?.specialties || [''],
    weaknesses: alien?.weaknesses || [''],
    preferredDiplomacy: alien?.preferredDiplomacy || 'neutral' as AdminAlienRace['preferredDiplomacy'],
    rarity: alien?.rarity || 'common' as AdminAlienRace['rarity'],
    rewards: alien?.rewards || {},
    lore: alien?.lore || '',
    image: alien?.image || 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
    active: alien?.active ?? true,
  });

  const raceTypes = [
    { value: 'peaceful', label: 'Pacífica', color: 'text-neon-green' },
    { value: 'neutral', label: 'Neutral', color: 'text-neon-blue' },
    { value: 'aggressive', label: 'Agresiva', color: 'text-neon-red' },
    { value: 'ancient', label: 'Ancestral', color: 'text-neon-purple' },
    { value: 'mysterious', label: 'Misteriosa', color: 'text-neon-orange' },
  ];

  const rarities = [
    { value: 'common', label: 'Común', color: 'text-gray-400' },
    { value: 'uncommon', label: 'Poco Común', color: 'text-neon-green' },
    { value: 'rare', label: 'Rara', color: 'text-neon-blue' },
    { value: 'legendary', label: 'Legendaria', color: 'text-neon-orange' },
    { value: 'mythic', label: 'Mítica', color: 'text-neon-purple' },
  ];

  const diplomacyOptions = [
    { value: 'alliance', label: 'Alianza' },
    { value: 'trade', label: 'Comercio' },
    { value: 'neutral', label: 'Neutral' },
    { value: 'hostile', label: 'Hostil' },
  ];

  const updateTrait = (trait: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      traits: { ...prev.traits, [trait]: Math.max(1, Math.min(10, value)) }
    }));
  };

  const addSpecialty = () => {
    setFormData(prev => ({
      ...prev,
      specialties: [...prev.specialties, '']
    }));
  };

  const removeSpecialty = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter((_, i) => i !== index)
    }));
  };

  const updateSpecialty = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.map((spec, i) => i === index ? value : spec)
    }));
  };

  const addWeakness = () => {
    setFormData(prev => ({
      ...prev,
      weaknesses: [...prev.weaknesses, '']
    }));
  };

  const removeWeakness = (index: number) => {
    setFormData(prev => ({
      ...prev,
      weaknesses: prev.weaknesses.filter((_, i) => i !== index)
    }));
  };

  const updateWeakness = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      weaknesses: prev.weaknesses.map((weak, i) => i === index ? value : weak)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      specialties: formData.specialties.filter(s => s.trim() !== ''),
      weaknesses: formData.weaknesses.filter(w => w.trim() !== '')
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-5xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-6 border-b border-space-600">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-orbitron font-bold text-white">
              {alien ? 'Editar Raza Alienígena' : 'Nueva Raza Alienígena'}
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
                Nombre de la Raza
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
                Mundo Natal
              </label>
              <input
                type="text"
                value={formData.homeworld}
                onChange={(e) => setFormData({ ...formData, homeworld: e.target.value })}
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

          {/* Type and Rarity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Tipo de Raza
              </label>
              <div className="space-y-2">
                {raceTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: type.value as any })}
                    className={`w-full flex items-center justify-between p-2 rounded border transition-all duration-200 ${
                      formData.type === type.value
                        ? 'bg-neon-orange/20 border-neon-orange/30 text-neon-orange'
                        : 'bg-space-700/30 border-space-600 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="text-sm font-rajdhani font-medium">{type.label}</span>
                    <span className={`text-xs ${type.color}`}>●</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Rareza
              </label>
              <div className="space-y-2">
                {rarities.map((rarity) => (
                  <button
                    key={rarity.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, rarity: rarity.value as any })}
                    className={`w-full flex items-center justify-between p-2 rounded border transition-all duration-200 ${
                      formData.rarity === rarity.value
                        ? 'bg-neon-purple/20 border-neon-purple/30 text-neon-purple'
                        : 'bg-space-700/30 border-space-600 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="text-sm font-rajdhani font-medium">{rarity.label}</span>
                    <span className={`text-xs ${rarity.color}`}>●</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Traits */}
          <div>
            <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
              Características (1-10)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {Object.entries(formData.traits).map(([trait, value]) => (
                <div key={trait} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300 capitalize">{trait}</span>
                    <span className="text-sm font-rajdhani font-bold text-white">{value}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => updateTrait(trait, value - 1)}
                      className="p-1 text-gray-400 hover:text-neon-red transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={value}
                      onChange={(e) => updateTrait(trait, parseInt(e.target.value))}
                      className="flex-1 h-2 bg-space-600 rounded-lg appearance-none cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={() => updateTrait(trait, value + 1)}
                      className="p-1 text-gray-400 hover:text-neon-green transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Specialties */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-rajdhani font-medium text-gray-400">
                Especialidades
              </label>
              <button
                type="button"
                onClick={addSpecialty}
                className="p-1 text-gray-400 hover:text-neon-green transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {formData.specialties.map((specialty, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={specialty}
                    onChange={(e) => updateSpecialty(index, e.target.value)}
                    className="flex-1 px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                    placeholder="Especialidad de la raza"
                  />
                  <button
                    type="button"
                    onClick={() => removeSpecialty(index)}
                    className="p-2 text-gray-400 hover:text-neon-red transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Weaknesses */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-rajdhani font-medium text-gray-400">
                Debilidades
              </label>
              <button
                type="button"
                onClick={addWeakness}
                className="p-1 text-gray-400 hover:text-neon-green transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {formData.weaknesses.map((weakness, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={weakness}
                    onChange={(e) => updateWeakness(index, e.target.value)}
                    className="flex-1 px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                    placeholder="Debilidad de la raza"
                  />
                  <button
                    type="button"
                    onClick={() => removeWeakness(index)}
                    className="p-2 text-gray-400 hover:text-neon-red transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Diplomacy Preference */}
          <div>
            <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
              Preferencia Diplomática
            </label>
            <select
              value={formData.preferredDiplomacy}
              onChange={(e) => setFormData({ ...formData, preferredDiplomacy: e.target.value as any })}
              className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
            >
              {diplomacyOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
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
              placeholder='{"technology": ["energyTechnology"], "resources": {"metal": 10000}}'
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
              Raza Activa
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-space-600">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              <Save className="w-4 h-4 mr-2" />
              {alien ? 'Actualizar' : 'Crear'} Raza
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}