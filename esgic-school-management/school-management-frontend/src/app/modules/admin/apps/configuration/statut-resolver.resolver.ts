import {ResolveFn} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {Location} from "@angular/common";
import {catchError, forkJoin, throwError} from "rxjs";
import {StatutService} from "../../../../../@externals/authentication/services/statut.service";

@Injectable({
    providedIn: "root"
})
export class StatutResolver {
    statutService = inject(StatutService);

    public getAll(): any {
        return this.statutService.getPage(0, 10);
    }
}

export const statutResolver: ResolveFn<any> = (route, state) => {
    const location = inject(Location);
    const statutResolver = inject(StatutResolver);
    return forkJoin<any>([
        statutResolver.getAll().toPromise()
    ]).pipe(catchError(err => {
        location.back();
        return throwError(() => err);
    }));
};
