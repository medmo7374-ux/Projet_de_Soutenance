
import {AbstractPageEntity} from "./abstract-page-entity.model";
import {StatutInscription} from "../../../@externals/enums/statut-inscription";
import {Etudiant, TypeInscription} from "./etudiant.model";

export class Inscription {
    id: number;
    dateInscription: Date;

    statutInscription: StatutInscription;
    typeInscription : TypeInscription;

    etudiant : Etudiant;
}


export class InscriptionPage extends AbstractPageEntity<Inscription> {

}
