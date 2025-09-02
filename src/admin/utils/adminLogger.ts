import { SecurityLog } from '../../types/admin';

export class AdminLogger {
  private static logs: SecurityLog[] = [];

  static log(
    type: SecurityLog['type'],
    description: string,
    severity: SecurityLog['severity'] = 'info',
    userId?: string,
    metadata?: any
  ): void {
    const log: SecurityLog = {
      id: Date.now().toString(),
      type,
      userId,
      ipAddress: this.getCurrentIP(),
      userAgent: navigator.userAgent,
      description,
      severity,
      timestamp: Date.now(),
      metadata
    };

    this.logs.push(log);
    
    // Keep only last 1000 logs in memory
    if (this.logs.length > 1000) {
      this.logs = this.logs.slice(-1000);
    }

    // In a real app, this would send to the backend
    console.log('Admin Log:', log);
    
    // Send critical logs immediately
    if (severity === 'critical') {
      this.sendCriticalAlert(log);
    }
  }

  static logUserAction(action: string, targetUserId: string, adminId: string, details?: any): void {
    this.log(
      'admin_action',
      `Admin ${adminId} performed ${action} on user ${targetUserId}`,
      'info',
      adminId,
      { action, targetUserId, details }
    );
  }

  static logSecurityIncident(incident: string, userId?: string, severity: SecurityLog['severity'] = 'warning'): void {
    this.log(
      'suspicious_activity',
      incident,
      severity,
      userId,
      { incident, detectedAt: Date.now() }
    );
  }

  static logSystemChange(change: string, adminId: string, oldValue?: any, newValue?: any): void {
    this.log(
      'admin_action',
      `System configuration changed: ${change}`,
      'info',
      adminId,
      { change, oldValue, newValue }
    );
  }

  static getLogs(
    limit: number = 100,
    type?: SecurityLog['type'],
    severity?: SecurityLog['severity']
  ): SecurityLog[] {
    let filteredLogs = [...this.logs];

    if (type) {
      filteredLogs = filteredLogs.filter(log => log.type === type);
    }

    if (severity) {
      filteredLogs = filteredLogs.filter(log => log.severity === severity);
    }

    return filteredLogs
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }

  static exportLogs(startDate?: number, endDate?: number): string {
    let logsToExport = [...this.logs];

    if (startDate) {
      logsToExport = logsToExport.filter(log => log.timestamp >= startDate);
    }

    if (endDate) {
      logsToExport = logsToExport.filter(log => log.timestamp <= endDate);
    }

    const csvHeader = 'Timestamp,Type,User ID,IP Address,Description,Severity,Metadata\n';
    const csvData = logsToExport.map(log => 
      `${new Date(log.timestamp).toISOString()},${log.type},${log.userId || ''},${log.ipAddress},"${log.description}",${log.severity},"${JSON.stringify(log.metadata || {})}"`
    ).join('\n');

    return csvHeader + csvData;
  }

  private static getCurrentIP(): string {
    // In a real app, this would get the actual IP
    return '127.0.0.1';
  }

  private static sendCriticalAlert(log: SecurityLog): void {
    // In a real app, this would send alerts via email, Telegram, etc.
    console.warn('CRITICAL SECURITY ALERT:', log);
  }

  static clearLogs(): void {
    this.logs = [];
  }

  static getLogStats(): {
    total: number;
    byType: { [key: string]: number };
    bySeverity: { [key: string]: number };
    last24h: number;
  } {
    const now = Date.now();
    const last24h = now - 86400000;

    const byType: { [key: string]: number } = {};
    const bySeverity: { [key: string]: number } = {};

    this.logs.forEach(log => {
      byType[log.type] = (byType[log.type] || 0) + 1;
      bySeverity[log.severity] = (bySeverity[log.severity] || 0) + 1;
    });

    const last24hCount = this.logs.filter(log => log.timestamp >= last24h).length;

    return {
      total: this.logs.length,
      byType,
      bySeverity,
      last24h: last24hCount
    };
  }
}