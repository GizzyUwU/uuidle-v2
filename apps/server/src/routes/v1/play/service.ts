import { uuidle } from "../../../handlers/uuidle";
import type { PlayModel } from "./model";

export abstract class service {
  static async guessUUID(body: PlayModel.guessBody) {
    if (!body || typeof body !== "object") return 400;
    const { uuid, challenge, nonce } = (body ?? {}) as {
      uuid: string;
      challenge: string;
      nonce: string;
    };
    if (!uuid || !challenge || !nonce) return 400;

    if (uuid === uuidle.uuid?.id) {
      return 200;
    } else {
      if (!uuidle.uuid?.id) return { code: 429, msg: "Server not ready yet." };
      const dailyCharCounts: Record<string, number> = {};
      for (const char of uuidle.uuid?.id) {
        dailyCharCounts[char] = (dailyCharCounts[char] || 0) + 1;
      }
    }
  }
}
