import { Project } from "./Project";
//singleton.

export class ProjectList{
	constructor(){
		if(!ProjectList.instance){
			this.projectsList = [];
		}
		else return ProjectList.instance;
	}

	addProject(name){
		const newProject = new Project(name);
		this.projectsList.push(newProject);
	}

	renameProject(projectID, newName){
		this.projectsList.forEach((project) => {
			if(project.id === projectID){
				project.renameProject(newName);
				return;
			}
		});
	}

	deleteProject(projectID){
		this.projectsList.forEach((project,index)=>{
			if(project.id === projectID){
				this.projectsList.splice(index, 1);
				return;
			}
		});
	}

	findProject(projectID){
		for(let i = 0; i < this.projectsList.length; i++){
			if(this.projectsList[i].id === projectID){
				return {project: this.projectsList[i], index: i}; 
			}
		}
	}

	logProjects(){
		this.projectsList.forEach((project) =>{
			console.log(`Project Name: ${project.name}, ${project.id}`)
			project.outputAllToDos();
		});
	}

	tempGetProjectID(index){
		return this.projectsList[index].id;
	}

	addToDo(projectID, name, desc, dueDate, priority){
		const projObj = this.findProject(projectID);
		const project = projObj.project;
		project.addCard(name, desc, dueDate, priority);
	}

	delToDo(projectID, name, desc, dueDate, priority){
		const projObj = this.findProject(projectID);
		const project = projObj.project;
		project.deleteCard(name, desc, dueDate, priority);
	}
}