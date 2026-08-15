import {IsUndefined} from "../../decorators/IsUndefined";

export class CreateActClinicDto {
    @IsUndefined({message: 'can be only document in form-data'})
    staticFile?: string;
}