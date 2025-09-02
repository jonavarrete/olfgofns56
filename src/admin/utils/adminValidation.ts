import { PlayerAccount, AdminPvEMission, AdminAlienRace, GlobalMessage } from '../../types/admin';

export class AdminValidation {
  static validatePlayerAccount(account: Partial<PlayerAccount>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!account.username || account.username.length < 3) {
      errors.push('El nombre de usuario debe tener al menos 3 caracteres');
    }

    if (!account.email || !this.isValidEmail(account.email)) {
      errors.push('Email inválido');
    }

    if (account.level !== undefined && (account.level < 1 || account.level > 100)) {
      errors.push('El nivel debe estar entre 1 y 100');
    }

    if (account.experience !== undefined && account.experience < 0) {
      errors.push('La experiencia no puede ser negativa');
    }

    if (account.points !== undefined && account.points < 0) {
      errors.push('Los puntos no pueden ser negativos');
    }

    // Validate resources
    if (account.resources) {
      Object.entries(account.resources).forEach(([resource, amount]) => {
        if (amount < 0) {
          errors.push(`${resource} no puede ser negativo`);
        }
        if (amount > 999999999) {
          errors.push(`${resource} excede el límite máximo`);
        }
      });
    }

    return { valid: errors.length === 0, errors };
  }

  static validatePvEMission(mission: Partial<AdminPvEMission>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!mission.name || mission.name.length < 3) {
      errors.push('El nombre de la misión debe tener al menos 3 caracteres');
    }

    if (!mission.description || mission.description.length < 10) {
      errors.push('La descripción debe tener al menos 10 caracteres');
    }

    if (!mission.type) {
      errors.push('Debe seleccionar un tipo de misión');
    }

    if (!mission.difficulty) {
      errors.push('Debe seleccionar una dificultad');
    }

    if (mission.duration !== undefined && mission.duration < 1) {
      errors.push('La duración debe ser mayor a 0');
    }

    if (mission.cooldown !== undefined && mission.cooldown < 0) {
      errors.push('El cooldown no puede ser negativo');
    }

    if (!mission.location || mission.location.length < 3) {
      errors.push('Debe especificar una ubicación');
    }

    if (!mission.lore || mission.lore.length < 20) {
      errors.push('La historia debe tener al menos 20 caracteres');
    }

    return { valid: errors.length === 0, errors };
  }

  static validateAlienRace(race: Partial<AdminAlienRace>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!race.name || race.name.length < 3) {
      errors.push('El nombre de la raza debe tener al menos 3 caracteres');
    }

    if (!race.description || race.description.length < 10) {
      errors.push('La descripción debe tener al menos 10 caracteres');
    }

    if (!race.homeworld || race.homeworld.length < 3) {
      errors.push('Debe especificar un mundo natal');
    }

    if (!race.type) {
      errors.push('Debe seleccionar un tipo de raza');
    }

    if (race.traits) {
      Object.entries(race.traits).forEach(([trait, value]) => {
        if (value < 1 || value > 10) {
          errors.push(`${trait} debe estar entre 1 y 10`);
        }
      });
    }

    if (!race.specialties || race.specialties.length === 0) {
      errors.push('Debe especificar al menos una especialidad');
    }

    if (!race.lore || race.lore.length < 50) {
      errors.push('La historia debe tener al menos 50 caracteres');
    }

    return { valid: errors.length === 0, errors };
  }

  static validateGlobalMessage(message: Partial<GlobalMessage>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!message.title || message.title.length < 5) {
      errors.push('El título debe tener al menos 5 caracteres');
    }

    if (!message.content || message.content.length < 10) {
      errors.push('El contenido debe tener al menos 10 caracteres');
    }

    if (!message.type) {
      errors.push('Debe seleccionar un tipo de mensaje');
    }

    if (!message.priority) {
      errors.push('Debe seleccionar una prioridad');
    }

    if (!message.targetAudience) {
      errors.push('Debe seleccionar una audiencia objetivo');
    }

    if (message.targetAudience !== 'all' && (!message.targetIds || message.targetIds.length === 0)) {
      errors.push('Debe especificar IDs objetivo para audiencias específicas');
    }

    if (message.scheduledFor && message.scheduledFor <= Date.now()) {
      errors.push('La fecha de programación debe ser futura');
    }

    if (message.expiresAt && message.expiresAt <= Date.now()) {
      errors.push('La fecha de expiración debe ser futura');
    }

    return { valid: errors.length === 0, errors };
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static sanitizeInput(input: string): string {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/[<>]/g, '')
      .trim();
  }

  static validateResourceAmount(amount: number, resourceType: string): { valid: boolean; error?: string } {
    if (amount < 0) {
      return { valid: false, error: `${resourceType} no puede ser negativo` };
    }
    
    if (amount > 999999999) {
      return { valid: false, error: `${resourceType} excede el límite máximo (999,999,999)` };
    }
    
    return { valid: true };
  }

  static validateCoordinates(coordinates: string): { valid: boolean; error?: string } {
    const coordRegex = /^\d{1,2}:\d{1,3}:\d{1,2}$/;
    
    if (!coordRegex.test(coordinates)) {
      return { valid: false, error: 'Formato de coordenadas inválido (debe ser G:S:P)' };
    }
    
    const [galaxy, system, position] = coordinates.split(':').map(Number);
    
    if (galaxy < 1 || galaxy > 9) {
      return { valid: false, error: 'La galaxia debe estar entre 1 y 9' };
    }
    
    if (system < 1 || system > 499) {
      return { valid: false, error: 'El sistema debe estar entre 1 y 499' };
    }
    
    if (position < 1 || position > 15) {
      return { valid: false, error: 'La posición debe estar entre 1 y 15' };
    }
    
    return { valid: true };
  }
}