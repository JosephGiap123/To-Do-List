import { ToDo } from "./todo.js";

export class Project{
	constructor(name){
		this.name = name;
		this.toDoList = [];
		this.id = crypto.randomUUID();
	}

  addCard(name, description, dueDate, priority){
		const toDoCard = new ToDo(name, description, dueDate, priority);
		this.toDoList.push(toDoCard);
	}

	deleteCard(id){
		this.toDoList.forEach((card, index)=>{
			if(card.id === id){
				this.toDoList.splice(index,1);
				return;
			}
		});
	}

	renameProject(newName){
		this.name = newName;
	}

	outputAllToDos(){
		this.toDoList.forEach((toDo, index)=>{
			console.log(`${index}: ${toDo.name}`);
		});
	}
}