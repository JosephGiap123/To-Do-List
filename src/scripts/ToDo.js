export class ToDo{
	constructor(title, description, dueDate, priority){
		this.title = title,
		this.description = description,
		this.dueDate = dueDate,
		this.priority = priority;
	}

	changeToDoInfo(newTitle, newDesc, newDate, newPriority){
		this.title = newTitle;
		this.description = newDesc;
		this.dueDate = newDate;
		this.priority = newPriority;
	}
}