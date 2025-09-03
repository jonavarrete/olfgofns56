import React, { useState } from 'react';
import { AdminPlanet, AdminMoon } from '../../types/admin';
import Button from '../../components/UI/Button';
import { 
  Globe, 
  Moon, 
  Plus, 
  Edit, 
  Trash2,
  Save,
  X,
  MapPin,
  Thermometer,
  Layers,
  Building,
  Gem,
  Pickaxe,
  Zap,
  Battery
} from 'lucide-react';

interface PlanetManagerProps {
  userId: string;
  planets: AdminPlanet[];
  onSave: (planets: AdminPlanet[]) => void;
  onClose: () => void;
}

export default function PlanetManager({ userId, planets, onSave, onClose }: PlanetManagerProps) {
  const [localPlanets, setLocalPlanets] = useState<AdminPlanet[]>(planets);
  const [showPlanetEditor, setShowPlanetEditor] = useState(false);
  const [editingPlanet, setEditingPlanet] = useState<AdminPlanet | null>(null);

  const generateRandomCoordinates = () => {
    const galaxy = Math.floor(Math.random() * 9) + 1;
    const system = Math.floor(Math.random() * 499) + 1;
    const position = Math.floor(Math.random() * 15) + 1;
    return `${galaxy}:${system}:${position}`;
  };

  const addPlanet = () => {
    const newPlanet: AdminPlanet = {
      id: Date.now().toString(),
      name: `Colonia ${localPlanets.length + 1}`,
      coordinates: generateRandomCoordinates(),
      type: 'colony',
      temperature: Math.floor(Math.random() * 200) - 100,
      size: Math.floor(Math.random() * 100) + 120,
      fields: 0,
      usedFields: 0,
      resources: { metal: 0, crystal: 0, deuterium: 0, energy: 0, darkMatter: 0 },
      buildings: {
        metalMine: 0,
        crystalMine: 0,
        deuteriumSynthesizer: 0,
        solarPlant: 0,
        fusionReactor: 0,
        roboticsFactory: 0,
        naniteFactory: 0,
        shipyard: 0,
        metalStorage: 0,
        crystalStorage: 0,
        deuteriumTank: 0,
        researchLab: 0,
        terraformer: 0,
        allianceDepot: 0,
        missileSilo: 0,
      },
      production: { metal: 0, crystal: 0, deuterium: 0, energy: 0, darkMatter: 0 },
      debris: { metal: 0, crystal: 0, deuterium: 0, energy: 0, darkMatter: 0 },
      moons: []
    };
    
    newPlanet.fields = newPlanet.size;
    setLocalPlanets(prev => [...prev, newPlanet]);
  };

  const deletePlanet = (planetId: string) => {
    setLocalPlanets(prev => prev.filter(p => p.id !== planetId));
  };

  const addMoon = (planetId: string) => {
    const newMoon: AdminMoon = {
      id: Date.now().toString(),
      name: `Luna ${Math.floor(Math.random() * 1000)}`,
      size: Math.floor(Math.random() * 50) + 20,
      temperature: Math.floor(Math.random() * 100) - 200,
      buildings: {
        metalMine: 0,
        crystalMine: 0,
        deuteriumSynthesizer: 0,
        solarPlant: 0,
        fusionReactor: 0,
        roboticsFactory: 0,
        naniteFactory: 0,
        shipyard: 0,
        metalStorage: 0,
        crystalStorage: 0,
        deuteriumTank: 0,
        researchLab: 0,
        terraformer: 0,
        allianceDepot: 0,
        missileSilo: 0,
      },
      resources: { metal: 0, crystal: 0, deuterium: 0, energy: 0, darkMatter: 0 }
    };

    setLocalPlanets(prev => prev.map(planet => 
      planet.id === planetId 
        ? { ...planet, moons: [...planet.moons, newMoon] }
        : planet
    ));
  };

  const deleteMoon = (planetId: string, moonId: string) => {
    setLocalPlanets(prev => prev.map(planet => 
      planet.id === planetId 
        ? { ...planet, moons: planet.moons.filter(m => m.id !== moonId) }
        : planet
    ));
  };

  const handleSave = () => {
    onSave(localPlanets);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-6 border-b border-space-600">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-orbitron font-bold text-white">
              Gestión de Planetas
            </h2>
            <div className="flex items-center space-x-3">
              <Button variant="secondary" onClick={addPlanet}>
                <Plus className="w-4 h-4 mr-2" />
                Agregar Planeta
              </Button>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {localPlanets.map((planet) => (
            <div key={planet.id} className="p-4 bg-space-700/30 rounded-lg border border-space-600">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-neon-blue/20 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-neon-blue" />
                  </div>
                  <div>
                    <h3 className="font-rajdhani font-semibold text-white">
                      {planet.name}
                    </h3>
                    <div className="flex items-center space-x-3 text-xs text-gray-400">
                      <span>{planet.coordinates}</span>
                      <span>{planet.type === 'main' ? 'Principal' : 'Colonia'}</span>
                      <span>{planet.size} campos</span>
                      <span>{planet.temperature}°C</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => addMoon(planet.id)}
                  >
                    <Moon className="w-4 h-4 mr-1" />
                    Luna
                  </Button>
                  <button
                    onClick={() => {
                      setEditingPlanet(planet);
                      setShowPlanetEditor(true);
                    }}
                    className="p-2 text-gray-400 hover:text-neon-blue transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deletePlanet(planet.id)}
                    className="p-2 text-gray-400 hover:text-neon-red transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Planet Resources */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="text-center p-2 bg-space-800/50 rounded">
                  <Pickaxe className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-400">Metal</p>
                  <p className="text-sm font-rajdhani font-bold text-white">
                    {planet.resources.metal.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-2 bg-space-800/50 rounded">
                  <Gem className="w-4 h-4 text-neon-blue mx-auto mb-1" />
                  <p className="text-xs text-gray-400">Cristal</p>
                  <p className="text-sm font-rajdhani font-bold text-white">
                    {planet.resources.crystal.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-2 bg-space-800/50 rounded">
                  <Zap className="w-4 h-4 text-neon-green mx-auto mb-1" />
                  <p className="text-xs text-gray-400">Deuterio</p>
                  <p className="text-sm font-rajdhani font-bold text-white">
                    {planet.resources.deuterium.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-2 bg-space-800/50 rounded">
                  <Battery className="w-4 h-4 text-neon-orange mx-auto mb-1" />
                  <p className="text-xs text-gray-400">Energía</p>
                  <p className="text-sm font-rajdhani font-bold text-white">
                    {planet.resources.energy.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Moons */}
              {planet.moons.length > 0 && (
                <div>
                  <h4 className="font-rajdhani font-semibold text-white mb-2">Lunas</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {planet.moons.map((moon) => (
                      <div key={moon.id} className="p-3 bg-space-800/50 rounded border border-space-600">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Moon className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-sm font-rajdhani font-medium text-white">
                                {moon.name}
                              </p>
                              <p className="text-xs text-gray-400">
                                {moon.size} km • {moon.temperature}°C
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => deleteMoon(planet.id, moon.id)}
                            className="p-1 text-gray-400 hover:text-neon-red transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-space-600 p-6">
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>
        </div>
      </div>

      {/* Planet Editor */}
      {showPlanetEditor && editingPlanet && (
        <PlanetEditor
          planet={editingPlanet}
          onSave={(planetData) => {
            setLocalPlanets(prev => prev.map(p => 
              p.id === editingPlanet.id ? { ...p, ...planetData } : p
            ));
            setShowPlanetEditor(false);
            setEditingPlanet(null);
          }}
          onClose={() => {
            setShowPlanetEditor(false);
            setEditingPlanet(null);
          }}
        />
      )}
    </div>
  );
}

interface PlanetEditorProps {
  planet: AdminPlanet;
  onSave: (planet: Partial<AdminPlanet>) => void;
  onClose: () => void;
}

function PlanetEditor({ planet, onSave, onClose }: PlanetEditorProps) {
  const [formData, setFormData] = useState({
    name: planet.name,
    coordinates: planet.coordinates,
    temperature: planet.temperature,
    size: planet.size,
    resources: { ...planet.resources },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      fields: formData.size,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-card-gradient border border-space-600 rounded-lg max-w-2xl w-full">
        <div className="p-6 border-b border-space-600">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-orbitron font-bold text-white">
              Editar Planeta
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Nombre
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
                Coordenadas
              </label>
              <input
                type="text"
                value={formData.coordinates}
                onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                pattern="\d{1,2}:\d{1,3}:\d{1,2}"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Tamaño
              </label>
              <input
                type="number"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                min="80"
                max="320"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                Temperatura (°C)
              </label>
              <input
                type="number"
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                min="-200"
                max="200"
                required
              />
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-rajdhani font-semibold text-white mb-3">Recursos</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { key: 'metal', label: 'Metal', icon: Pickaxe },
                { key: 'crystal', label: 'Cristal', icon: Gem },
                { key: 'deuterium', label: 'Deuterio', icon: Zap },
                { key: 'energy', label: 'Energía', icon: Battery },
              ].map(({ key, label, icon: Icon }) => (
                <div key={key}>
                  <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                    <Icon className="w-4 h-4 inline mr-1" />
                    {label}
                  </label>
                  <input
                    type="number"
                    value={formData.resources[key as keyof typeof formData.resources]}
                    onChange={(e) => setFormData({
                      ...formData,
                      resources: {
                        ...formData.resources,
                        [key]: parseInt(e.target.value) || 0
                      }
                    })}
                    className="w-full px-3 py-2 bg-space-700/50 border border-space-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                    min="0"
                  />
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
              Guardar Planeta
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}