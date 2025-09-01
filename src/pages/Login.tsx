import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/UI/Button';
import { 
  Rocket, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff,
  Star,
  Globe,
  Zap
} from 'lucide-react';

export default function Login() {
  const { state, login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRegister) {
      if (formData.password !== formData.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
      if (formData.password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres');
        return;
      }
      await register(formData.email, formData.username, formData.password);
    } else {
      await login(formData.email, formData.password);
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@galaxy.com',
      password: 'demo123',
      username: '',
      confirmPassword: ''
    });
    login('demo@galaxy.com', 'demo123');
  };

  return (
    <div className="min-h-screen bg-space-gradient relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-neon-blue rounded-full animate-pulse opacity-80"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-neon-purple rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-neon-green rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-neon-orange rounded-full animate-pulse opacity-50"></div>
        
        {/* Floating planets */}
        <div className="absolute top-1/4 left-1/3 w-32 h-32 rounded-full bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 animate-float opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 rounded-full bg-gradient-to-br from-neon-green/20 to-neon-orange/20 animate-float opacity-20" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-neon-blue/20 rounded-full border-2 border-neon-blue/30 mb-6 animate-glow">
              <Rocket className="w-10 h-10 text-neon-blue" />
            </div>
            <h1 className="text-4xl font-orbitron font-bold text-white mb-2 animate-pulse-neon">
              Galactic Empire
            </h1>
            <p className="text-gray-400 font-rajdhani">
              Conquista la galaxia • Construye tu imperio • Domina las estrellas
            </p>
          </div>

          {/* Login/Register Form */}
          <div className="bg-card-gradient border border-space-600 rounded-xl p-8 backdrop-blur-sm shadow-2xl">
            <div className="mb-6">
              <div className="flex bg-space-700/50 rounded-lg p-1">
                <button
                  onClick={() => setIsRegister(false)}
                  className={`flex-1 py-2 px-4 rounded-md font-rajdhani font-medium transition-all duration-200 ${
                    !isRegister 
                      ? 'bg-neon-blue text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => setIsRegister(true)}
                  className={`flex-1 py-2 px-4 rounded-md font-rajdhani font-medium transition-all duration-200 ${
                    isRegister 
                      ? 'bg-neon-blue text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Registrarse
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none transition-colors"
                    placeholder="comandante@galaxy.com"
                    required
                  />
                </div>
              </div>

              {/* Username (only for register) */}
              {isRegister && (
                <div>
                  <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                    Nombre de Usuario
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none transition-colors"
                      placeholder="ComandanteEstelar"
                      required
                      minLength={3}
                      maxLength={20}
                    />
                  </div>
                </div>
              )}

              {/* Password */}
              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none transition-colors"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password (only for register) */}
              {isRegister && (
                <div>
                  <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                    Confirmar Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none transition-colors"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
              )}

              {/* Error Message */}
              {state.error && (
                <div className="p-3 bg-neon-red/10 border border-neon-red/30 rounded-lg">
                  <p className="text-sm text-neon-red font-rajdhani font-medium">
                    {state.error}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                loading={state.loading}
                className="w-full py-3 text-base font-rajdhani font-semibold"
              >
                {isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
              </Button>
            </form>

            {/* Demo Login */}
            {!isRegister && (
              <div className="mt-6 pt-6 border-t border-space-600">
                <Button
                  variant="secondary"
                  onClick={handleDemoLogin}
                  className="w-full py-2 font-rajdhani font-medium"
                  disabled={state.loading}
                >
                  <Star className="w-4 h-4 mr-2" />
                  Probar Demo (demo@galaxy.com / demo123)
                </Button>
              </div>
            )}

            {/* Features */}
            <div className="mt-8 pt-6 border-t border-space-600">
              <h3 className="text-sm font-rajdhani font-semibold text-white mb-4 text-center">
                Características del Juego
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <div className="w-8 h-8 bg-neon-blue/20 rounded-lg flex items-center justify-center mx-auto">
                    <Globe className="w-4 h-4 text-neon-blue" />
                  </div>
                  <p className="text-xs text-gray-400">Múltiples Universos</p>
                </div>
                <div className="space-y-2">
                  <div className="w-8 h-8 bg-neon-green/20 rounded-lg flex items-center justify-center mx-auto">
                    <Rocket className="w-4 h-4 text-neon-green" />
                  </div>
                  <p className="text-xs text-gray-400">Flotas Épicas</p>
                </div>
                <div className="space-y-2">
                  <div className="w-8 h-8 bg-neon-purple/20 rounded-lg flex items-center justify-center mx-auto">
                    <Zap className="w-4 h-4 text-neon-purple" />
                  </div>
                  <p className="text-xs text-gray-400">Tecnología Avanzada</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-xs text-gray-500">
            <p>© 2025 Galactic Empire. Todos los derechos reservados.</p>
            <p className="mt-1">Versión 2.0 Next Generation</p>
          </div>
        </div>
      </div>
    </div>
  );
}