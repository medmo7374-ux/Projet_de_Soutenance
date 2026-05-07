import {ResolveFn} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {Location} from "@angular/common";
import {catchError, forkJoin, throwError} from "rxjs";
import {GraviteService} from "../../../../../@externals/authentication/services/gravite.service";

@Injectable({
    providedIn: "root"
})
export class GraviteResolver {
    graviteService = inject(GraviteService);

    public getAll(): any {
        return this.graviteService.getPage(0, 10);
    }
}

export const graviteResolver: ResolveFn<any> = (route, state) => {
    const location = inject(Location);
    const graviteResolver = inject(GraviteResolver);
    return forkJoin<any>([
        graviteResolver.getAll().toPromise()
    ]).pipe(catchError(err => {
        location.back();
        return throwError(() => err);
    }));
};
