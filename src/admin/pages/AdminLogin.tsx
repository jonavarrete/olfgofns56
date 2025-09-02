import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import Button from '../../components/UI/Button';
import { 
  Shield, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff,
  AlertTriangle,
  Server,
  Database,
  Settings
} from 'lucide-react';

export default function AdminLogin() {
  const { state, login } = useAdmin();
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (state.currentAdmin) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [state.currentAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'admin@galaxy.com',
      password: 'admin123'
    });
  };

  return (
    <div className="min-h-screen bg-space-gradient relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-neon-blue rounded-full animate-pulse opacity-80"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-neon-purple rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-neon-green rounded-full animate-pulse opacity-60"></div>
        
        {/* Security Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 144 }, (_, i) => (
              <div key={i} className="border border-neon-blue/20"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-neon-red/20 rounded-full border-2 border-neon-red/30 mb-6 animate-glow">
              <Shield className="w-10 h-10 text-neon-red" />
            </div>
            <h1 className="text-4xl font-orbitron font-bold text-white mb-2 animate-pulse-neon">
              Admin Panel
            </h1>
            <p className="text-gray-400 font-rajdhani">
              Sistema de Administración • Galactic Empire
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-card-gradient border border-space-600 rounded-xl p-8 backdrop-blur-sm shadow-2xl">
            <div className="mb-6">
              <div className="flex items-center space-x-2 p-3 bg-neon-red/10 border border-neon-red/30 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-neon-red" />
                <span className="text-sm text-neon-red font-rajdhani font-medium">
                  Acceso Restringido - Solo Personal Autorizado
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                  Email de Administrador
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white placeholder-gray-500 focus:border-neon-red focus:outline-none transition-colors"
                    placeholder="admin@galaxy.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-400 mb-2">
                  Contraseña de Seguridad
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 bg-space-700/50 border border-space-600 rounded-lg text-white placeholder-gray-500 focus:border-neon-red focus:outline-none transition-colors"
                    placeholder="••••••••"
                    required
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
                variant="danger"
                loading={state.loading}
                className="w-full py-3 text-base font-rajdhani font-semibold"
              >
                Acceder al Panel de Control
              </Button>
            </form>

            {/* Demo Login */}
            <div className="mt-6 pt-6 border-t border-space-600">
              <Button
                variant="secondary"
                onClick={handleDemoLogin}
                className="w-full py-2 font-rajdhani font-medium"
                disabled={state.loading}
              >
                <Settings className="w-4 h-4 mr-2" />
                Demo Admin (admin@galaxy.com / admin123)
              </Button>
            </div>

            {/* Security Features */}
            <div className="mt-8 pt-6 border-t border-space-600">
              <h3 className="text-sm font-rajdhani font-semibold text-white mb-4 text-center">
                Características de Seguridad
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <div className="w-8 h-8 bg-neon-red/20 rounded-lg flex items-center justify-center mx-auto">
                    <Shield className="w-4 h-4 text-neon-red" />
                  </div>
                  <p className="text-xs text-gray-400">Autenticación 2FA</p>
                </div>
                <div className="space-y-2">
                  <div className="w-8 h-8 bg-neon-blue/20 rounded-lg flex items-center justify-center mx-auto">
                    <Database className="w-4 h-4 text-neon-blue" />
                  </div>
                  <p className="text-xs text-gray-400">Logs de Auditoría</p>
                </div>
                <div className="space-y-2">
                  <div className="w-8 h-8 bg-neon-green/20 rounded-lg flex items-center justify-center mx-auto">
                    <Server className="w-4 h-4 text-neon-green" />
                  </div>
                  <p className="text-xs text-gray-400">Monitoreo 24/7</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-xs text-gray-500">
            <p>© 2025 Galactic Empire Admin System</p>
            <p className="mt-1">Versión 2.0 - Acceso Autorizado Únicamente</p>
          </div>
        </div>
      </div>
    </div>
  );
}