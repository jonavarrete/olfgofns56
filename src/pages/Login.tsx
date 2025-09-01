import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/UI/Button';
import GalacticNewsNetwork from '../components/News/GalacticNewsNetwork';
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
  const navigate = useNavigate();
  
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  // Handle successful authentication
  useEffect(() => {
    if (state.isAuthenticated && state.user && !state.loading) {
      navigate('/lobby', { replace: true });
    }
  }, [state.isAuthenticated, state.user, state.loading, navigate]);
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

  const handleDemoLogin = async () => {
    setFormData({
      email: 'demo@galaxy.com',
      password: 'demo123',
      username: '',
      confirmPassword: ''
    });
    await login('demo@galaxy.com', 'demo123');
  };

  return (
    <div className="min-h-screen bg-space-gradient relative overflow-hidden">
      Coming Soon
    </div>
  );
}