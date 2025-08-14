import { Project } from "./Project.js";
//singleton.

export class ProjectList{
	static projectsList = [new Project('Default')];
	static currentProject = this.projectsList[0];


	static changeCurrentProject(newIndex){
		if(newIndex < 0 || newIndex > this.projectsList.length) return;
		ProjectList.currentProject = this.projectsList[newIndex];
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
	}

	static changeToDo(index, name, desc, dueDate, priority){
		this.currentProject.changeCard(index, name, desc, dueDate, priority);
	}

	static addToDo(name, desc, dueDate, priority){
		this.currentProject.addCard(name, desc, dueDate, priority);
	}

	static delToDo(index){
		this.currentProject.deleteCard(index);
	}
}