import "abortcontroller-polyfill";

const AbortController = window.AbortController;
export const abortController = new AbortController();
export const signal = abortController.signal;

export default {
  abortController,
  signal
};

// export default Controller;
