
export const VIOLATION_MESSAGES = {
  FULLSCREEN_EXITED: 'You exited fullscreen mode. Test terminated.',
  SCREEN_SHARE_STOPPED: 'Screen sharing was stopped or interrupted. Test terminated.',
  SCREEN_SHARE_DENIED: 'Screen sharing permission was denied. Cannot start test.',
  TAB_SWITCHED: 'Tab was switched or page hidden. Test terminated.',
  WINDOW_MINIMIZED: 'Browser window was minimized. Test terminated.',
  WINDOW_LOST_FOCUS: 'Browser window lost focus (switched app). Test terminated.',
  CLIPBOARD_ACTION: 'Copy, cut, or paste action detected. Test terminated.',
  CONTEXT_MENU_USED: 'Right-click / context menu detected. Test terminated.',
  SETUP_FAILED: 'Failed to complete proctoring setup requirements.',
  UNKNOWN_VIOLATION: 'Unknown proctoring violation detected. Test terminated.',
} as const;

export type ViolationMessageKey = keyof typeof VIOLATION_MESSAGES;

export const PROCTORING_TIMEOUTS = {
  SETUP_TIMEOUT: 60_000,
  WARNING_DELAY: 1_500,
  AUTO_REDIRECT_DELAY: 4_000,
} as const;

export type ProctoringTimeoutKey = keyof typeof PROCTORING_TIMEOUTS;

export const UI_CONSTANTS = {
  MAX_VISIBLE_WARNINGS: 3,
  BANNER_AUTO_HIDE_DELAY: 8_000,
} as const;

export type UIConstantKey = keyof typeof UI_CONSTANTS;

export const BROWSER_WARNINGS = {
  SAFARI_FULLSCREEN:
    'Safari may require user interaction to enter fullscreen.',
  MOBILE_LIMITED:
    'Mobile browsers have limited fullscreen support — desktop recommended.',
} as const;

export type BrowserWarningKey = keyof typeof BROWSER_WARNINGS;

export const PROCTORING = {
  VIOLATION_MESSAGES,
  TIMEOUTS: PROCTORING_TIMEOUTS,
  UI: UI_CONSTANTS,
  BROWSER_WARNINGS,
} as const;
