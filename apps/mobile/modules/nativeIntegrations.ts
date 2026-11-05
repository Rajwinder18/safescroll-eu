/**
 * Native integration interfaces for future authorized implementations.
 * These are NOT active. Do not claim device interception works until
 * platform entitlements, permissions, and store policies are satisfied.
 */

export interface AndroidUsageStatsBridge {
  requestPermission(): Promise<boolean>;
  getUsageSummary(days: number): Promise<{ packageName: string; minutes: number }[]>;
}

export interface AndroidInterruptionBridge {
  /** Requires explicit user consent and policy-compliant overlay/accessibility approach. */
  scheduleMindfulGate(packageName: string): Promise<void>;
}

export interface IosFamilyControlsBridge {
  requestAuthorization(): Promise<boolean>;
  /** FamilyControls / DeviceActivity / ManagedSettings entitlements required. */
  monitorApps(bundleIds: string[]): Promise<void>;
}

export const nativeIntegrationStatus = {
  androidUsageStats: { ready: true, active: false },
  androidInterruption: { ready: true, active: false },
  iosFamilyControls: { ready: true, active: false },
} as const;
