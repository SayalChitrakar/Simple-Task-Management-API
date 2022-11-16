import {Injectable} from '@nestjs/common';
import {Task, TaskStatus} from './task.model';
import {v1 as uuid} from 'uuid';
import {CreateTasksDto} from "./create-tasks.dto";

@Injectable()
export class TasksService {

    private tasks : Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks;
    }

    getTask(id:string):Task{
        return this.tasks.find((task)=>task.id === id);
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

        this.tasks = this.tasks.filter((task)=>task.id !== id);
        return null;
    }
    updateTask(id:string,status:TaskStatus):Task{

        this.tasks.find((task)=>task.id===id).status = status;
        return this.tasks.find((task)=>task.id === id)
    }

}
