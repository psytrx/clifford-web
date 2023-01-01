export const rand = (min: number, max: number) => min + (max - min) * Math.random();

export const pickRand = <T>(xs: T[]) => xs[Math.floor(rand(0, xs.length))];
