import {Injectable, NotFoundException} from '@nestjs/common';
import {TaskStatus} from './task-status.enum';
import {CreateTasksDto} from "./create-tasks.dto";
import {TaskRepository} from "./task.repository";
import {Task} from "./task.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository :TaskRepository
    ){}

  /**

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
   **/
  //Getting tasks by Id

  async getTask(id:number) :Promise<Task>{
      const found = await this.taskRepository.findOne({where:{id}});

      if(!found){
          throw new NotFoundException(`Task with ${id} not found`);

      }

      return found;
  }
  //Creating Task

  /**
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
**/
}
