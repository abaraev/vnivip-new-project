import { Member } from 'entities/Member';

export interface AdminMemberDetailsPageSchema {
    isLoading: boolean;
    error: string | undefined;
    _inited: boolean;
    member?: Member;
}
