import {Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {Task,TaskStatus} from "./task.model";
import {CreateTasksDto} from "./create-tasks.dto";
import {TaskFilterDto} from "./task-filter.dto";
import {TaskStatusValidationPipe} from "./pipes/task-status-validation.pipe";

@Controller('tasks')
export class TasksController {

    constructor(private taskService : TasksService){

    }
    @Get()
    @UsePipes(ValidationPipe)
    getTasks(@Query() taskFilter : TaskFilterDto): Task[]{
        console.log(taskFilter);
        if(Object.keys(taskFilter).length){

            return this.taskService.getFilteredTask(taskFilter);
        }
        else{
            return this.taskService.getAllTasks();
        }
    }
    @Get('/:id')
    getTask (@Param('id') id:string):Task{
       return this.taskService.getTask(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto : CreateTasksDto):Task{
       return this.taskService.createTasks(createTaskDto)
    }
    @Delete('/:id')
    deleteTask(@Param('id')id:string):null{
        return this.taskService.deleteTask(id);
    }
    @Patch('/:id/status')
    updateTask(@Param('id')id:string,@Body('status',TaskStatusValidationPipe) status:TaskStatus):Task{
        return this.taskService.updateTask(id,status);
    }
}
