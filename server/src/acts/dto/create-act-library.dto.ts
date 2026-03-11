import {IsUndefined} from "../../decorators/IsUndefined";

export class CreateActLibraryDto {
    @IsUndefined({message: 'can be only document in form-data'})
    staticFile?: string;
}