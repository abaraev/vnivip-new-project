import { Member } from 'entities/Member';

export interface CouncilYoungScientistsPageSchema {
    isLoading: boolean;
    error?: string;
    members: Member[];
    _inited: boolean;
}
