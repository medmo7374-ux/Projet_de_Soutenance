export interface EvenementPage {
    content: Evenement[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}

export interface Evenement {
    id: number;
    title: string;
    description: string;
    category: string;
    endDate: Date;
    startDate: Date;
    montantParticipation: number;
    location: string;
    eventType: string;
    datePlanification: Date;
    datePublication: Date;
    dateAnnulation: Date;
    dateCloture: Date;
    dateDeprogrammation: Date;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Sort {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
}
