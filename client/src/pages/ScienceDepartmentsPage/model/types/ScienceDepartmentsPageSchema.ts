import { Member } from 'entities/Member';

export interface ScienceDepartmentsPageSchema {
    isLoading: boolean;
    error?: string;
    membersVirology: Member[];
    membersMicrobiology: Member[];
    membersMolecular: Member[];
    membersProtozoology: Member[];
    membersPharmacology: Member[];
    membersProduction: Member[];
    _inited: boolean;
}
