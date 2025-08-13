import { Project } from "./Project";
import { ProjectList } from "./ProjectList";

export class DOMInterface{
	static _cardArea = document.querySelector('.project-display');
	static _projectArea = document.querySelector('.projects-list');

	static clearTodoDOM(){
		this._cardArea.innerHTML = '';
	}

	static clearProjectsDOM(){
		this._projectArea.innerHTML = '';
	}

	static displayProjects(projectList){
		projectList.forEach((project, index)=>{
			DOMInterface._projectArea.appendChild(createProjectCard(project.name, index));
		});
		//add button!
	}

	static displayToDos(project){
		project.toDoList.forEach((toDo, index)=>{
			DOMInterface._cardArea.appendChild(createCard(toDo.title, toDo.priority, toDo.dueDate, index));
		});
		DOMInterface._cardArea.appendChild(createAddToDoButton());
	}

	static updateToDo(project){
		DOMInterface.clearTodoDOM();
		DOMInterface.displayToDos(project);
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
		DOMInterface.updateToDo(project);
	});
	down.addEventListener('click', ()=>{
		const project = ProjectList.currentProject;
		project.moveToDoDown(index);
		DOMInterface.updateToDo(project);
	});
	edit.addEventListener('click', ()=>{
		console.log('edit placeholder'); //#TODO, IMPLEMENT THIS LATER
	});
	close.addEventListener('click', ()=>{
		const project = ProjectList.currentProject;
		project.deleteCard(index);
		DOMInterface.updateToDo(project);
	});

	return toDoCard;
}

function createAddToDoButton(){
	const toDoButton = createDOMElement("div", ["add-to-do-button"]);
	toDoButton.appendChild(createDOMElement("div", ["add-to-do-icon"]));

	toDoButton.addEventListener('click', ()=>{
		console.log('add'); //#TODO: Add ability to add custom thingies.
	});
	return toDoButton;
}

function createProjectCard(name, index){
	const projectCard = createDOMElement("div", ["project-card"], "", {idx: `${index}`});
	projectCard.appendChild(createDOMElement("p", [], name));
	projectCard.appendChild(createDOMElement("button", ["view-project"]));
	projectCard.appendChild(createDOMElement("button", ["rename-project"]));
	projectCard.appendChild(createDOMElement("button", ["delete-project"]));
	return projectCard;
		// <div class="project-card">
		// 	<p>project1</p>
		// 	<button class="rename-project"></button>
		// 	<button class="delete-project"></button>
		// </div>
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