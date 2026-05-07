import {Commune} from "./commune.model";
import {Gravite} from "./gravite.model";

import {AbstractPageEntity} from "./abstract-page-entity.model";
import {StatutInscription} from "../../../@externals/enums/statut-inscription";

export class Etudiant {
    id: number;
    prenom: string;
    nom: string;
    adresse: string;
    email: string;
    telephone: string;
    dateNaissance: Date;
    lieuNaissance: string;
    typeInscription: TypeInscription;
    filiere: Commune;
    niveau: Gravite;
    statutInscription: StatutInscription

}

export enum TypeInscription {
    PHYSIQUE = "PHYSIQUE",
    EN_LIGNE = "EN_LIGNE"
}

export class EtudiantDto {

    prenom: string;
    adresse: string;
    email: string;
    telephone: string;
    dateNaissance: Date;
    lieuNaissance: string;
    typeInscription: TypeInscription;
    filiere: Commune;
    niveau: Gravite;
}

export class EtudiantPage extends AbstractPageEntity<Etudiant> {

}
