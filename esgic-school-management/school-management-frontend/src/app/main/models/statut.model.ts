import {AbstractPageEntity} from "./abstract-page-entity.model";

export interface Statut {
    id: number;
    libelle: string;
    createdBy: string;
    createdAt: Date;
    lastModifiedBy: string;
    lastModifiedDate: Date;
}
export class StatutPage extends AbstractPageEntity<Statut>{
}
