import {IsNotEmpty, IsOptional, IsString, Length, MaxLength} from "class-validator";
import {IsIntString} from "../../decorators/IsIntString";
import {IsOrder} from "../../decorators/IsOrder";

export class GetNewsPartDto {
    @IsNotEmpty({message: 'cannot be empty'})
    @IsIntString({message: 'required integer'})
    readonly page: number;

    @IsNotEmpty({message: 'cannot be empty'})
    @IsIntString({message: 'required integer'})
    readonly limit: number;

    @IsOptional()
    @IsString({message: 'required string'})
    @MaxLength(64, {message: 'max length 64'})
    readonly search: string;

    @IsOptional()
    @IsOrder({message: 'required ASC or DESC order'})
    @IsString({message: 'required string'})
    readonly order: string;
}
