import {ResolveFn} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {catchError, forkJoin, throwError} from "rxjs";
import {Location} from "@angular/common";
import {EtudiantService} from "../../../../../@externals/authentication/services/etudiant.service";

@Injectable({
    providedIn: "root"
})
export class EtudiantListResolver {

    private userService = inject(EtudiantService);

    public getUsers(): any {
        return this.userService.getPage(0, 10);
    }
}

export const etudiantListResolver: ResolveFn<any> = (route, state) => {
    const location = inject(Location);
    const usersResolver = inject(EtudiantListResolver);
    return forkJoin<any>([
        usersResolver.getUsers().toPromise(),
    ]).pipe(catchError(err => {
        location.back()
        return throwError(() => err)
    }));
};
