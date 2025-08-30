import React, { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-rajdhani font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-space-800 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-neon-blue hover:bg-neon-blue/80 text-white focus:ring-neon-blue shadow-[0_0_10px_rgba(0,212,255,0.3)] hover:shadow-[0_0_20px_rgba(0,212,255,0.5)]',
    secondary: 'bg-space-600 hover:bg-space-500 text-white border border-space-500 hover:border-neon-purple/50',
    success: 'bg-neon-green hover:bg-neon-green/80 text-white focus:ring-neon-green shadow-[0_0_10px_rgba(16,185,129,0.3)]',
    danger: 'bg-neon-red hover:bg-neon-red/80 text-white focus:ring-neon-red shadow-[0_0_10px_rgba(239,68,68,0.3)]',
    warning: 'bg-neon-orange hover:bg-neon-orange/80 text-white focus:ring-neon-orange shadow-[0_0_10px_rgba(245,158,11,0.3)]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
}