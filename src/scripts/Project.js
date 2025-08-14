import { ToDo } from "./todo.js";

export class Project{
	constructor(name){
		this.name = name;
		this.toDoList = [];
	}

  addCard(name, desc, dueDate, priority){
		const toDoCard = new ToDo(name, desc, dueDate, priority);
		this.toDoList.push(toDoCard);
	}

	deleteCard(index){
		if(index < 0 || index > this.toDoList.length-1) return;
		this.toDoList.splice(index, 1);
	}

	changeCard(index, name, desc, dueDate, priority){
		if(index < 0 || index > this.toDoList.length-1) return;
		this.toDoList[index].changeToDoInfo(name, desc, dueDate, priority);
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
}