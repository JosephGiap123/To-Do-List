import { ProjectList } from "./ProjectList";

export class DOMInterface{
	static #_cardArea = document.querySelector('.project-display');
	static #_projectArea = document.querySelector('.projects-list');
	static #_dialog = document.querySelector('#to-do-info');

	static createToDoDialog(){
		this.#_dialog.innerHTML = 
		`<form class="create-form">
				<p class="dialog-title">New To-Do</p>
				<label for="title">Title</label>
				<input type="text" class="name-input" name="title" required>

				<label for="description">Description</label>
				<textarea name="description" id="description" name="description"></textarea>

				<label for="priority">Priority</label>
				<input type="number" class="priority-input" name="priority" required>

				<label for="date">Due Date</label>
				<input type="date" class="date-input" name="date">

				<input type="submit" class="submit-dialog js-create-to-do" value="Submit">
		</form>`;
		//attach submit event
		document.querySelector('.create-form').addEventListener('submit', (event) =>{
			event.preventDefault();
			const formData = new FormData(event.target);
			const name = formData.get('title');
			const date = formData.get("date");
			const priority = formData.get('priority');
			const desc = formData.get('description') ? formData.get('description') : '';

			ProjectList.addToDo(name, desc, date, priority);
			this.updateToDo();
			document.querySelector('#to-do-info').close();
		});
	}

	static changeToDoDialog(index){
		this.#_dialog.innerHTML = 
		`<form class="change-form" data-idx='${index}'>
				<p class="dialog-title">Edit To-Do</p>
				<label for="title">Title</label>
				<input type="text" class="name-input" name="title" value="Default" required>

				<label for="description">Description</label>
				<textarea name="description" id="description" name="description"></textarea>

				<label for="priority">Priority</label>
				<input type="number" class="priority-input" name="priority" value="1" required>

				<label for="date">Due Date</label>
				<input type="date" class="date-input" name="date" value="2025-08-14">

				<input type="submit" class="submit-dialog js-change-to-do" value="Submit">
		</form>`;
		//attach submit event
		document.querySelector('.change-form').addEventListener('submit', (event) =>{
			event.preventDefault();
			const formData = new FormData(event.target);
			const name = formData.get('title');
			const date = formData.get("date");
			const priority = formData.get('priority');
			const desc = formData.get('description') ? formData.get('description') : '';

			ProjectList.changeToDo(index, name, desc, date, priority);
			this.updateToDo();
			document.querySelector('#to-do-info').close();
		});
	}

	static clearTodoDOM(){
		this.#_cardArea.innerHTML = '';
	}

	static clearProjectsDOM(){
		this.#_projectArea.innerHTML = '';
	}

	static displayProjects(projectList){
		projectList.forEach((project, index)=>{
			DOMInterface.#_projectArea.appendChild(createProjectCard(project.name, index));
		});
	}

	static updateProjects(projectList){
		this.clearProjectsDOM();
		this.displayProjects(projectList);
	}

	static displayToDos(project){
		project.toDoList.forEach((toDo, index)=>{
			DOMInterface.#_cardArea.appendChild(createCard(toDo.title, toDo.priority, toDo.dueDate, index));
		});
		DOMInterface.#_cardArea.appendChild(createAddToDoButton());
	}

	static updateToDo(){
		DOMInterface.clearTodoDOM();
		DOMInterface.displayToDos(ProjectList.currentProject);
	}
}

function createCard(name, priority, dueDate, index){
	const toDoCard = createDOMElement("div", ['to-do-card'], "", {idx: `${index}`});
	toDoCard.appendChild(createDOMElement("p", ['title'], name));
	const up = toDoCard.appendChild(createDOMElement("button", ['up-button']));
	const down = toDoCard.appendChild(createDOMElement("button", ['down-button']));
	const edit = toDoCard.appendChild(createDOMElement("button", ['edit-button']));
	const close = toDoCard.appendChild(createDOMElement("button", ['close-button']));

	//bind event listeners
	up.addEventListener('click', ()=>{
		const project = ProjectList.currentProject;
		project.moveToDoUp(index);
		DOMInterface.updateToDo();
	});
	down.addEventListener('click', ()=>{
		const project = ProjectList.currentProject;
		project.moveToDoDown(index);
		DOMInterface.updateToDo();
	});
	edit.addEventListener('click', ()=>{
		DOMInterface.changeToDoDialog(index);
		const dialog = document.querySelector('#to-do-info');
		dialog.showModal();
	});
	close.addEventListener('click', ()=>{
		const project = ProjectList.currentProject;
		project.deleteCard(index);
		DOMInterface.updateToDo();
	});

	return toDoCard;
}

function createAddToDoButton(){
	const toDoButton = createDOMElement("div", ["add-to-do-button"]);
	toDoButton.appendChild(createDOMElement("div", ["add-to-do-icon"]));

	toDoButton.addEventListener('click', ()=>{
		DOMInterface.createToDoDialog();
		const dialog = document.querySelector('#to-do-info');
		dialog.showModal();
	});
	return toDoButton;
}

function createProjectCard(name, index){
	const projectCard = createDOMElement("div", ["project-card"], "", {idx: `${index}`});
	projectCard.appendChild(createDOMElement("p", [], name));
	const view = projectCard.appendChild(createDOMElement("button", ["view-project"]));
	const rename =projectCard.appendChild(createDOMElement("button", ["rename-project"]));
	const del = projectCard.appendChild(createDOMElement("button", ["delete-project"]));

	//bind event listeners
	view.addEventListener('click', ()=>{
		console.log('view');
	});
	rename.addEventListener('click', ()=>{
		console.log('rename');
	});
	del.addEventListener('click', ()=>{
		ProjectList.deleteProject(index);
		DOMInterface.updateProjects(ProjectList.projectsList);
	});

	return projectCard;
}

function createDOMElement(elementType = "div", classList = [], textContent = "", data = {}){
	let element = document.createElement(elementType);
	classList.forEach((classes)=>{
		element.classList.add(classes);
	});
	element.textContent = textContent;
	for(const key in data){
		element.setAttribute(`data-${key}`, `${data[key]}`);
	}
	return element;
}