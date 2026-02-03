import type { DatabaseType } from "..";

export interface UUIDLEType {
  uuid: string | undefined;
  db: DatabaseType | undefined;
  activeChallenges: Map<string, number>;
  ratelimits: Map<
    string,
    { difficulty: number; timestamp: number; blocked: boolean }
  >;
  commonlyHitAPIKeys: string[];
}

export const uuidle: UUIDLEType = {
  uuid: undefined,
  db: undefined,
  activeChallenges: new Map<string, number>(),
  ratelimits: new Map<
    string,
    { difficulty: number; timestamp: number; blocked: boolean }
  >(),
  commonlyHitAPIKeys: [],
};
