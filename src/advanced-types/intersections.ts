type Admin = {
	name: string;
	privileges: string[];
};

type Employee = {
	name: string;
	salary: number;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
	name: 'Benja',
	salary: 26000,
	privileges: ['Full'],
};
