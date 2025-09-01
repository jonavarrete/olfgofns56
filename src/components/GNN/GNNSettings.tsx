import React, { useState } from 'react';
import { GNNSettings as SettingsType } from '../../types/gnn';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { 
  X, 
  Settings, 
  Save, 
  RotateCcw,
  Bell,
  Eye,
  EyeOff,
  Sword,
  Handshake,
  Star,
  TrendingUp,
  Zap,
  RefreshCw,
  Filter,
  Clock,
  Hash
} from 'lucide-react';

interface GNNSettingsProps {
  settings: SettingsType;
  onUpdate: (settings: Partial<SettingsType>) => void;
  onClose: () => void;
}

export default function GNNSettings({ settings, onUpdate, onClose }: GNNSettingsProps) {
  const [localSettings, setLocalSettings] = useState<SettingsType>(settings);

  const handleSave = () => {
    onUpdate(localSettings);
    onClose();
  };

  const handleReset = () => {
    const defaultSettings: SettingsType = {
      combatThreshold: 100000,
      showOwnBattles: true,
      showAllianceBattles: true,
      showDiplomacy: true,
      showExploration: true,
      showRankings: true,
      showEvents: true,
      autoRefresh: true,
      refreshInterval: 60,
      maxNewsItems: 100
    };
    setLocalSettings(defaultSettings);
  };

  const updateSetting = (key: keyof SettingsType, value: any) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col max-h-[90vh] w-full max-w-4xl mx-auto bg-card-gradient border border-space-600 rounded-lg shadow-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-space-600 p-6">
        <div>
          <h2 className="text-xl font-orbitron font-bold text-white">
            Configuración GNN
          </h2>
          <p className="text-gray-400 mt-1">
            Personaliza tu experiencia de noticias galácticas
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Content Filters */}
          <div className="space-y-4">
            <h3 className="text-lg font-rajdhani font-semibold text-white flex items-center">
              <Filter className="w-5 h-5 mr-2 text-neon-blue" />
              Filtros de Contenido
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-space-700/30 rounded-lg border border-space-600">
                <div className="flex items-center space-x-3">
                  <Sword className="w-4 h-4 text-neon-red" />
                  <div>
                    <p className="text-sm font-rajdhani font-medium text-white">Combates</p>
                    <p className="text-xs text-gray-400">Batallas y reportes de combate</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localSettings.showOwnBattles}
                    onChange={(e) => updateSetting('showOwnBattles', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-space-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-blue"></div>
                </label>
              </div>

              <div className="ml-6 space-y-2">
                <div className="flex items-center justify-between p-2 bg-space-700/20 rounded border border-space-600/50">
                  <span className="text-xs text-gray-400">Mis batallas</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localSettings.showOwnBattles}
                      onChange={(e) => updateSetting('showOwnBattles', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-space-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-green"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-space-700/20 rounded border border-space-600/50">
                  <span className="text-xs text-gray-400">Batallas de alianza</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localSettings.showAllianceBattles}
                      onChange={(e) => updateSetting('showAllianceBattles', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-space-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-green"></div>
                  </label>
                </div>

                <div className="p-2 bg-space-700/20 rounded border border-space-600/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">Umbral mínimo de puntos</span>
                    <span className="text-xs text-neon-blue font-rajdhani font-medium">
                      {localSettings.combatThreshold.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="1000000"
                    step="10000"
                    value={localSettings.combatThreshold}
                    onChange={(e) => updateSetting('combatThreshold', parseInt(e.target.value))}
                    className="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer slider-combat"
                  />
                </div>
              </div>

              {/* Other Categories */}
              {[
                { key: 'showDiplomacy', icon: Handshake, name: 'Diplomacia', desc: 'Pactos y relaciones', color: 'neon-green' },
                { key: 'showExploration', icon: Star, name: 'Exploración', desc: 'Descubrimientos y expediciones', color: 'neon-purple' },
                { key: 'showRankings', icon: TrendingUp, name: 'Rankings', desc: 'Cambios en clasificaciones', color: 'neon-blue' },
                { key: 'showEvents', icon: Zap, name: 'Eventos', desc: 'Eventos especiales y crisis', color: 'neon-orange' },
              ].map(({ key, icon: Icon, name, desc, color }) => (
                <div key={key} className="flex items-center justify-between p-3 bg-space-700/30 rounded-lg border border-space-600">
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 text-${color}`} />
                    <div>
                      <p className="text-sm font-rajdhani font-medium text-white">{name}</p>
                      <p className="text-xs text-gray-400">{desc}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localSettings[key as keyof SettingsType] as boolean}
                      onChange={(e) => updateSetting(key as keyof SettingsType, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-space-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Display Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-rajdhani font-semibold text-white flex items-center">
              <Settings className="w-5 h-5 mr-2 text-neon-purple" />
              Configuración de Pantalla
            </h3>

            <div className="space-y-4">
              <div className="p-3 bg-space-700/30 rounded-lg border border-space-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4 text-neon-green" />
                    <span className="text-sm font-rajdhani font-medium text-white">Actualización Automática</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localSettings.autoRefresh}
                      onChange={(e) => updateSetting('autoRefresh', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-space-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-green"></div>
                  </label>
                </div>
                
                {localSettings.autoRefresh && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">Intervalo de actualización</span>
                      <span className="text-xs text-neon-green font-rajdhani font-medium">
                        {localSettings.refreshInterval}s
                      </span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="300"
                      step="30"
                      value={localSettings.refreshInterval}
                      onChange={(e) => updateSetting('refreshInterval', parseInt(e.target.value))}
                      className="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                )}
              </div>

              <div className="p-3 bg-space-700/30 rounded-lg border border-space-600">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Hash className="w-4 h-4 text-neon-blue" />
                    <span className="text-sm font-rajdhani font-medium text-white">Máximo de noticias</span>
                  </div>
                  <span className="text-xs text-neon-blue font-rajdhani font-medium">
                    {localSettings.maxNewsItems}
                  </span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="200"
                  step="25"
                  value={localSettings.maxNewsItems}
                  onChange={(e) => updateSetting('maxNewsItems', parseInt(e.target.value))}
                  className="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Preview Settings */}
              <div className="p-3 bg-neon-blue/10 border border-neon-blue/30 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Eye className="w-5 h-5 text-neon-blue mt-0.5" />
                  <div>
                    <h4 className="font-rajdhani font-semibold text-white mb-1">
                      Vista Previa de Configuración
                    </h4>
                    <div className="text-xs text-gray-300 space-y-1">
                      <p>• Mostrando {Object.values(localSettings).filter(v => v === true).length} categorías</p>
                      <p>• Umbral de combate: {localSettings.combatThreshold.toLocaleString()} puntos</p>
                      <p>• Actualización: {localSettings.autoRefresh ? `cada ${localSettings.refreshInterval}s` : 'manual'}</p>
                      <p>• Límite: {localSettings.maxNewsItems} noticias</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with buttons */}
      <div className="border-t border-space-600 p-6">
        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Restablecer
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Guardar Configuración
          </Button>
        </div>
      </div>
    </div>
  );
}