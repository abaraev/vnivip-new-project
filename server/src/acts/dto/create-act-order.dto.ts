import {IsUndefined} from "../../decorators/IsUndefined";

export class CreateActOrderDto {
    @IsUndefined({message: 'can be only document in form-data'})
    staticFile?: string;
}