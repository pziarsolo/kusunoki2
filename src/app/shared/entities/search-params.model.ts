

export interface SearchParams {
    limit?: number;
    offset?: number;
    format?: string;
}
export interface AccessionSearchParams extends SearchParams {
    number_contains?: string;
    number_exact?: string;
    institute_code?: string;
    country?: string;
    collection_source?: string;
    biological_status?: string;
    taxon_exact?: string;
    taxon_contains?: string;
    taxon_rank?: string;
    site?: string;
    study?: string;
    observation_filters?: [];
    is_public?: boolean;
    seed_available?: number;
    in_nuclear_collection?: number;
}

export interface AccessionSetSearchParams extends AccessionSearchParams {
    accessionset_number_contains?: string;
    accessionset_number?: string;
}

export interface ObservationSearchParams {
    study?: string;
    studies?: string[];
}

export interface StudySearchParams {
    name?: string;
    name_contains?: string;
    location_contains?: string;
    group?: string;
    contact?: string;
    contact_contains?: string;
    name_or_description?: string;
    is_public?: boolean;
    taxon?: string;
    year?: number;
}
