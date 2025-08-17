import './styles/style.css';
import './styles/project-sidebar.css';
import './styles/dialogs.css';
import './styles/to-do-area.css';
import { ProjectList } from './scripts/ProjectList';
import { DOMInterface } from './scripts/DOMInterface';


// ProjectList.changeCurrentProject()
DOMInterface.clearTodoDOM();
DOMInterface.displayToDos(ProjectList.currentProject);

DOMInterface.clearProjectsDOM();
DOMInterface.displayProjects(ProjectList.projectsList);



