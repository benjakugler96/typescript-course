class Department {
	private employees: string[] = [];
	constructor(public name: string, private readonly id: string) {}

	showInfo() {
		console.log('Department Name: ', this.name);
		console.log('Department Id: ', this.id);
	}

	addEmpoyee(employeeName: string) {
		this.employees.push(employeeName);
	}
}

const ITDepartment = new Department('IT', '123');

ITDepartment.showInfo();

class DirectorsDepartment extends Department {
	reports: object[];
	constructor(id: string) {
		super(id, 'Directors');
		this.reports = [];
	}

	get getReports() {
		return console.log(this.reports);
	}

	set setReports(report: object) {
		this.reports.push(report);
	}

	addReport(report: object) {
		this.reports.push(report);
	}
}

const DirectorsDep = new DirectorsDepartment('000');

DirectorsDep.getReports;
DirectorsDep.setReports = { name: 'report1' };
DirectorsDep.getReports;
