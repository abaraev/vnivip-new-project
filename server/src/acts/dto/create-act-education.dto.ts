import {IsUndefined} from "../../decorators/IsUndefined";

export class CreateActEducationDto {
    @IsUndefined({message: 'can be only document in form-data'})
    staticFile?: string;
}