import {AbstractPageEntity} from "./abstract-page-entity.model";

export interface Quartier {
    id: number;
    nom: string;
    createdBy: string;
    createdAt: Date;
    lastModifiedBy: string;
    lastModifiedDate: Date;
}

export class QuartierPage extends AbstractPageEntity<Quartier>{

}
