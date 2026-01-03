import {IsUndefined} from "../../decorators/IsUndefined";

export class CreateActCompetitionDto {
    @IsUndefined({message: 'can be only document in form-data'})
    staticFile?: string;
}