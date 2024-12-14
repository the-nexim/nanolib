import { logger } from "./logger.js";

export function isVersionLarger(currentVersion: string, otherVersion: string) {
  logger.logMethodArgs?.('isVersionLarger', {currentVersion, otherVersion});
  const current = currentVersion.split('.').map(Number);
  const other = otherVersion.split('.').map(Number);

  for (let i = 0; i < 3; i++) {
    if (current[i] > other[i]) return true;
    if (current[i] < other[i]) return false;
  }

  return false;
}
