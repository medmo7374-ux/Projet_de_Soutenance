import { ResolveFn } from '@angular/router';
import { inject, Injectable } from "@angular/core";
import { Location } from "@angular/common";
import { catchError, forkJoin, throwError } from "rxjs";
import {SignalementService} from "../../../../../@externals/authentication/services/signalement.service";

@Injectable({
    providedIn: "root"
})
export class SignalementListResolver {
    signalementService = inject(SignalementService);

    public getAll(): any {
        return this.signalementService.getPage(0, 10);
    }
}

export const signalementListResolver: ResolveFn<any> = (route, state) => {
    const location = inject(Location);
    const signalementResolver = inject(SignalementListResolver);
    return forkJoin<any>([
        signalementResolver.getAll()
    ]).pipe(catchError(err => {
        location.back();
        return throwError(() => err);
    }));
};
