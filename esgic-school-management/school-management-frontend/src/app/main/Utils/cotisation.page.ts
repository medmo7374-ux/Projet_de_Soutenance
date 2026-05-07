export interface CotisationPage {
    content: Cotisation[];
    pageable: Pageable;
    totalElements: number;
    totalPages: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}

export interface Cotisation {
    id: number;
    montant: number;
    exercice: Exercice;
    payementStatus: string;
    payementAverage: string;
}

export interface Exercice {
    id: number;
    annee: number;
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
