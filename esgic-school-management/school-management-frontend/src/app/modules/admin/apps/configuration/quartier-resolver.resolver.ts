import {ResolveFn} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {Location} from "@angular/common";
import {catchError, forkJoin, throwError} from "rxjs";
import {QuartierService} from "../../../../../@externals/authentication/services/quartier.service";

@Injectable({
    providedIn: "root"
})
export class QuartierResolver {
    quartierService = inject(QuartierService);

    public getAll(): any {
        return this.quartierService.getPage(0, 10);
    }
}

export const quartierResolver: ResolveFn<any> = (route, state) => {
    const location = inject(Location);
    const quartierResolver = inject(QuartierResolver)
    return forkJoin<any>([
        quartierResolver.getAll().toPromise()
    ]).pipe(catchError(err => {
        location.back();
        return throwError(() => err);
    }));
};
