"use strict";
class Department {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.employees = [];
    }
    showInfo() {
        console.log('Department Name: ', this.name);
        console.log('Department Id: ', this.id);
    }
    addEmpoyee(employeeName) {
        this.employees.push(employeeName);
    }
}
const ITDepartment = new Department('IT', '123');
ITDepartment.showInfo();
class DirectorsDepartment extends Department {
    constructor(id) {
        super(id, 'Directors');
        this.reports = [];
    }
    get getReports() {
        return console.log(this.reports);
    }
    set setReports(report) {
        this.reports.push(report);
    }
    addReport(report) {
        this.reports.push(report);
    }
}
const DirectorsDep = new DirectorsDepartment('000');
DirectorsDep.getReports;
DirectorsDep.setReports = { name: 'report1' };
DirectorsDep.getReports;
