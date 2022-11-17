import {BadRequestException, PipeTransform} from "@nestjs/common";
import {TaskStatus} from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform{

    readonly allowedStatus = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]
    transform(value:any){
        value = value.toUpperCase();
        if(this.isStatusValid(value)){
            return value
        }
        else{
            throw new BadRequestException("the status is invalid");
        }

    }

    isStatusValid(status:any){
        return this.allowedStatus.indexOf(status) !==-1;
    }
}