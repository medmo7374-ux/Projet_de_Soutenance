import { ResolveFn } from '@angular/router';
import { inject, Injectable } from "@angular/core";
import { Location } from "@angular/common";
import { catchError, forkJoin, throwError } from "rxjs";
import {CommuneService} from "../../../../../@externals/authentication/services/commune.service";
import { GraviteService } from '@externals/authentication/services/gravite.service';
import {QuartierService} from "../../../../../@externals/authentication/services/quartier.service";


@Injectable({
    providedIn: "root"
})
export class SignalementResolver {
    communeService = inject(CommuneService);
    quartierService = inject(QuartierService);
    graviteService = inject(GraviteService);

    public getAll(): any {
        return forkJoin([
            this.communeService.getAllCommune(),
            this.quartierService.getAllQuartier(),
            this.graviteService.getAllGravite()
        ]);
    }
}

export const signalementResolver: ResolveFn<any> = (route, state) => {
    const location = inject(Location);
    const signalementResolver = inject(SignalementResolver);
    return signalementResolver.getAll().pipe(catchError(err => {
        location.back();
        return throwError(() => err);
    }));
};
