import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info,
  Shield,
  Zap,
  Users,
  Globe,
  Package,
  Target,
  Clock,
  Database,
  Server,
  Activity
} from 'lucide-react';

interface ValidationRule {
  id: string;
  name: string;
  description: string;
  category: 'critical' | 'warning' | 'info';
  check: (config: any) => boolean;
  recommendation?: string;
}

interface OGameConfigValidatorProps {
  config: any;
  onValidationChange: (isValid: boolean, issues: ValidationIssue[]) => void;
}

interface ValidationIssue {
  rule: ValidationRule;
  passed: boolean;
  message: string;
}

const validationRules: ValidationRule[] = [
  // Critical Rules
  {
    id: 'maintenance_mode_check',
    name: 'Modo Mantenimiento',
    description: 'El servidor no debe estar en modo mantenimiento para operación normal',
    category: 'critical',
    check: (config) => !config.maintenanceMode,
    recommendation: 'Desactiva el modo mantenimiento para permitir acceso de jugadores'
  },
  {
    id: 'registration_check',
    name: 'Registro de Usuarios',
    description: 'El registro debe estar habilitado para nuevos jugadores',
    category: 'warning',
    check: (config) => config.registrationOpen,
    recommendation: 'Habilita el registro para permitir nuevos jugadores'
  },
  {
    id: 'speed_multiplier_check',
    name: 'Multiplicador de Velocidad',
    description: 'La velocidad debe estar en un rango razonable (1-10x)',
    category: 'warning',
    check: (config) => config.speedMultiplier >= 1 && config.speedMultiplier <= 10,
    recommendation: 'Mantén la velocidad entre 1x y 10x para balance del juego'
  },
  {
    id: 'max_players_check',
    name: 'Límite de Jugadores',
    description: 'El límite de jugadores debe ser realista para el hardware',
    category: 'warning',
    check: (config) => config.maxPlayersGlobal >= 1000 && config.maxPlayersGlobal <= 100000,
    recommendation: 'Configura un límite entre 1,000 y 100,000 jugadores'
  },
  {
    id: 'contact_email_check',
    name: 'Email de Contacto',
    description: 'Debe haber un email de contacto válido configurado',
    category: 'critical',
    check: (config) => config.contactEmail && config.contactEmail.includes('@'),
    recommendation: 'Configura un email de contacto válido'
  },
  {
    id: 'newbie_protection_check',
    name: 'Protección de Novatos',
    description: 'La protección debe estar entre 3 y 14 días',
    category: 'info',
    check: (config) => config.newbieProtection >= 3 && config.newbieProtection <= 14,
    recommendation: 'Configura protección entre 3 y 14 días'
  },
  {
    id: 'debris_field_check',
    name: 'Campo de Escombros',
    description: 'El porcentaje debe estar entre 10% y 50%',
    category: 'info',
    check: (config) => config.debrisFieldPercentage >= 10 && config.debrisFieldPercentage <= 50,
    recommendation: 'Mantén el campo de escombros entre 10% y 50%'
  },
  {
    id: 'backup_interval_check',
    name: 'Intervalo de Backup',
    description: 'Los backups deben realizarse al menos cada 12 horas',
    category: 'warning',
    check: (config) => config.autoBackup && config.backupInterval <= 12,
    recommendation: 'Configura backups automáticos cada 12 horas o menos'
  },
  {
    id: 'security_features_check',
    name: 'Características de Seguridad',
    description: 'Al menos 2 características de seguridad deben estar activas',
    category: 'warning',
    check: (config) => {
      const securityFeatures = [
        config.multiAccountDetection,
        config.botDetection,
        config.ipLogging
      ].filter(Boolean);
      return securityFeatures.length >= 2;
    },
    recommendation: 'Activa al menos 2 características de seguridad'
  },
  {
    id: 'core_features_check',
    name: 'Características Principales',
    description: 'Las características principales del juego deben estar habilitadas',
    category: 'info',
    check: (config) => config.alliances && config.expeditions,
    recommendation: 'Habilita alianzas y expediciones para la experiencia completa'
  }
];

export default function OGameConfigValidator({ config, onValidationChange }: OGameConfigValidatorProps) {
  const [validationResults, setValidationResults] = useState<ValidationIssue[]>([]);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    validateConfiguration();
  }, [config]);

  const validateConfiguration = () => {
    const results: ValidationIssue[] = validationRules.map(rule => {
      const passed = rule.check(config);
      return {
        rule,
        passed,
        message: passed ? 'Configuración correcta' : (rule.recommendation || 'Configuración incorrecta')
      };
    });

    setValidationResults(results);
    
    const criticalIssues = results.filter(r => !r.passed && r.rule.category === 'critical');
    const valid = criticalIssues.length === 0;
    setIsValid(valid);
    
    onValidationChange(valid, results.filter(r => !r.passed));
  };

  const getCategoryIcon = (category: ValidationRule['category']) => {
    switch (category) {
      case 'critical': return XCircle;
      case 'warning': return AlertTriangle;
      case 'info': return Info;
    }
  };

  const getCategoryColor = (category: ValidationRule['category']) => {
    switch (category) {
      case 'critical': return 'text-neon-red';
      case 'warning': return 'text-neon-orange';
      case 'info': return 'text-neon-blue';
    }
  };

  const getCategoryBg = (category: ValidationRule['category']) => {
    switch (category) {
      case 'critical': return 'bg-neon-red/10 border-neon-red/30';
      case 'warning': return 'bg-neon-orange/10 border-neon-orange/30';
      case 'info': return 'bg-neon-blue/10 border-neon-blue/30';
    }
  };

  const criticalIssues = validationResults.filter(r => !r.passed && r.rule.category === 'critical');
  const warningIssues = validationResults.filter(r => !r.passed && r.rule.category === 'warning');
  const infoIssues = validationResults.filter(r => !r.passed && r.rule.category === 'info');
  const passedChecks = validationResults.filter(r => r.passed);

  return (
    <div className="space-y-4">
      {/* Validation Summary */}
      <div className={`p-4 rounded-lg border ${
        isValid 
          ? 'bg-neon-green/10 border-neon-green/30' 
          : 'bg-neon-red/10 border-neon-red/30'
      }`}>
        <div className="flex items-center space-x-3">
          {isValid ? (
            <CheckCircle className="w-6 h-6 text-neon-green" />
          ) : (
            <XCircle className="w-6 h-6 text-neon-red" />
          )}
          <div>
            <h3 className={`font-rajdhani font-semibold ${
              isValid ? 'text-neon-green' : 'text-neon-red'
            }`}>
              {isValid ? 'Configuración Válida' : 'Configuración con Problemas'}
            </h3>
            <p className="text-sm text-gray-400">
              {passedChecks.length}/{validationResults.length} verificaciones pasadas
              {criticalIssues.length > 0 && ` • ${criticalIssues.length} problemas críticos`}
              {warningIssues.length > 0 && ` • ${warningIssues.length} advertencias`}
            </p>
          </div>
        </div>
      </div>

      {/* Critical Issues */}
      {criticalIssues.length > 0 && (
        <div className="p-4 bg-neon-red/10 border border-neon-red/30 rounded-lg">
          <h4 className="font-rajdhani font-semibold text-neon-red mb-3 flex items-center">
            <XCircle className="w-5 h-5 mr-2" />
            Problemas Críticos ({criticalIssues.length})
          </h4>
          <div className="space-y-2">
            {criticalIssues.map((issue, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-space-700/30 rounded border border-space-600">
                <XCircle className="w-4 h-4 text-neon-red mt-0.5" />
                <div>
                  <p className="text-sm font-rajdhani font-medium text-white">
                    {issue.rule.name}
                  </p>
                  <p className="text-xs text-gray-400">{issue.rule.description}</p>
                  <p className="text-xs text-neon-red mt-1">{issue.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warning Issues */}
      {warningIssues.length > 0 && (
        <div className="p-4 bg-neon-orange/10 border border-neon-orange/30 rounded-lg">
          <h4 className="font-rajdhani font-semibold text-neon-orange mb-3 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Advertencias ({warningIssues.length})
          </h4>
          <div className="space-y-2">
            {warningIssues.map((issue, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-space-700/30 rounded border border-space-600">
                <AlertTriangle className="w-4 h-4 text-neon-orange mt-0.5" />
                <div>
                  <p className="text-sm font-rajdhani font-medium text-white">
                    {issue.rule.name}
                  </p>
                  <p className="text-xs text-gray-400">{issue.rule.description}</p>
                  <p className="text-xs text-neon-orange mt-1">{issue.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Issues */}
      {infoIssues.length > 0 && (
        <div className="p-4 bg-neon-blue/10 border border-neon-blue/30 rounded-lg">
          <h4 className="font-rajdhani font-semibold text-neon-blue mb-3 flex items-center">
            <Info className="w-5 h-5 mr-2" />
            Recomendaciones ({infoIssues.length})
          </h4>
          <div className="space-y-2">
            {infoIssues.map((issue, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-space-700/30 rounded border border-space-600">
                <Info className="w-4 h-4 text-neon-blue mt-0.5" />
                <div>
                  <p className="text-sm font-rajdhani font-medium text-white">
                    {issue.rule.name}
                  </p>
                  <p className="text-xs text-gray-400">{issue.rule.description}</p>
                  <p className="text-xs text-neon-blue mt-1">{issue.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Passed Checks Summary */}
      {passedChecks.length > 0 && (
        <div className="p-4 bg-neon-green/10 border border-neon-green/30 rounded-lg">
          <h4 className="font-rajdhani font-semibold text-neon-green mb-3 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Verificaciones Exitosas ({passedChecks.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {passedChecks.map((check, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-space-700/30 rounded border border-space-600">
                <CheckCircle className="w-3 h-3 text-neon-green" />
                <span className="text-xs text-gray-300">{check.rule.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}