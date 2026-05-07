import {AbstractPageEntity} from "../models/abstract-page-entity.model";

export class UtilisateurPage extends AbstractPageEntity<UtilisateurEntity>{ }

export interface UtilisateurEntity {
    id: number;
    createdBy: string;
    createdAt: Date;
    lastModifiedBy: null;
    lastModifiedDate : Date;
    nom: string;
    prenom: string;
    email: string;
    username: string;
    telephone: string;
    adresse: string;
    rue: string;
    porte: string;
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
