import { Member } from 'entities/Member';

export interface MemberDetailsPageSchema {
    isLoading: boolean;
    error?: string;
    member?: Member;
    _inited: boolean;
}
