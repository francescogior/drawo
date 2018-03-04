const _l = logger => (...x: any[]) => {
  logger("l", ...x);
  return x[0];
};

export const l = _l(console.log);
l.error = _l(console.error);

export const lf = (fn: Function) => (...args: any[]) => {
  return l(fn(...args.map(l)));
};

export const noop = () => {};
