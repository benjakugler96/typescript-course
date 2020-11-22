"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/*
  Decorators:

  Functions that can be useful for future developers that will work on this code.
  They can be applied to objects or functions using @.
  They are executed when target is defined, not instanciated.
*/
console.log('::::::::::::::::DECORATOR EXAMPLE::::::::::::::::');
function Logger(target) {
    console.log('Loging...');
    console.log(target);
}
let Person = class Person {
    constructor() {
        this.name = 'Benja';
        console.log('initializing...');
    }
};
Person = __decorate([
    Logger
], Person);
const Benja = new Person();
/*
  Decorator factories:

  We can return a function on our decorator, and the advantage will be that
  now we can pass arguments like the example below.
*/
console.log('::::::::::::::::DECORATOR FACTORIES::::::::::::::::');
function LoggerFactory(string) {
    return function (target) {
        console.log(string);
        console.log(target);
    };
}
let FactoryExample = class FactoryExample {
    constructor() {
        this.dogName = 'Milo';
    }
};
FactoryExample = __decorate([
    LoggerFactory('This is a dog class: ')
], FactoryExample);
// More useful decorators:
function WithTemplate(template, hookID) {
    // with an _ we tell ts that we wont use it for now.
    return function (_) {
        const hookElement = document.getElementById(hookID);
        console.log(hookElement);
        if (!hookElement)
            return;
        hookElement.innerHTML = template;
    };
}
let TemplateExample = class TemplateExample {
};
TemplateExample = __decorate([
    WithTemplate('Yes', 'root')
], TemplateExample);
console.log('::::::::::::::::OTHER PLACES WHERE WE CAN USE THEM::::::::::::::::');
// Other places where we can use decorators:
// Property
function PropertyDecorator(target, propertyName) {
    console.log('Property decorator...');
    console.log('Target: ', target);
    console.log('Property name: ', propertyName);
}
// Accessors
function AccessorsDecorator(target, name, descriptor) {
    console.log('Accessor decorator...');
    console.log('Target: ', target);
    console.log('Name: ', name);
    console.log('Descriptor: ', descriptor);
}
// Methods
function MethodDecorator(target, name, descriptor) {
    console.log('Method decorator...');
    console.log('Target: ', target);
    console.log('Name: ', name);
    console.log('Descriptor: ', descriptor);
}
// Parameter. Second parameter is the method where we use this parameter
function ParameterDecorator(target, methodName, position) {
    console.log('Parameter decorator...');
    console.log('Target: ', target);
    console.log('Method Name: ', methodName);
    console.log('Position: ', position);
}
class Product {
    constructor(t, _price) {
        this._price = _price;
        this.title = t;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error('Invalid value');
        }
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    PropertyDecorator
], Product.prototype, "title", void 0);
__decorate([
    AccessorsDecorator
], Product.prototype, "price", null);
__decorate([
    MethodDecorator,
    __param(0, ParameterDecorator)
], Product.prototype, "getPriceWithTax", null);
// Validations with decorators
console.log('::::::::::::::::VALIDATION WITH TS DECORATORS::::::::::::::::');
const registerValidators = {};
function Required(target, propName) {
    registerValidators[target.constructor.name] = Object.assign(Object.assign({}, registerValidators[target.constructor.name]), { [propName]: ['required'] });
}
function PositiveNumber(target, propName) {
    registerValidators[target.constructor.name] = Object.assign(Object.assign({}, registerValidators[target.constructor.name]), { [propName]: ['positive'] });
}
function validate(obj) {
    const objectValidatorConfig = registerValidators[obj.constructor.name];
    console.log('Registered Validators', registerValidators);
    console.log('Object validator config', objectValidatorConfig);
    if (!objectValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objectValidatorConfig) {
        for (const validator of objectValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}
class Course {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector('form');
courseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const titleElement = document.getElementById('course-title');
    const priceElement = document.getElementById('course-price');
    const title = titleElement.value;
    const price = +priceElement.value;
    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert('Invalid input, pelase try again.');
        return;
    }
    console.log('This works.');
});
