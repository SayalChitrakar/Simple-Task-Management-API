import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch,
    Query,
    UsePipes,
    ValidationPipe,
    ParseIntPipe
} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {TaskStatus} from "./task-status.enum";
import {CreateTasksDto} from "./create-tasks.dto";
import {TaskFilterDto} from "./task-filter.dto";
import {TaskStatusValidationPipe} from "./pipes/task-status-validation.pipe";
import {Task} from "./task.entity";
@Controller('tasks')
export class TasksController {

    constructor(private taskService : TasksService){

    }

    @Get('/:id')
    getTask(@Param('id', ParseIntPipe) id : number):Promise<Task>{

        return this.taskService.getTask(id)
    }
    /**
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
     **/

    /**
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
     **/
}
