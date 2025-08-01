import { startCase } from 'lodash-es';

const OVERRIDES: Record<string, string> = {
  specie: 'Species',
  breed: 'Breeds',
};

const TYPE_SUFFIXES = ['_txt', '_int', '_flg'] as const;
const BOOL_PREFIXES = ['is_', 'has_', 'can_', 'if_', 'with_'] as const;

/**
 * If the key ends with any known type‑suffix, drop just that one.
 * Otherwise return the key unchanged.
 */
function stripSuffix(key: string) {
  const match = TYPE_SUFFIXES.find(suf => key.endsWith(suf));
  return match ? key.slice(0, -match.length) : key;
}

/**
 * If the key starts with any known boolean‑prefix, drop just that one.
 * Otherwise return the key unchanged.
 */
function stripPrefix(key: string) {
  const match = BOOL_PREFIXES.find(pre => key.startsWith(pre));
  return match ? key.slice(match.length) : key;
}

/**
 * Main entry:
 * 1. checks override map
 * 2. strips suffixes
 * 3. strips prefixes
 * 4. turns snake_case into Title Case
 */
export function humanizeParam(rawKey: string) {
  const base = OVERRIDES[rawKey] ?? rawKey;
  const noSuffix = stripSuffix(base);
  const noPrefix = stripPrefix(noSuffix);
  return startCase(noPrefix);
}
