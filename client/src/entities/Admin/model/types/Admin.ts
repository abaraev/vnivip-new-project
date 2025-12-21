export interface AdminData {
    id: number;
    login: string;
}

export interface AdminSchema {
    data?: AdminData;
    isInit: boolean;
}
