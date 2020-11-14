type Combinable = string | number;

const add = (a: Combinable, b: Combinable) => {
	// Type check first
	if (typeof a === 'string' || typeof b === 'string') {
		return a.toString() + b.toString();
	}
	return a + b;
};
