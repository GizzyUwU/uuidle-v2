import { t } from "elysia";

export namespace PlayModel {
  export const guessBody = t.Object({
    uuid: t.String(),
    challenge: t.String(),
    nonce: t.String(),
  });

  export type guessBody = typeof guessBody.static;
}

const Model = {
  guess: {
    success: t.Object({
      success: t.Boolean(),
      correct: t.Boolean(),
    }),
    conflict: t.Object({
      correctSpots: t.Optional(t.ArrayString(t.Number())),
      wrongSpots: t.Optional(t.ArrayString(t.Number())),
    }),
  },
  unauthenticated: t.String(),
  invalid: t.String(),
  early: t.String(),
};

export default Model;
