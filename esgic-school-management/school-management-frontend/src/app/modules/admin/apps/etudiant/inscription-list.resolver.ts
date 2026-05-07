import {ResolveFn} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {catchError, forkJoin, throwError} from "rxjs";
import {Location} from "@angular/common";
import {InscriptionService} from "../../../../../@externals/authentication/services/inscription.service";

@Injectable({
    providedIn: "root"
})
export class InscriptionListResolver {

    private userService = inject(InscriptionService);

    public getUsers(): any {
        return this.userService.getPage(0, 10);
    }
}

export const inscriptionListResolver: ResolveFn<any> = (route, state) => {
    const location = inject(Location);
    const usersResolver = inject(InscriptionListResolver);
    return forkJoin<any>([
        usersResolver.getUsers().toPromise(),
    ]).pipe(catchError(err => {
        location.back()
        return throwError(() => err)
    }));
};
