export const funcs = [
	{ name: 'linear', fn: (x: number) => x },
	{ name: 'in-out-sine', fn: (x: number) => -(Math.cos(Math.PI * x) - 1) / 2 },
	{
		name: 'in-out-quad',
		fn: (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2)
	},
	{
		name: 'in-out-cubic',
		fn: (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
	},
	{
		name: 'in-out-quart',
		fn: (x: number) => (x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2)
	},
	{
		name: 'in-out-quint',
		fn: (x: number) => (x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2)
	},
	{
		name: 'in-out-expo',
		fn: (x: number) =>
			x === 0
				? 0
				: x === 1
				? 1
				: x < 0.5
				? Math.pow(2, 20 * x - 10) / 2
				: (2 - Math.pow(2, -20 * x + 10)) / 2
	},
	{
		name: 'in-out-circ',
		fn: (x: number) =>
			x < 0.5
				? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
				: (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2
	},
	{
		name: 'in-out-back',
		fn: (x: number) => {
			const c1 = 1.70158;
			const c2 = c1 * 1.525;

			return x < 0.5
				? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
				: (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
		}
	},
	{
		name: 'in-out-elastic',
		fn: (x: number) => {
			const c5 = (2 * Math.PI) / 4.5;

			return x === 0
				? 0
				: x === 1
				? 1
				: x < 0.5
				? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
				: (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
		}
	}
];
