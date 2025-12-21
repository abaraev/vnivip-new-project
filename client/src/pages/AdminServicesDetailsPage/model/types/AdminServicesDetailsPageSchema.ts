import { Service } from 'entities/Service';

export interface AdminServicesDetailsPageSchema {
    isLoading: boolean;
    error: string | undefined;
    _inited: boolean;
    service?: Service;
    name: string;
    price: string;
    coverImg: string;
}
