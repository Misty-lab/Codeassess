export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  readonly timestamp: string;
  readonly level: LogLevel;
  readonly message: string;
  readonly data?: unknown;
}


class ProctoringLogger {
  private enabled = true;

  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private write(
    level: LogLevel,
    message: string,
    data?: unknown
  ): void {
    if (!this.enabled) return;

    const entry: LogEntry = {
      timestamp: this.getTimestamp(),
      level,
      message,
      data,
    };

    const prefix = `[PROCTORING] [${level.toUpperCase()}]`;

    switch (level) {
      case 'debug':
        console.debug(prefix, message, data ?? '');
        break;
      case 'info':
        console.info(prefix, message, data ?? '');
        break;
      case 'warn':
        console.warn(prefix, message, data ?? '');
        break;
      case 'error':
        console.error(prefix, message, data ?? '');
        break;
      default:
        const _exhaustive: never = level;
        return _exhaustive;
    }

  }

  debug(message: string, data?: unknown): void {
    this.write('debug', message, data);
  }

  info(message: string, data?: unknown): void {
    this.write('info', message, data);
  }

  warn(message: string, data?: unknown): void {
    this.write('warn', message, data);
  }

  error(message: string, data?: unknown): void {
    this.write('error', message, data);
  }

 
  violation(reason: string, details?: unknown): void {
    this.error(`Violation detected: ${reason}`, details);
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}

export const proctoringLogger = new ProctoringLogger();
