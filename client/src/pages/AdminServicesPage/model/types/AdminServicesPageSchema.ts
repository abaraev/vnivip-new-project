import { Service } from 'entities/Service';

export interface AdminServicesPageSchema {
    isLoading: boolean;
    error?: string;
    services: Service[];
    _inited: boolean;
    addingServiceName: string;
    addingServicePrice: string;
}
