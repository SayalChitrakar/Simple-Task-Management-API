import {IsNotEmpty} from 'class-validator';


export class CreateTasksDto{
    constructor() {
    }

    @IsNotEmpty()
    title :string;

    @IsNotEmpty()
    description:string;
}

