class Department {
	constructor(private readonly id: string, public name: string) {}

	describe() {
		console.log(this.name);
		console.log(this.id);
	}
}

const dep = new Department('123', 'benja');

dep.describe();
