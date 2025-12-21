import { Member } from 'entities/Member';

export interface AdministrationPageSchema {
    isLoading: boolean;
    error?: string;
    members: Member[];
    _inited: boolean;
}
