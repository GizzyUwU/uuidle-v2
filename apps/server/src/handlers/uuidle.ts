import type { DatabaseType } from "..";

export interface UUIDLEType {
  uuid?: {
    id: string | undefined;
    createdAt: Date | undefined;
  },
  db?: DatabaseType
  activeChallenges: Map<string, number>;
  ratelimits: Map<
    string,
    { difficulty: number; timestamp: number; blocked: boolean }
  >;
  commonlyHitAPIKeys: string[];
  ready: boolean;
  sentryEnabled: boolean;
  sentry?: typeof import("@sentry/bun")
}

export const uuidle: UUIDLEType = {
  activeChallenges: new Map<string, number>(),
  ratelimits: new Map<
    string,
    { difficulty: number; timestamp: number; blocked: boolean }
  >(),
  commonlyHitAPIKeys: [],
  ready: false,
  sentryEnabled: false
};
