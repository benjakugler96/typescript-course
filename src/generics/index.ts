const list: Array<string> = [];

const promise: Promise<string> = new Promise((res, rej) => {
	setTimeout(() => {
		res('Resolved');
	}, 1000);
});

/*
  We dont know exactly what the type would be.
	Types T and U are set dynamically when we call the func
*/

// Generic function
const mergeObjects = <T, U>(objA: T, objB: U) => {
	return Object.assign(objA, objB);
};
const merge = mergeObjects({ name: 'benja' }, { age: 25 });

// Other generic function

interface Lenghty {
	length: number;
}

const otherGeneric = <T extends Lenghty>(element: T): [T, string] => {
	let description = 'No length for your element.';
	if (element.length) {
		description = `Length of ${element.length}`;
	}
	return [element, description];
};

// Constraints
// use extends
const constraint = <T, U extends object>(objA: T, objB: U) => {
	return Object.assign(objA, objB);
};
const mergeConstraint = constraint({ name: 'benja' }, {});

// keyof Constraint
const extractAndConvert = <T extends object, U extends keyof T>(
	obj: T,
	key: U
) => {
	return `value is: ${obj[key]}`;
};

extractAndConvert({ name: 'juan' }, 'name');

// Generic Classes
class DataStorage<T extends string | number> {
	private data: T[] = [];

	addItem(item: T) {
		this.data.push(item);
	}

	removeItem(item: T) {
		this.data = this.data.filter((e) => e !== item);
	}

	getItems() {
		return [...this.data];
	}
}

const myStorage = new DataStorage<string>();
myStorage.addItem('pepe');
// myStorage.addItem({});
myStorage.removeItem('pepe');
console.log(myStorage.getItems());
