import { Service } from 'entities/Service';

export interface ServicesPageSchema {
    isLoading: boolean;
    error?: string;
    services: Service[];
    _inited: boolean;
}
