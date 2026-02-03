import { Context } from "elysia";
export abstract class service {
    static async guessUUID(ctx: Context) {
        if(!ctx.body || typeof ctx.body !== "object") {
            ctx.set.status = 400;
            return "Missing or malformed data given to server."
        }

        const { uuid, challenge, nonce } = (ctx.body ?? {}) as {
            uuid: string;
            challenge: string;
            nonce: string;
        }
    }
}