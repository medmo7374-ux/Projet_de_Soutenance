export interface AdherentEventPage {
    content: AdherentEvent[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface AdherentEvent {
    id: number;
    eventTitle: string;
    startDate: Date;
    endDate: Date;
    location: string;
    montant: number;
    average: string;
    status: string;
    payement: null;
    category: string;
    description: string;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    unpaged: boolean;
    paged: boolean;
}

export interface Sort {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
}
