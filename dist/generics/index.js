"use strict";
const list = [];
const promise = new Promise((res, rej) => {
    setTimeout(() => {
        res('Resolved');
    }, 1000);
});
/*
  We dont know exactly what the type would be.
    Types T and U are set dynamically when we call the func
*/
// Generic function
const mergeObjects = (objA, objB) => {
    return Object.assign(objA, objB);
};
const merge = mergeObjects({ name: 'benja' }, { age: 25 });
const otherGeneric = (element) => {
    let description = 'No length for your element.';
    if (element.length) {
        description = `Length of ${element.length}`;
    }
    return [element, description];
};
// Constraints
// use extends
const constraint = (objA, objB) => {
    return Object.assign(objA, objB);
};
const mergeConstraint = constraint({ name: 'benja' }, {});
// keyof Constraint
const extractAndConvert = (obj, key) => {
    return `value is: ${obj[key]}`;
};
extractAndConvert({ name: 'juan' }, 'name');
// Generic Classes
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        this.data = this.data.filter((e) => e !== item);
    }
    getItems() {
        return [...this.data];
    }
}
const myStorage = new DataStorage();
myStorage.addItem('pepe');
// myStorage.addItem({});
myStorage.removeItem('pepe');
console.log(myStorage.getItems());
