import { Controller,Get,Post,Body,Param,Delete,Patch} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {Task,TaskStatus} from "./task.model";
import {CreateTasksDto} from "./create-tasks.dto";

@Controller('tasks')
export class TasksController {

    constructor(private taskService : TasksService){

    }
    @Get()
    getAllTasks(): Task[]{
        return this.taskService.getAllTasks();
    }
    @Get('/:id')
    getTask (@Param('id') id:string):Task{
       return this.taskService.getTask(id);
    }
    @Post()
    createTask(@Body() createTaskDto : CreateTasksDto):Task{
       return this.taskService.createTasks(createTaskDto)
    }
    @Delete('/:id')
    deleteTask(@Param('id')id:string):null{
        return this.taskService.deleteTask(id);
    }
    @Patch('/:id/status')
    updateTask(@Param('id')id:string,@Body('status') status:TaskStatus):Task{
        return this.taskService.updateTask(id,status);
    }
}
