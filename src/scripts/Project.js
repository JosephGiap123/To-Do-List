import { ToDo } from "./todo.js";

export class Project{
	constructor(name){
		this.name = name;
		this.toDoList = [];
	}

  addCard(name, description, dueDate, priority){
		const toDoCard = new ToDo(name, description, dueDate, priority);
		this.toDoList.push(toDoCard);
	}

	deleteCard(index){
		if(index < 0 || index > this.toDoList.length-1) return;
		this.toDoList.splice(index, 1);
	}

	renameProject(newName){
		this.name = newName;
	}

	moveToDoUp(index){
		if(index > 0){
			const temp = this.toDoList[index-1];
			this.toDoList[index-1] = this.toDoList[index];
			this.toDoList[index] = temp;
		}
	}

	moveToDoDown(index){
		if(index < this.toDoList.length-1){
			const temp = this.toDoList[index+1];
			this.toDoList[index+1] = this.toDoList[index];
			this.toDoList[index] = temp;
		}
	}

	outputAllToDos(){
		this.toDoList.forEach((toDo, index)=>{
			console.log(`${index}: ${toDo.title}`);
		});
	}
}