import { Project } from "./Project.js";
//singleton.

export class ProjectList{
	static currentProject;

	constructor(){
		if(!ProjectList.instance){
			this.projectsList = [];
			this.addProject('Default');
			ProjectList.currentProject = this.projectsList[0];
		}
		else return ProjectList.instance;
	}

	changeCurrentProject(newIndex){
		if(newIndex < 0 || newIndex > this.projectsList.length) return;
		ProjectList.currentProject = this.projectsList[newIndex];
	}

	addProject(name){
		const newProject = new Project(name);
		this.projectsList.push(newProject);
	}

	renameProject(index, newName){
		if(index < 0 || index > this.projectsList.length) return;
		this.projectsList[index].renameProject(newName);
	}

	deleteProject(index){
		if(index < 0 || index > this.projectsList.length) return;
		this.projectsList.splice(index, 1);
	}

	logProjects(){
		this.projectsList.forEach((project) =>{
			console.log(`Project Name: ${project.name}`)
			project.outputAllToDos();
		});
	}

	addToDo(name, desc, dueDate, priority){
		let project = ProjectList.currentProject;
		console.log(project);
		project.addCard(name, desc, dueDate, priority);
	}

	delToDo(index){
		ProjectList.currentProject.deleteCard(index);
	}
}