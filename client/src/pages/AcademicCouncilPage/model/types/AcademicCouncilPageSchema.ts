import { Member } from 'entities/Member';

export interface AcademicCouncilPageSchema {
    isLoading: boolean;
    error?: string;
    members: Member[];
    _inited: boolean;
}
