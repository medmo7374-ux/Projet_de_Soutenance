export interface AdherentCotisationPage {
    content: AdherentCotisation[];
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

export interface AdherentCotisation {
    id: number;
    nomAdherent: string;
    prenomAdherent: string;
    telAdherent: string;
    createdAt: Date;
    paiementDate: Date;
    exerciceCotisation: number;
    payementAverage: string;
    payementStatus: string;
    montant: number;
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
    sorted: boolean;
    unsorted: boolean;
}
