"use strict";
let user;
user = {
    name: 'Benja',
    age: 24,
    greet() {
        console.log(this.name);
    },
};
class GoldenRetriever {
    constructor(name) {
        this.name = name;
        this.breed = 'Golden Retriever';
    }
    sayHi() {
        console.log(`I am: ${this.name}`);
    }
}
const milo = new GoldenRetriever('Milo');
milo.sayHi();
