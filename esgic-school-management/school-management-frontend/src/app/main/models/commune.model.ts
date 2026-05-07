import {AbstractPageEntity} from "./abstract-page-entity.model";

export interface Commune {
    id: number;
    nom: string;
    libelle: string;
    createdBy: string;
    createdAt: Date;
    lastModifiedBy: string;
    lastModifiedDate: Date;
}

export class CommunePage extends AbstractPageEntity<Commune>{

}
