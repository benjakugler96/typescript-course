/*
  Decorators:

  Functions that can be useful for future developers that will work on this code.
  They can be applied to objects or functions using @.
  They are executed when target is defined, not instanciated.
*/
console.log('::::::::::::::::DECORATOR EXAMPLE::::::::::::::::');
function Logger(target: Function) {
	console.log('Loging...');
	console.log(target);
}

@Logger
class Person {
	name = 'Benja';

	constructor() {
		console.log('initializing...');
	}
}

const Benja = new Person();

/*
  Decorator factories:

  We can return a function on our decorator, and the advantage will be that
  now we can pass arguments like the example below.
*/
console.log('::::::::::::::::DECORATOR FACTORIES::::::::::::::::');
function LoggerFactory(string: string) {
	return function (target: Function) {
		console.log(string);
		console.log(target);
	};
}

@LoggerFactory('This is a dog class: ')
class FactoryExample {
	dogName = 'Milo';
}

// More useful decorators:
function WithTemplate(template: string, hookID: string) {
	// with an _ we tell ts that we wont use it for now.
	return function (_: Function) {
		const hookElement = document.getElementById(hookID);
		console.log(hookElement);
		if (!hookElement) return;
		hookElement.innerHTML = template;
	};
}

@WithTemplate('Yes', 'root')
class TemplateExample {}

console.log(
	'::::::::::::::::OTHER PLACES WHERE WE CAN USE THEM::::::::::::::::'
);
// Other places where we can use decorators:

// Property
function PropertyDecorator(target: any, propertyName: string | Symbol) {
	console.log('Property decorator...');
	console.log('Target: ', target);
	console.log('Property name: ', propertyName);
}

// Accessors
function AccessorsDecorator(
	target: any,
	name: string,
	descriptor: PropertyDescriptor
) {
	console.log('Accessor decorator...');
	console.log('Target: ', target);
	console.log('Name: ', name);
	console.log('Descriptor: ', descriptor);
}

// Methods
function MethodDecorator(
	target: any,
	name: string,
	descriptor: PropertyDescriptor
) {
	console.log('Method decorator...');
	console.log('Target: ', target);
	console.log('Name: ', name);
	console.log('Descriptor: ', descriptor);
}

// Parameter. Second parameter is the method where we use this parameter
function ParameterDecorator(
	target: any,
	methodName: string | Symbol,
	position: number
) {
	console.log('Parameter decorator...');
	console.log('Target: ', target);
	console.log('Method Name: ', methodName);
	console.log('Position: ', position);
}

class Product {
	@PropertyDecorator
	title: string;

	@AccessorsDecorator
	set price(val: number) {
		if (val > 0) {
			this._price = val;
		} else {
			throw new Error('Invalid value');
		}
	}
	constructor(t: string, public _price: number) {
		this.title = t;
	}

	@MethodDecorator
	getPriceWithTax(@ParameterDecorator tax: number) {
		return this._price * (1 + tax);
	}
}

// Validations with decorators
console.log('::::::::::::::::VALIDATION WITH TS DECORATORS::::::::::::::::');
interface ValidatorConfig {
	[prop: string]: {
		[validatableProp: string]: string[]; // ['required', 'positive']
	};
}

const registerValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
	registerValidators[target.constructor.name] = {
		...registerValidators[target.constructor.name],
		[propName]: ['required'],
	};
}

function PositiveNumber(target: any, propName: string) {
	registerValidators[target.constructor.name] = {
		...registerValidators[target.constructor.name],
		[propName]: ['positive'],
	};
}

function validate(obj: any) {
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
	@Required
	title: string;
	@PositiveNumber
	price: number;
	constructor(t: string, p: number) {
		this.title = t;
		this.price = p;
	}
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const titleElement = document.getElementById(
		'course-title'
	) as HTMLInputElement;
	const priceElement = document.getElementById(
		'course-price'
	) as HTMLInputElement;

	const title = titleElement.value;
	const price = +priceElement.value;

	const createdCourse = new Course(title, price);
	if (!validate(createdCourse)) {
		alert('Invalid input, pelase try again.');
		return;
	}
	console.log('This works.');
});
