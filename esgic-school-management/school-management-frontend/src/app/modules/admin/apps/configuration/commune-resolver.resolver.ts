import {ResolveFn} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {Location} from "@angular/common";
import {catchError, forkJoin, throwError} from "rxjs";
import {CommuneService} from "../../../../../@externals/authentication/services/commune.service";

@Injectable({
    providedIn: "root"
})
export class CommuneResolver {
    communeService = inject(CommuneService);

    public getAll(): any {
        return this.communeService.getPage(0, 10,);
    }
}

export const communeResolver: ResolveFn<any> = (route, state) => {
    const location = inject(Location);
    const communeResolver = inject(CommuneResolver)
    return forkJoin<any>([
        communeResolver.getAll().toPromise()
    ]).pipe(catchError(err => {
        location.back();
        return throwError(() => err);
    }));
};
