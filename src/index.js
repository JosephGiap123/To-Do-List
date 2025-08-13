import './styles/style.css';
import { ProjectList } from './scripts/ProjectList';
import { DOMInterface } from './scripts/DOMInterface';

const projectL = new ProjectList();
projectL.addProject('Project1');
projectL.addProject('Project2');
projectL.addToDo('A', '', new Date(), 2);
projectL.addToDo('B', '', new Date(), 1);
projectL.addToDo('C', '', new Date(), 3);

// projectL.changeCurrentProject()
DOMInterface.clearTodoDOM();
DOMInterface.displayToDos(ProjectList.currentProject);

DOMInterface.clearProjectsDOM();
DOMInterface.displayProjects(projectL.projectsList);



