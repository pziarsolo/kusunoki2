import { environment } from '../../../environments/environment';

export const ApiUrls = {
    institutes: environment.apiUrl + 'institutes/',
    countries: environment.apiUrl + 'countries/',
    dataSources: environment.apiUrl + 'data_sources/',
    accessions: environment.apiUrl + 'accessions/',
    accessionsets: environment.apiUrl + 'accessionsets/',
    numbers: environment.apiUrl + 'numbers/',
    taxa: environment.apiUrl + 'taxa/',
    users: environment.apiUrl + 'users/',
    groups: environment.apiUrl + 'groups/',
    tokenCreate: environment.apiUrl + 'auth/token/',
    tokenRefresh: environment.apiUrl + 'auth/token/refresh/',
    tokenVerify: environment.apiUrl + 'auth/token/verify/',
    tasks: environment.apiUrl + 'tasks/',
    studies: environment.apiUrl + 'studies/',
    observations: environment.apiUrl + 'observations/',
    scales: environment.apiUrl + 'scales/',
    traits: environment.apiUrl + 'traits/',
    observationVariables: environment.apiUrl + 'observation_variables/',
    observation_images: environment.apiUrl + 'observation_images/',
    seed_requests: environment.apiUrl + 'seed_requests/',
};
