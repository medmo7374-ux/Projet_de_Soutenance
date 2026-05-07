import { ResolveFn } from '@angular/router';
import { inject, Injectable } from "@angular/core";
import { Location } from "@angular/common";
import { catchError, forkJoin, throwError } from "rxjs";
import { SignalementService } from '@externals/authentication/services/signalement.service';
import { CommuneService } from '@externals/authentication/services/commune.service';
import { QuartierService } from '@externals/authentication/services/quartier.service';
import { GraviteService } from '@externals/authentication/services/gravite.service';
import {StatutService} from "../../../../../@externals/authentication/services/statut.service";

@Injectable({
    providedIn: "root"
})
export class SignalementDetailResolver {
    signalementService = inject(SignalementService);
    communeService = inject(CommuneService);
    quartierService = inject(QuartierService);
    graviteService = inject(GraviteService);
    statutService = inject(StatutService);

    public getAll(signalementId: number): any {
        return forkJoin([
            this.signalementService.getById(signalementId),
            this.communeService.getAllCommune(),
            this.quartierService.getAllQuartier(),
            this.graviteService.getAllGravite(),
            this.statutService.getAllStatut()
        ]);
    }
}

export const signalementDetailResolver: ResolveFn<any> = (route, state) => {
    const location = inject(Location);
    const signalementResolver = inject(SignalementDetailResolver);
    const signalementId = +route.paramMap.get('id');
    return signalementResolver.getAll(signalementId).pipe(catchError(err => {
        location.back();
        return throwError(() => err);
    }));
};
