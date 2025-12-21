import {IsNotEmpty} from "class-validator";
import {IsJobSection} from "../../decorators/IsJobSection";

export class GetBySectionDto {

    @IsNotEmpty({message: 'cannot be empty'})
    @IsJobSection({message: 'valid sections: ' +
            'ADMINISTRATION, ' +
            'ACADEMIC_COUNCIL, ' +
            'COUNCIL_OF_YOUNG_SCIENTISTS,' +
            'DEPARTMENT_OF_VIROLOGY,' +
            'DEPARTMENT_OF_MOLECULAR_GENETIC_RESEARCH,' +
            'DEPARTMENT_OF_PROTOZOOLOGY,' +
            'DEPARTMENT_OF_PHARMACOLOGY_AND_TOXICOLOGY,' +
            'PRODUCTION_DEPARTMENT'})
    readonly section: string;
}