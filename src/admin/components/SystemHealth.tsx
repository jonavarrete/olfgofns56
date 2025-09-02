import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import AdminCard from './AdminCard';
import { 
  Server, 
  Database, 
  Wifi, 
  HardDrive,
  Cpu,
  MemoryStick,
  AlertTriangle,
  CheckCircle,
  Activity,
  RefreshCw
} from 'lucide-react';

interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  database: {
    connections: number;
    queryTime: number;
    size: number;
  };
  api: {
    responseTime: number;
    requestsPerMinute: number;
    errorRate: number;
  };
}

export default function SystemHealth() {
  const { state } = useAdmin();
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSystemMetrics();
    
    // Refresh every 10 seconds
    const interval = setInterval(loadSystemMetrics, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadSystemMetrics = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const mockMetrics: SystemMetrics = {
        cpu: Math.random() * 30 + 40, // 40-70%
        memory: Math.random() * 20 + 60, // 60-80%
        disk: Math.random() * 15 + 25, // 25-40%
        network: Math.random() * 40 + 30, // 30-70%
        database: {
          connections: Math.floor(Math.random() * 50) + 100,
          queryTime: Math.random() * 50 + 10,
          size: state.stats.databaseSize
        },
        api: {
          responseTime: Math.random() * 100 + 50,
          requestsPerMinute: Math.floor(Math.random() * 1000) + 2000,
          errorRate: Math.random() * 2
        }
      };
      
      setMetrics(mockMetrics);
    } catch (error) {
      console.error('Error loading system metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getHealthColor = (value: number, thresholds: { warning: number; critical: number }) => {
    if (value >= thresholds.critical) return 'text-neon-red';
    if (value >= thresholds.warning) return 'text-neon-orange';
    return 'text-neon-green';
  };

  const getHealthStatus = (value: number, thresholds: { warning: number; critical: number }) => {
    if (value >= thresholds.critical) return 'Crítico';
    if (value >= thresholds.warning) return 'Advertencia';
    return 'Saludable';
  };

  if (loading || !metrics) {
    return (
      <AdminCard title="Estado del Sistema" icon={Server} color="neon-green">
        <div className="flex items-center justify-center py-8">
          <RefreshCw className="w-6 h-6 text-neon-blue animate-spin" />
          <span className="ml-3 text-gray-400">Cargando métricas...</span>
        </div>
      </AdminCard>
    );
  }

  return (
    <AdminCard title="Estado del Sistema" icon={Server} color="neon-green">
      <div className="space-y-4">
        {/* CPU */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">CPU</span>
            </div>
            <span className={`font-rajdhani font-medium ${getHealthColor(metrics.cpu, { warning: 70, critical: 85 })}`}>
              {metrics.cpu.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-space-600 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                metrics.cpu >= 85 ? 'bg-neon-red' : 
                metrics.cpu >= 70 ? 'bg-neon-orange' : 'bg-neon-green'
              }`}
              style={{ width: `${metrics.cpu}%` }}
            />
          </div>
        </div>

        {/* Memory */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MemoryStick className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Memoria</span>
            </div>
            <span className={`font-rajdhani font-medium ${getHealthColor(metrics.memory, { warning: 80, critical: 90 })}`}>
              {metrics.memory.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-space-600 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                metrics.memory >= 90 ? 'bg-neon-red' : 
                metrics.memory >= 80 ? 'bg-neon-orange' : 'bg-neon-green'
              }`}
              style={{ width: `${metrics.memory}%` }}
            />
          </div>
        </div>

        {/* Disk */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <HardDrive className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Disco</span>
            </div>
            <span className={`font-rajdhani font-medium ${getHealthColor(metrics.disk, { warning: 80, critical: 90 })}`}>
              {metrics.disk.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-space-600 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                metrics.disk >= 90 ? 'bg-neon-red' : 
                metrics.disk >= 80 ? 'bg-neon-orange' : 'bg-neon-green'
              }`}
              style={{ width: `${metrics.disk}%` }}
            />
          </div>
        </div>

        {/* Database Stats */}
        <div className="pt-3 border-t border-space-600">
          <h4 className="text-sm font-rajdhani font-semibold text-white mb-3 flex items-center">
            <Database className="w-4 h-4 mr-2 text-neon-blue" />
            Base de Datos
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Conexiones:</span>
              <span className="text-white font-rajdhani font-medium">
                {metrics.database.connections}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Tiempo de consulta:</span>
              <span className={`font-rajdhani font-medium ${
                metrics.database.queryTime > 100 ? 'text-neon-red' : 
                metrics.database.queryTime > 50 ? 'text-neon-orange' : 'text-neon-green'
              }`}>
                {metrics.database.queryTime.toFixed(1)}ms
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Tamaño:</span>
              <span className="text-white font-rajdhani font-medium">
                {metrics.database.size.toFixed(1)} GB
              </span>
            </div>
          </div>
        </div>

        {/* API Stats */}
        <div className="pt-3 border-t border-space-600">
          <h4 className="text-sm font-rajdhani font-semibold text-white mb-3 flex items-center">
            <Wifi className="w-4 h-4 mr-2 text-neon-green" />
            API
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Tiempo de respuesta:</span>
              <span className={`font-rajdhani font-medium ${
                metrics.api.responseTime > 200 ? 'text-neon-red' : 
                metrics.api.responseTime > 100 ? 'text-neon-orange' : 'text-neon-green'
              }`}>
                {metrics.api.responseTime.toFixed(0)}ms
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Requests/min:</span>
              <span className="text-white font-rajdhani font-medium">
                {metrics.api.requestsPerMinute.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Tasa de error:</span>
              <span className={`font-rajdhani font-medium ${
                metrics.api.errorRate > 5 ? 'text-neon-red' : 
                metrics.api.errorRate > 2 ? 'text-neon-orange' : 'text-neon-green'
              }`}>
                {metrics.api.errorRate.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </AdminCard>
  );
}