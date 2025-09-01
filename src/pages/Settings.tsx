import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { useTranslation } from '../hooks/useTranslation';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { 
  Settings as SettingsIcon, 
  Globe, 
  Bell, 
  Monitor, 
  Volume2, 
  VolumeX,
  Eye,
  EyeOff,
  Palette,
  Gamepad2,
  Save,
  RotateCcw
} from 'lucide-react';

export default function Settings() {
  const { state, updateSettings } = useGame();
  const { t } = useTranslation();
  const [localSettings, setLocalSettings] = useState(state.settings);
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'graphics' | 'gameplay'>('general');

  const tabs = [
    { key: 'general' as const, name: 'General', icon: SettingsIcon },
    { key: 'notifications' as const, name: 'Notificaciones', icon: Bell },
    { key: 'graphics' as const, name: 'Gráficos', icon: Monitor },
    { key: 'gameplay' as const, name: 'Jugabilidad', icon: Gamepad2 },
  ];

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  const handleSave = () => {
    updateSettings(localSettings);
  };

  const handleReset = () => {
    setLocalSettings(state.settings);
  };

  const updateLocalSetting = (category: string, key: string, value: any) => {
    setLocalSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white">
            Configuración
          </h1>
          <p className="text-gray-400 mt-1">
            Personaliza tu experiencia de juego
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Restablecer
          </Button>
          <Button variant="success" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Guardar Cambios
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-space-800 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center space-x-2 flex-1 px-4 py-2 text-sm font-rajdhani font-medium rounded-md transition-all duration-200 ${
              activeTab === tab.key
                ? 'bg-neon-blue text-white shadow-[0_0_10px_rgba(0,212,255,0.3)]'
                : 'text-gray-400 hover:text-white hover:bg-space-600'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Idioma y Región" glowing>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-300 mb-3">
                  Idioma del juego
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => updateLocalSetting('', 'language', lang.code)}
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                        localSettings.language === lang.code
                          ? 'bg-neon-blue/20 border-neon-blue/50 text-neon-blue'
                          : 'bg-space-700/50 border-space-600 text-gray-300 hover:border-space-500'
                      }`}
                    >
                      <span className="text-2xl">{lang.flag}</span>
                      <span className="font-rajdhani font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-300 mb-3">
                  Tema
                </label>
                <div className="flex space-x-2">
                  {['dark', 'light', 'auto'].map((theme) => (
                    <button
                      key={theme}
                      onClick={() => updateLocalSetting('', 'theme', theme)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                        localSettings.theme === theme
                          ? 'bg-neon-purple/20 border-neon-purple/50 text-neon-purple'
                          : 'bg-space-700/50 border-space-600 text-gray-300 hover:border-space-500'
                      }`}
                    >
                      <Palette className="w-4 h-4" />
                      <span className="font-rajdhani font-medium capitalize">{theme}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card title="Información de la Cuenta">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-space-700/30 rounded-lg">
                <span className="text-gray-300">Comandante:</span>
                <span className="font-rajdhani font-semibold text-white">{state.player.username}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-space-700/30 rounded-lg">
                <span className="text-gray-300">Nivel:</span>
                <span className="font-rajdhani font-semibold text-white">{state.player.level}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-space-700/30 rounded-lg">
                <span className="text-gray-300">Rango:</span>
                <span className="font-rajdhani font-semibold text-white">#{state.player.rank}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-space-700/30 rounded-lg">
                <span className="text-gray-300">Puntos:</span>
                <span className="font-rajdhani font-semibold text-white">{state.player.points.toLocaleString()}</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Notifications Settings */}
      {activeTab === 'notifications' && (
        <Card title="Configuración de Notificaciones" glowing>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-rajdhani font-semibold text-white mb-4">
                  Métodos de Notificación
                </h4>
                <div className="space-y-3">
                  {[
                    { key: 'sound', name: 'Sonido', icon: localSettings.notifications.sound ? Volume2 : VolumeX },
                    { key: 'desktop', name: 'Notificaciones del navegador', icon: Monitor },
                    { key: 'email', name: 'Correo electrónico', icon: Bell },
                  ].map(({ key, name, icon: Icon }) => (
                    <label key={key} className="flex items-center justify-between p-3 bg-space-700/30 rounded-lg cursor-pointer hover:bg-space-600/30 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-neon-blue" />
                        <span className="text-gray-300">{name}</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={localSettings.notifications[key as keyof typeof localSettings.notifications]}
                        onChange={(e) => updateLocalSetting('notifications', key, e.target.checked)}
                        className="w-5 h-5 text-neon-blue bg-space-600 border-space-500 rounded focus:ring-neon-blue focus:ring-2"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-rajdhani font-semibold text-white mb-4">
                  Tipos de Eventos
                </h4>
                <div className="space-y-3">
                  {[
                    { key: 'buildingComplete', name: 'Construcción completada' },
                    { key: 'researchComplete', name: 'Investigación completada' },
                    { key: 'fleetArrival', name: 'Llegada de flota' },
                    { key: 'underAttack', name: 'Bajo ataque' },
                  ].map(({ key, name }) => (
                    <label key={key} className="flex items-center justify-between p-3 bg-space-700/30 rounded-lg cursor-pointer hover:bg-space-600/30 transition-colors">
                      <span className="text-gray-300">{name}</span>
                      <input
                        type="checkbox"
                        checked={localSettings.notifications[key as keyof typeof localSettings.notifications]}
                        onChange={(e) => updateLocalSetting('notifications', key, e.target.checked)}
                        className="w-5 h-5 text-neon-blue bg-space-600 border-space-500 rounded focus:ring-neon-blue focus:ring-2"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Graphics Settings */}
      {activeTab === 'graphics' && (
        <Card title="Configuración Gráfica" glowing>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-rajdhani font-medium text-gray-300 mb-3">
                Calidad Gráfica
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['low', 'medium', 'high', 'ultra'].map((quality) => (
                  <button
                    key={quality}
                    onClick={() => updateLocalSetting('graphics', 'quality', quality)}
                    className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                      localSettings.graphics.quality === quality
                        ? 'bg-neon-green/20 border-neon-green/50 text-neon-green'
                        : 'bg-space-700/50 border-space-600 text-gray-300 hover:border-space-500'
                    }`}
                  >
                    <span className="font-rajdhani font-medium capitalize">{quality}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { key: 'animations', name: 'Animaciones', icon: localSettings.graphics.animations ? Eye : EyeOff },
                { key: 'particles', name: 'Efectos de partículas', icon: localSettings.graphics.particles ? Eye : EyeOff },
                { key: 'backgroundEffects', name: 'Efectos de fondo', icon: localSettings.graphics.backgroundEffects ? Eye : EyeOff },
              ].map(({ key, name, icon: Icon }) => (
                <label key={key} className="flex items-center justify-between p-4 bg-space-700/30 rounded-lg cursor-pointer hover:bg-space-600/30 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-neon-purple" />
                    <span className="text-gray-300">{name}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={localSettings.graphics[key as keyof typeof localSettings.graphics]}
                    onChange={(e) => updateLocalSetting('graphics', key, e.target.checked)}
                    className="w-5 h-5 text-neon-purple bg-space-600 border-space-500 rounded focus:ring-neon-purple focus:ring-2"
                  />
                </label>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Gameplay Settings */}
      {activeTab === 'gameplay' && (
        <Card title="Configuración de Jugabilidad" glowing>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-rajdhani font-semibold text-white mb-4">
                  Interfaz
                </h4>
                <div className="space-y-3">
                  {[
                    { key: 'confirmActions', name: 'Confirmar acciones importantes' },
                    { key: 'showTooltips', name: 'Mostrar tooltips de ayuda' },
                  ].map(({ key, name }) => (
                    <label key={key} className="flex items-center justify-between p-3 bg-space-700/30 rounded-lg cursor-pointer hover:bg-space-600/30 transition-colors">
                      <span className="text-gray-300">{name}</span>
                      <input
                        type="checkbox"
                        checked={localSettings.gameplay[key as keyof typeof localSettings.gameplay]}
                        onChange={(e) => updateLocalSetting('gameplay', key, e.target.checked)}
                        className="w-5 h-5 text-neon-orange bg-space-600 border-space-500 rounded focus:ring-neon-orange focus:ring-2"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-rajdhani font-semibold text-white mb-4">
                  Actualización Automática
                </h4>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-3 bg-space-700/30 rounded-lg cursor-pointer hover:bg-space-600/30 transition-colors">
                    <span className="text-gray-300">Actualización automática</span>
                    <input
                      type="checkbox"
                      checked={localSettings.gameplay.autoRefresh}
                      onChange={(e) => updateLocalSetting('gameplay', 'autoRefresh', e.target.checked)}
                      className="w-5 h-5 text-neon-orange bg-space-600 border-space-500 rounded focus:ring-neon-orange focus:ring-2"
                    />
                  </label>

                  {localSettings.gameplay.autoRefresh && (
                    <div>
                      <label className="block text-sm font-rajdhani font-medium text-gray-300 mb-2">
                        Intervalo de actualización (segundos)
                      </label>
                      <input
                        type="range"
                        min="5"
                        max="60"
                        value={localSettings.gameplay.refreshInterval}
                        onChange={(e) => updateLocalSetting('gameplay', 'refreshInterval', parseInt(e.target.value))}
                        className="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>5s</span>
                        <span className="text-neon-orange font-rajdhani font-medium">
                          {localSettings.gameplay.refreshInterval}s
                        </span>
                        <span>60s</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}