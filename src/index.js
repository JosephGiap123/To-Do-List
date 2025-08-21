import './styles/style.css';
import './styles/project-sidebar.css';
import './styles/dialogs.css';
import './styles/to-do-area.css';
import { ProjectList } from './scripts/ProjectList';
import { DOMInterface } from './scripts/DOMInterface';

// ProjectList.addProject('Project1');
// ProjectList.addProject('Project2');

// ProjectList.addToDo('A', '', "2004-09-04", 4);
// ProjectList.addToDo('B', '', "2025-01-03", 2);
// ProjectList.addToDo('C', '', "2020-02-02", 3);
// ProjectList.addToDo('A', '', "2004-09-04", 4);

// const stringified = JSON.stringify(ProjectList.projectsList);
// console.log(stringified);
// console.log(JSON.parse(stringified));

ProjectList.loadFromStorage();

DOMInterface.updateProjects(ProjectList.projectsList);
DOMInterface.updateToDo();



