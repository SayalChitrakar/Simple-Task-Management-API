import {Injectable,NotFoundException} from '@nestjs/common';
import {Task, TaskStatus} from './task.model';
import {v1 as uuid} from 'uuid';
import {CreateTasksDto} from "./create-tasks.dto";
import {TaskFilterDto} from "./task-filter.dto";

@Injectable()
export class TasksService {

    private tasks : Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks;
    }
    getFilteredTask (taskFilter:TaskFilterDto):Task[]{
        const {status,search} = taskFilter;
        let tasks :Task[] = this.getAllTasks();

        if(status){
            tasks = tasks.filter((task)=>task.status === status)
        }
        if(search)
        {
            tasks = tasks.filter((task)=>{
                return task.title.includes(search) || task.description.includes(search)
            });
        }
        return tasks;
    }
    getTask(id:string):Task{
        const found = this.tasks.find((task)=>task.id === id);
        if(!found){
            throw new NotFoundException(`task with id: ${id} not found`);
        }
        else{
            return found;
        }
    }
     createTasks(createTaskDto:CreateTasksDto):Task{

        const {title,description} = createTaskDto;
        const task:Task = {
            id:uuid(),
            title,
            description,
            status:TaskStatus.OPEN
        }

        this.tasks.push(task);
        return task;
    }

    deleteTask(id:string):null{
        let found = this.getTask(id);
        this.tasks = this.tasks.filter((task)=>task.id !== found.id);
        return null;
    }
    updateTask(id:string,status:TaskStatus):Task{

        let found =  this.tasks.find((task)=>task.id===id)

        if(!found){
            throw new NotFoundException(`task with id: ${id} not found`);
        }

        found.status = status;
        return this.tasks.find((task)=>task.id === id)
    }

}
