

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
}

export interface AccessionSetSearchParams extends AccessionSearchParams {
    accessionset_number_contains?: string;
    accessionset_number?: string;
}

export interface ObservationSearchParams {
    study?: string;
}

export interface StudySearchParams {
    name?: string;
}
