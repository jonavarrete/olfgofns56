import { useState, useEffect } from 'react';

interface ValidationResult {
  isValid: boolean;
  criticalIssues: number;
  warningIssues: number;
  infoIssues: number;
  totalChecks: number;
  passedChecks: number;
}

export function useConfigValidation(config: any) {
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    isValid: true,
    criticalIssues: 0,
    warningIssues: 0,
    infoIssues: 0,
    totalChecks: 0,
    passedChecks: 0
  });

  useEffect(() => {
    validateConfig();
  }, [config]);

  const validateConfig = () => {
    const checks = [
      // Critical checks
      { type: 'critical', check: () => !config.maintenanceMode },
      { type: 'critical', check: () => config.contactEmail && config.contactEmail.includes('@') },
      { type: 'critical', check: () => config.gameName && config.gameName.length > 0 },
      
      // Warning checks
      { type: 'warning', check: () => config.registrationOpen },
      { type: 'warning', check: () => config.speedMultiplier >= 1 && config.speedMultiplier <= 10 },
      { type: 'warning', check: () => config.maxPlayersGlobal >= 1000 && config.maxPlayersGlobal <= 100000 },
      { type: 'warning', check: () => config.autoBackup && config.backupInterval <= 12 },
      
      // Info checks
      { type: 'info', check: () => config.newbieProtection >= 3 && config.newbieProtection <= 14 },
      { type: 'info', check: () => config.debrisFieldPercentage >= 10 && config.debrisFieldPercentage <= 50 },
      { type: 'info', check: () => config.alliances && config.expeditions },
    ];

    let criticalIssues = 0;
    let warningIssues = 0;
    let infoIssues = 0;
    let passedChecks = 0;

    checks.forEach(({ type, check }) => {
      const passed = check();
      if (passed) {
        passedChecks++;
      } else {
        switch (type) {
          case 'critical': criticalIssues++; break;
          case 'warning': warningIssues++; break;
          case 'info': infoIssues++; break;
        }
      }
    });

    setValidationResult({
      isValid: criticalIssues === 0,
      criticalIssues,
      warningIssues,
      infoIssues,
      totalChecks: checks.length,
      passedChecks
    });
  };

  return validationResult;
}