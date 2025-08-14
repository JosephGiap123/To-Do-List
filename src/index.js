import './styles/style.css';
import { ProjectList } from './scripts/ProjectList';
import { DOMInterface } from './scripts/DOMInterface';


ProjectList.addProject('Project1');
ProjectList.addProject('Project2');
ProjectList.addToDo('A', '', new Date(), 2);
ProjectList.addToDo('B', '', new Date(), 1);
ProjectList.addToDo('C', '', new Date(), 3);

// ProjectList.changeCurrentProject()
DOMInterface.clearTodoDOM();
DOMInterface.displayToDos(ProjectList.currentProject);

DOMInterface.clearProjectsDOM();
DOMInterface.displayProjects(ProjectList.projectsList);



