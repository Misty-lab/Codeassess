
export enum TerminationReason {
  FULLSCREEN_EXITED = 'Exited fullscreen mode',

  SCREEN_SHARE_STOPPED = 'Screen sharing was stopped or interrupted',
  SCREEN_SHARE_DENIED = 'Screen sharing permission denied',

  TAB_SWITCHED = 'Tab switched or page hidden',
  WINDOW_MINIMIZED = 'Window minimized',

  WINDOW_LOST_FOCUS = 'Browser window lost focus (alt-tab or app switch)',

  CLIPBOARD_ACTION = 'Clipboard action attempted (copy/cut/paste blocked)',
  CONTEXT_MENU_USED = 'Context menu (right-click) attempted',

  SETUP_FAILED = 'Failed to complete proctoring setup',
  UNKNOWN_VIOLATION = 'Unknown proctoring violation',
}


export interface ViolationEvent {
  readonly reason: TerminationReason;
  readonly timestamp: Date;
  readonly details?: string;
  readonly userAgent?: string;
  readonly sessionId?: string;
}


export interface ProctoringSetupStatus {
  readonly consentGiven: boolean;
  readonly screenSharingActive: boolean;
  readonly fullscreenActive: boolean;
  readonly error: string | null;
  readonly canStart: boolean;
}


export interface ProctoringState {
  readonly isActive: boolean;
  readonly violationDetected: boolean;
  readonly lastViolation?: ViolationEvent;
  readonly setup: ProctoringSetupStatus;
}
