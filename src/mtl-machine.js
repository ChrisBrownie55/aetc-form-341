import { Machine, assign } from "xstate";

const context = { mtl: "", transitionPhase: "" };

export const MTLMachine = Machine({
  id: "mtl",
  initial: "off",
  context,
  states: {
    off: {
      entry: 'reset',
      on: {
        TOGGLE: "on"
      }
    },
    on: {
      on: {
        TOGGLE: "off",
        UPDATE_MTL: { actions: ["updateMTL"] },
        UPDATE_TRANSITION_PHASE: { actions: ["updateTransitionPhase"] }
      },
    }
  }
}, {
  actions: {
    updateMTL: assign((context, { mtl }) => ({ ...context, mtl })),
    updateTransitionPhase: assign((context, { transitionPhase }) => ({
      ...context,
      transitionPhase
    })),
    reset: assign(() => context)
  }
});
