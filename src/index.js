import './styles/style.css';
import { ProjectList } from './scripts/ProjectList';


const projectL = new ProjectList();
projectL.addProject('Project1');
projectL.addProject('Project2');
const proj1ID = projectL.tempGetProjectID(0);
const proj2ID = projectL.tempGetProjectID(1);
projectL.addToDo(proj1ID, 'A', '', new Date(), 2);
projectL.addToDo(proj1ID, 'B', '', new Date(), 1);
projectL.addToDo(proj1ID, 'C', '', new Date(), 3);
projectL.logProjects();

