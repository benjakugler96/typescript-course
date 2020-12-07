// Bind decorator
const AutoBindDecorator = (
	target: any,
	methodName: string,
	descriptor: PropertyDescriptor
) => {
	const originalMethod = descriptor.value;
	const adjustedDescriptor: PropertyDescriptor = {
		configurable: true,
		get() {
			return originalMethod.bind(this);
		},
	};
	return adjustedDescriptor;
};

interface Validatable {
	value: string | number;
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	min?: number;
	max?: number;
}

const validateInput = (validatable: Validatable) => {
	let isValid = true;
	if (validatable.required) {
		isValid = isValid && validatable.value.toString().trim().length !== 0;
	}
	if (typeof validatable.value === 'string' && validatable.minLength) {
		isValid = isValid && validatable.value.length >= validatable.minLength
		
	}

	return isValid;
}

class ProjectState {
	private listeners :any[] = [];
	private projects: any[] = [];
	private static instance: ProjectState;

	private constructor() {

	}
	static getInstance() {
		if (this.instance) {
			return this.instance;
		};
		this.instance = new ProjectState();
		return this.instance; 
	}

	addProject(title: string, description: string, people: number) {
		const newProject = {
			id: Math.random().toString(),
			title,
			description,
			people,
		};
		this.projects.push(newProject);
	}

	addListener(listenerFn: Function) {
		this.listeners.push(listenerFn);
	}
}

const state = ProjectState.getInstance();

export class ProjectList {
	templateElement: HTMLTemplateElement;
	hostElement: HTMLElement;
	element: HTMLElement;
	constructor(private type: 'active' | 'finished') {
		this.templateElement = <HTMLTemplateElement>(
			document.getElementById('project-list')
		);
		this.hostElement = document.getElementById('app')!;
		const htmlContent = document.importNode(this.templateElement.content, true);
		this.element = <HTMLElement>htmlContent.firstElementChild;
		this.element.id = `${this.type}-projects`;
		this.attach();
		this.renderContent()
	}

	private attach() {
		this.hostElement.insertAdjacentElement('beforeend', this.element);
	}

	private renderContent() {
		this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS'
	}
}

export class ProjectInput {
	templateElement: HTMLTemplateElement;
	hostElement: HTMLElement;
	formElement: HTMLElement;
	titleInput: HTMLInputElement;
	descriptionInput: HTMLInputElement;
	peopleInput: HTMLInputElement;

	constructor() {
		this.templateElement = <HTMLTemplateElement>(
			document.getElementById('project-input')
		);
		this.hostElement = document.getElementById('app')!;

		const htmlContent = document.importNode(this.templateElement.content, true);
		this.formElement = <HTMLFormElement>htmlContent.firstElementChild;

		this.titleInput = this.formElement.querySelector(
			'#title'
		) as HTMLInputElement;
		this.descriptionInput = this.formElement.querySelector(
			'#description'
		) as HTMLInputElement;
		this.peopleInput = this.formElement.querySelector(
			'#people'
		) as HTMLInputElement;

		this.formElement.id = 'user-input';

		this.configure();
		this.renderForm();
	}

	private renderForm() {
		this.hostElement.insertAdjacentElement('afterbegin', this.formElement);
	}

	private configure() {
		this.formElement.addEventListener('submit', this.onSubmit);
	}

	@AutoBindDecorator
	private onSubmit(event: Event) {
		event.preventDefault();
		const userInput = this.getUserInput();

		if (userInput) {
			const [title, description, people] = userInput;
			if (!validateInput({ value: title, required: true, minLength: 5 }) ||
				!validateInput({ value: description, required: false }) ||
				!validateInput({ value: people, required: true })
			) {
				return alert('Invalid input, please try again');
			}
			state.addProject(title, description, people);
			this.clearInputs();
		}
	}

	private getUserInput(): [string, string, number] | void {
		const enteredTitle = this.titleInput.value;
		const enteredDescription = this.descriptionInput.value;
		const enteredPeople = this.peopleInput.value;

		if (!enteredTitle.length || !enteredTitle.length || !enteredPeople.length) {
			return alert('Invalid input, please try again')
		}
		return [enteredTitle, enteredDescription, +enteredPeople];
	}

	private clearInputs() {
		this.titleInput.value = '';
		this.descriptionInput.value = '';
		this.peopleInput.value = '';
	}
}