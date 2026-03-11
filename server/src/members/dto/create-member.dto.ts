import {IsEmail, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";
import {IsUndefined} from "../../decorators/IsUndefined";
import {IsJobSection} from "../../decorators/IsJobSection";
import {IsIntString} from "../../decorators/IsIntString";

export class CreateMemberDto {

    @IsNotEmpty({message: 'cannot be empty'})
    @IsString({message: 'required string'})
    @Length(1, 128, {message: 'required length from 1 to 128'})
    readonly fullName: string;

    @IsOptional()
    @IsNotEmpty({message: 'cannot be empty'})
    @IsString({message: 'required string'})
    @Length(1, 128, {message: 'required length from 1 to 128'})
    readonly jobName: string;

    @IsOptional()
    @IsNotEmpty({message: 'cannot be empty'})
    @IsString({message: 'required string'})
    @Length(1, 1024, {message: 'required length from 1 to 1024'})
    readonly bio: string;

    @IsOptional()
    @IsNotEmpty({message: 'cannot be empty'})
    @IsString({message: 'required string'})
    @Length(1, 128, {message: 'required length from 1 to 128'})
    readonly status?: string;

    @IsNotEmpty({message: 'cannot be empty'})
    @IsJobSection({message: 'valid sections: ' +
            'ADMINISTRATION, ' +
            'ACADEMIC_COUNCIL, ' +
            'COUNCIL_OF_YOUNG_SCIENTISTS,' +
            'DEPARTMENT_OF_VIROLOGY,' +
            'DEPARTMENT_OF_MOLECULAR_GENETIC_RESEARCH,' +
            'DEPARTMENT_OF_PROTOZOOLOGY,' +
            'DEPARTMENT_OF_PHARMACOLOGY_AND_TOXICOLOGY,' +
            'DEPARTMENT_OF_MICROBIOLOGY,' +
            'PRODUCTION_DEPARTMENT'})
    readonly section: string;

    @IsOptional()
    @IsString({message: 'required string'})
    @Length(0, 64, {message: 'required length from 0 to 64'})
    readonly email?: string;

    @IsOptional()
    @IsString({message: 'required string'})
    @Length(0, 32, {message: 'required length from 0 to 32'})
    readonly phone?: string;

    @IsUndefined({message: 'can be only image in form-data'})
    avatar?: string;

    position?: number;
}