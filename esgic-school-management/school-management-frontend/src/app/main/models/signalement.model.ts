import {Commune} from "./commune.model";
import {Quartier} from "./quartier.model";
import {Gravite} from "./gravite.model";
import {Statut} from "./statut.model";
import {AbstractPageEntity} from "./abstract-page-entity.model";

export class Signalement {
    id: number;
    nom: string;
    prenom: string;
    adresse: string;
    telephone: string;
    description: string;

    date: Date // Datetime;

    commune: Commune;

    quartier: Quartier;

    gravite: Gravite;

    statut: Statut;
}

export class SignalementDto {

    nom: string;
    prenom: string;
    adresse: string;
    telephone: string;
    description: string;

    date: Date // Datetime;

    commune: Commune;

    quartier: Quartier;

    gravite: Gravite;
}

export class SignalementPage extends AbstractPageEntity<Signalement>{

}
