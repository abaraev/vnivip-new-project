import {IsUndefined} from "../../decorators/IsUndefined";

export class CreateActDto {
    @IsUndefined({message: 'can be only document in form-data'})
    staticFile?: string;
}