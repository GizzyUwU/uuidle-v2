import Elysia from "elysia";
import { openapi } from '@elysiajs/openapi'
import { PlayController } from "./play";
// import { PowController } from "./pow/index";
// import { AuthController } from "./auth/index";
// import { UserController } from "./user/index";

const routes = new Elysia({ prefix: "api/v1" })
  .use(openapi())
  .use(PlayController)
//   .use(PowController)
//   .use(AuthController)
//   .use(UserController);

export { routes as APIRoutes };
