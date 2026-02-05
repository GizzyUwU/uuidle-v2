import { Elysia } from "elysia";
import { service } from "./service";
import { bearer } from "@elysiajs/bearer";
import { uuidle } from "../../../handlers/uuidle";
import model, { PlayModel } from "./model";
import { users } from "../../../schema/user";
import { eq } from "drizzle-orm";
export const PlayController = new Elysia({ prefix: "/play" })
  .use(bearer())
  .post(
    "/guess",
    async ({ body, bearer, set }) => {
      if (!uuidle.ready || !uuidle.db || !uuidle.uuid?.id) {
        set.status = 425;
        return "Server not ready yet.";
      } else if (!bearer) {
        set.status = 401;
        return "Missing bearer token";
      }

      const [exists] = await uuidle.db
        .select()
        .from(users)
        .where(eq(users.apiKey, bearer))
        .limit(1);

      if (!uuidle.commonlyHitAPIKeys.includes(bearer) && !exists) {
        set.status = 401;
        return "Missing bearer token";
      }

      const response = await service.guessUUID(body);
      if (typeof response === "object" && response.code && response.msg) {
        set.status = response.code;
        return response.msg;
      } else {
        set.status = 200;
        return "Bleh";
      }
    },
    {
      body: PlayModel.guessBody,
      response: {
        200: model.guess.success,
        400: model.invalid,
        401: model.unauthenticated,
        409: model.guess.conflict,
        425: model.early,
      },
      detail: {
        tags: ["Play"],
      },
    },
  );
