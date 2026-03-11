import { Member } from 'entities/Member';

export interface AdminMembersPageSchema {
    isLoading: boolean;
    error?: string;
    membersAdministration: Member[];
    membersAcademicCouncil: Member[];
    membersYoungScientists: Member[];
    membersVirology: Member[];
    membersMicrobiology: Member[];
    membersGeneticResearch: Member[];
    membersProtozoology: Member[];
    membersToxicology: Member[];
    membersProductionDepartment: Member[];
    _inited: boolean;
    addingMemberFullName: string;
    addingMemberSection: string;
}
