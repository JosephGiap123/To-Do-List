import { Project } from "./Project.js";
//singleton.

export class ProjectList{
	static projectsList = [new Project('Default')];
	static currentProject = this.projectsList[0];


	static changeCurrentProject(newIndex){
		if(this.projectsList.length === 0){
			this.currentProject = {};
			return;
		}
		if(newIndex < 0 || newIndex > this.projectsList.length) return;
		this.currentProject = this.projectsList[newIndex];
		this.#_saveToStorage();
	}

	static addProject(name){
		const newProject = new Project(name);
		this.projectsList.push(newProject);
		this.#_saveToStorage();
	}

	static renameProject(index, newName){
		if(index < 0 || index > this.projectsList.length) return;
		this.projectsList[index].renameProject(newName);
		this.#_saveToStorage();
	}

	static deleteProject(index){
		if(index < 0 || index > this.projectsList.length) return;
		this.projectsList.splice(index, 1);
		if(this.projectsList.length === 0){
			this.currentProject = {};
		}
		this.#_saveToStorage();
	}

	static changeToDo(index, name, desc, dueDate, priority){
		this.currentProject.changeCard(index, name, desc, dueDate, priority);
		this.#_saveToStorage();
	}

	static addToDo(name, desc, dueDate, priority){
		if(this.currentProject.toDoList === undefined){
			return;
		}
		this.currentProject.addCard(name, desc, dueDate, priority);
		this.#_saveToStorage();
	}

	static delToDo(index){
		this.currentProject.deleteCard(index);
		this.#_saveToStorage();
	}

	static loadFromStorage(){
		const parsedProject = JSON.parse(localStorage.getItem('projectList'));
		
		if(!parsedProject) return;
		let projectWithFunctions = [];
		parsedProject.forEach((project, index) => {
			const newProject = new Project(project.name);
			project.toDoList.forEach((toDo) => {
				newProject.addCard(toDo.title, toDo.description, toDo.dueDate, toDo.priority);
			});
			projectWithFunctions.push(newProject);
		});
		this.projectsList = projectWithFunctions;
		this.currentProject = this.projectsList[0];
	}

	static #_saveToStorage(){
		localStorage.setItem('projectList', JSON.stringify(this.projectsList));
	}
}