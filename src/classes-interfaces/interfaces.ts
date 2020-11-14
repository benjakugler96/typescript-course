/*
Quick note: Interfaces are purely from TS.
So for example we can not use instanceof SomeInterface
*/
interface Person {
	name: string;
	age: number;

	greet(): void;
}

let user: Person;

user = {
	name: 'Benja',
	age: 24,
	greet() {
		console.log(this.name);
	},
};

// Using with classes:

interface Dog {
	name: string;
	breed: string;
}

class GoldenRetriever implements Dog {
	breed: string;
	constructor(public name: string) {
		this.breed = 'Golden Retriever';
	}

	sayHi() {
		console.log(`I am: ${this.name}`);
	}
}

const milo = new GoldenRetriever('Milo');
milo.sayHi();
