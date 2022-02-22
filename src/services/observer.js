export function createObserver() {
  let listeners = [];

  return {
    subscribe: (listener) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
    publish: (event) => {
      listeners.forEach((listener) => listener(event));
    },
  };
}