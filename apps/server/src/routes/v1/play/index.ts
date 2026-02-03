import { Elysia } from "elysia";
import { service } from "./service";
import { openapi } from "@elysiajs/openapi";
import model from "./model";
export const PlayController = new Elysia({ prefix: "/play" })
  .use(openapi())
  .get("/guess", async (ctx) => await service.guessUUID(ctx), {
    response: {
      200: model.guess.success,
      400: model.invalid,
      409: model.guess.conflict,
      425: model.early,
    },
    detail: {
        tags: ["Play"]
    }
  });
