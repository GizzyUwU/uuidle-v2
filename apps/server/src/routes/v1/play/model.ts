import { t } from "elysia";

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
  invalid: t.String(),
  early: t.String(),
};

export default Model;
