import {UtilisateurEntity} from "./utilisateur.page";

export interface Don {
    id: number;
    motif: string;
    utilisateur: UtilisateurEntity;
    nomDonneur: string;
    telDonneur: string;
    payementStatus: string;
    payementAverage: string;
    createdAt: Date;
    isAnonymous: boolean;
    montant: number;
}

export interface DonPage {
    content: Don[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
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
    sorted: boolean;
    unsorted: boolean;
}
