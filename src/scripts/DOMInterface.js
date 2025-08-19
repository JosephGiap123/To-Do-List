import { ProjectList } from "./ProjectList";

export class DOMInterface{
	static #_cardArea = document.querySelector('.project-display');
	static #_projectArea = document.querySelector('.projects-list');
	static #_dialog = document.querySelector('#dynamic-dialog');

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
				<input type="date" class="date-input" name="date" required>

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
			document.querySelector('#dynamic-dialog').close();
		});
	}

	static changeToDoDialog(index, name, desc, dueDate, priority){
		this.#_dialog.innerHTML = 
		`<form class="change-form" data-idx='${index}'>
				<p class="dialog-title">Edit To-Do</p>
				<label for="title">Title</label>
				<input type="text" class="name-input" name="title" value="${name}" required>

				<label for="description">Description</label>
				<textarea name="description" id="description" name="description">${desc}</textarea>

				<label for="priority">Priority</label>
				<input type="number" class="priority-input" name="priority" min="0" value="${priority}" required>

				<label for="date">Due Date</label>
				<input type="date" class="date-input" name="date" value="${dueDate}" required>

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
			document.querySelector('#dynamic-dialog').close();
		});
	}

	static createRenameProjectDialog(index){
		this.#_dialog.innerHTML = 
		`<form class="change-form" data-idx='${index}'>
				<p class="dialog-title">Rename Project</p>
				<label for="title">Project Name</label>
				<input type="text" class="title-input" name="title" value="${ProjectList.currentProject.name}" required>
				<input type="submit" class="submit-dialog js-change-to-do" value="Submit">
		</form>`;
		document.querySelector('.change-form').addEventListener('submit', (event)=>{
			event.preventDefault();
			const formData = new FormData(event.target);
			const newTitle = formData.get('title');
			ProjectList.currentProject.renameProject(newTitle);
			this.updateProjects(ProjectList.projectsList);
			this.updateToDo();
			document.querySelector('#dynamic-dialog').close();
		});
	}

	static createNewProjectDialog(index){
		this.#_dialog.innerHTML = 
		`<form class="change-form" data-idx='${index}'>
				<p class="dialog-title">Create Project</p>
				<label for="title">Project Name</label>
				<input type="text" class="title-input" name="title" required>
				<input type="submit" class="submit-dialog js-change-to-do" value="Submit">
		</form>`;
		document.querySelector('.change-form').addEventListener('submit', (event)=>{
			event.preventDefault();
			const formData = new FormData(event.target);
			const title = formData.get('title');
			ProjectList.addProject(title);
			this.updateProjects(ProjectList.projectsList);
			document.querySelector('#dynamic-dialog').close();
		});
	}

	static clearTodoDOM(){
		this.#_cardArea.innerHTML = '';
	}

	static clearProjectsDOM(){
		this.#_projectArea.innerHTML = '';
	}

	static displayProjects(projectList){
		if(projectList){
			projectList.forEach((project, index)=>{
				const projCard = createProjectCard(project, index);
				this.#_projectArea.appendChild(projCard);
			});
		}
		const addProject = createDOMElement('div', ['add-project']);
		addProject.appendChild(createDOMElement('div', ['add-proj-logo']));

		//create click event
		addProject.addEventListener('click', ()=>{
			this.createNewProjectDialog();
			this.#_dialog.showModal();
		});
		this.#_projectArea.appendChild(addProject);

		
	}

	static updateProjects(projectList){
		this.clearProjectsDOM();
		this.displayProjects(projectList);
	}

	static displayToDos(project){
		if(ProjectList.currentProject.toDoList === undefined){
			this.#_cardArea.textContent = 'No Project is being viewed';
		}
		else{
			this.#_cardArea.textContent = ProjectList.currentProject.name;
			project.toDoList.forEach((toDo, index)=>{
				this.#_cardArea.appendChild(createCard(toDo.title, toDo.description, toDo.priority, toDo.dueDate, index));
			});
			this.#_cardArea.appendChild(createAddToDoButton());
		}
	}

	static updateToDo(){
		this.clearTodoDOM();
		this.displayToDos(ProjectList.currentProject);
	}
}

//outer functions

function createCard(name, desc,  priority, dueDate, index){
	const toDoCard = createDOMElement("div", ['to-do-card'], "", {idx: `${index}`});
	toDoCard.appendChild(createDOMElement("p", ['title'], name));
	toDoCard.appendChild(createDOMElement('div', ['priority-num'], priority));
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
		DOMInterface.changeToDoDialog(index, name, desc, dueDate, priority);
		const dialog = document.querySelector('#dynamic-dialog');
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
		const dialog = document.querySelector('#dynamic-dialog');
		dialog.showModal();
	});

	return toDoButton;
}

function createProjectCard(project, index){
	const projectCard = createDOMElement("div", ["project-card"], "", {idx: `${index}`});
	projectCard.appendChild(createDOMElement("p", [], project.name));
	const rename = projectCard.appendChild(createDOMElement("button", ["rename-project"]));
	rename.addEventListener('click', ()=>{
		DOMInterface.createRenameProjectDialog(index);
		const dialog = document.querySelector('#dynamic-dialog');
		dialog.showModal();
	});
	if((project === ProjectList.currentProject)){
		projectCard.classList.add('selected-project');
	}
	else{
		const view = projectCard.appendChild(createDOMElement("button", ["view-project"]));
		const del = projectCard.appendChild(createDOMElement("button", ["delete-project"]));
		view.addEventListener('click', ()=>{
			ProjectList.changeCurrentProject(index);
			DOMInterface.updateProjects(ProjectList.projectsList);
			DOMInterface.updateToDo();
		});
		del.addEventListener('click', ()=>{
		ProjectList.deleteProject(index);
		DOMInterface.updateProjects(ProjectList.projectsList);
		});
	}
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