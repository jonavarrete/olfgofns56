export class ConfigExportUtils {
  static exportToJSON(config: any): string {
    const exportData = {
      metadata: {
        exportDate: new Date().toISOString(),
        version: '2.0',
        type: 'ogame_server_config',
        description: 'Configuración completa del servidor OGame'
      },
      config: {
        ...config,
        // Add server-specific metadata
        lastModified: Date.now(),
        configVersion: '2.0.1'
      }
    };

    return JSON.stringify(exportData, null, 2);
  }

  static downloadConfig(config: any, filename: string = 'ogame-config.json'): void {
    const jsonData = this.exportToJSON(config);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }

  static validateImportedConfig(jsonData: string): { valid: boolean; config?: any; errors: string[] } {
    const errors: string[] = [];
    
    try {
      const data = JSON.parse(jsonData);
      
      if (!data.config) {
        errors.push('Formato de configuración inválido: falta objeto config');
        return { valid: false, errors };
      }

      const config = data.config;
      
      // Validate required fields
      const requiredFields = [
        'gameName', 'gameVersion', 'contactEmail', 'serverName',
        'speedMultiplier', 'maxPlayersGlobal', 'newbieProtection'
      ];

      requiredFields.forEach(field => {
        if (config[field] === undefined || config[field] === null) {
          errors.push(`Campo requerido faltante: ${field}`);
        }
      });

      // Validate data types and ranges
      if (typeof config.speedMultiplier !== 'number' || config.speedMultiplier < 1 || config.speedMultiplier > 50) {
        errors.push('speedMultiplier debe ser un número entre 1 y 50');
      }

      if (typeof config.maxPlayersGlobal !== 'number' || config.maxPlayersGlobal < 100) {
        errors.push('maxPlayersGlobal debe ser un número mayor a 100');
      }

      if (typeof config.newbieProtection !== 'number' || config.newbieProtection < 0 || config.newbieProtection > 30) {
        errors.push('newbieProtection debe ser un número entre 0 y 30');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (config.contactEmail && !emailRegex.test(config.contactEmail)) {
        errors.push('contactEmail debe tener un formato válido');
      }

      return {
        valid: errors.length === 0,
        config: errors.length === 0 ? config : undefined,
        errors
      };

    } catch (error) {
      errors.push('JSON inválido: ' + (error as Error).message);
      return { valid: false, errors };
    }
  }

  static generateConfigTemplate(): any {
    return {
      // Basic Information
      gameName: 'Mi Servidor OGame',
      gameVersion: '2.0',
      gameDescription: 'Servidor personalizado de OGame',
      gameTagline: 'Conquista las estrellas',
      
      // Contact
      contactEmail: 'admin@mi-servidor.com',
      supportEmail: 'soporte@mi-servidor.com',
      adminEmail: 'admin@mi-servidor.com',
      contactPhone: '',
      
      // Server
      serverName: 'Mi Servidor',
      serverRegion: 'Europa (Madrid)',
      maxPlayersGlobal: 10000,
      maintenanceMode: false,
      registrationOpen: true,
      
      // Game Mechanics
      speedMultiplier: 1,
      economySpeed: 1,
      fleetSpeed: 1,
      researchSpeed: 1,
      buildingSpeed: 1,
      
      // Protection
      newbieProtection: 7,
      strongPlayerProtection: true,
      honorableTargetProtection: true,
      vacationMode: true,
      
      // Combat
      rapidFire: true,
      debrisFieldPercentage: 30,
      fleetCrashPercentage: 1,
      defenseRepairPercentage: 70,
      
      // Features
      alliances: true,
      acs: true,
      expeditions: true,
      officers: true,
      darkMatter: true,
      marketplace: true,
      
      // Security
      multiAccountDetection: true,
      botDetection: true,
      vpnBlocking: false,
      ipLogging: true,
      
      // Backup
      autoBackup: true,
      backupInterval: 6,
      maintenanceWindow: '03:00-05:00',
      
      // API
      apiEnabled: true,
      apiRateLimit: 1000,
      apiKeyRequired: true
    };
  }

  static compareConfigs(config1: any, config2: any): { 
    differences: Array<{ key: string; oldValue: any; newValue: any }>;
    summary: string;
  } {
    const differences: Array<{ key: string; oldValue: any; newValue: any }> = [];
    
    const allKeys = new Set([...Object.keys(config1), ...Object.keys(config2)]);
    
    allKeys.forEach(key => {
      if (config1[key] !== config2[key]) {
        differences.push({
          key,
          oldValue: config1[key],
          newValue: config2[key]
        });
      }
    });

    const summary = `${differences.length} diferencias encontradas`;
    
    return { differences, summary };
  }

  static generateConfigReport(config: any): string {
    const report = `
# Reporte de Configuración del Servidor OGame
Generado: ${new Date().toLocaleString()}

## Información Básica
- Nombre del Juego: ${config.gameName}
- Versión: ${config.gameVersion}
- Servidor: ${config.serverName} (${config.serverRegion})

## Configuración de Velocidad
- Velocidad General: x${config.speedMultiplier}
- Velocidad Económica: x${config.economySpeed}
- Velocidad de Flota: x${config.fleetSpeed}
- Velocidad de Investigación: x${config.researchSpeed}
- Velocidad de Construcción: x${config.buildingSpeed}

## Límites y Protecciones
- Máximo Jugadores: ${config.maxPlayersGlobal.toLocaleString()}
- Protección Novatos: ${config.newbieProtection} días
- Protección Jugadores Fuertes: ${config.strongPlayerProtection ? 'SÍ' : 'NO'}
- Modo Vacaciones: ${config.vacationMode ? 'SÍ' : 'NO'}

## Configuración de Combate
- Fuego Rápido: ${config.rapidFire ? 'SÍ' : 'NO'}
- Campo de Escombros: ${config.debrisFieldPercentage}%
- Crash de Flota: ${config.fleetCrashPercentage}%
- Reparación de Defensas: ${config.defenseRepairPercentage}%

## Características Habilitadas
- Alianzas: ${config.alliances ? 'SÍ' : 'NO'}
- ACS: ${config.acs ? 'SÍ' : 'NO'}
- Expediciones: ${config.expeditions ? 'SÍ' : 'NO'}
- Oficiales: ${config.officers ? 'SÍ' : 'NO'}
- Materia Oscura: ${config.darkMatter ? 'SÍ' : 'NO'}
- Mercado: ${config.marketplace ? 'SÍ' : 'NO'}

## Seguridad
- Detección Multi-Cuenta: ${config.multiAccountDetection ? 'SÍ' : 'NO'}
- Detección de Bots: ${config.botDetection ? 'SÍ' : 'NO'}
- Bloqueo VPN: ${config.vpnBlocking ? 'SÍ' : 'NO'}
- Registro de IPs: ${config.ipLogging ? 'SÍ' : 'NO'}

## Contacto
- Email General: ${config.contactEmail}
- Email Soporte: ${config.supportEmail}
- Email Admin: ${config.adminEmail}
- Teléfono: ${config.contactPhone}

## Estado del Servidor
- Modo Mantenimiento: ${config.maintenanceMode ? 'ACTIVO' : 'INACTIVO'}
- Registro Abierto: ${config.registrationOpen ? 'SÍ' : 'NO'}
- Backup Automático: ${config.autoBackup ? 'SÍ' : 'NO'}
- Intervalo de Backup: ${config.backupInterval} horas
`;

    return report.trim();
  }
}