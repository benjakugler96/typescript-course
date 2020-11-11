"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    describe() {
        console.log(this.name);
        console.log(this.id);
    }
}
const dep = new Department('123', 'benja');
dep.describe();
//# sourceMappingURL=app.js.map