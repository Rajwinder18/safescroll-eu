import { getAppConfig } from '@safescroll/api-client';

export function isDemoMode() {
  return getAppConfig().demoBanner;
}
