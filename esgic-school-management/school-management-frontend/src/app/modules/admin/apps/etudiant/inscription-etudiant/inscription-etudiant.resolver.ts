import {GraviteService} from "../../../../../../@externals/authentication/services/gravite.service";
import {CommuneService} from "../../../../../../@externals/authentication/services/commune.service";
import {catchError, forkJoin, throwError} from "rxjs";
import {Injectable, inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import {Location} from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class InscriptionEtudiantResolver {

    constructor(private communeService: CommuneService, private graviteService: GraviteService) {

    }

    getAllFilieres(): any {

        return this.communeService.getAllCommune();

    }

    getAllNiveaux(): any {

        return this.graviteService.getAllGravite();

    }
}

export const inscriptionResolver: ResolveFn<any> = (route, state) => {
    const resolverService = inject(InscriptionEtudiantResolver)
    const location = inject(Location)
    return forkJoin<any>([
        resolverService.getAllFilieres().toPromise(),
        resolverService.getAllNiveaux().toPromise()
    ]).pipe(catchError(err => {
        location.back()
        return throwError(() => err)
    }));

};
