const debounce = <T extends (...args: any[]) => void>(func: T, delay: number = 1_000) => {
  let debounceTimer: NodeJS.Timeout;

  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
};

export { debounce };
