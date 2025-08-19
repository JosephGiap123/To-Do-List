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
	}

	static addProject(name){
		const newProject = new Project(name);
		this.projectsList.push(newProject);
	}

	static renameProject(index, newName){
		if(index < 0 || index > this.projectsList.length) return;
		this.projectsList[index].renameProject(newName);
	}

	static deleteProject(index){
		if(index < 0 || index > this.projectsList.length) return;
		this.projectsList.splice(index, 1);
		if(this.projectsList.length === 0){
			this.currentProject = {};
		}
	}

	static changeToDo(index, name, desc, dueDate, priority){
		this.currentProject.changeCard(index, name, desc, dueDate, priority);
	}

	static addToDo(name, desc, dueDate, priority){
		if(this.currentProject.toDoList === undefined){
			return;
		}
		this.currentProject.addCard(name, desc, dueDate, priority);
	}

	static delToDo(index){
		this.currentProject.deleteCard(index);
	}
}