import {TaskStatus} from "./task.model";
import {IsIn, IsOptional,IsNotEmpty} from "class-validator";

export class TaskFilterDto{

    @IsOptional()
    @IsIn([TaskStatus.OPEN,TaskStatus.IN_PROGRESS,TaskStatus.DONE])
    status :TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search:string;
}