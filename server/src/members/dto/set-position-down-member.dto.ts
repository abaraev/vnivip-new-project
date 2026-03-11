import {IsNotEmpty, Length} from "class-validator";
import {IsJobSection} from "../../decorators/IsJobSection";
import {IsIntString} from "../../decorators/IsIntString";

export class SetPositionDownMemberDto {
    @IsNotEmpty({message: 'cannot be empty'})
    @IsIntString({message: 'required integer string'})
    @Length(1, 32, {message: 'required length from 1 to 32'})
    readonly memberPosition: number;

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
}