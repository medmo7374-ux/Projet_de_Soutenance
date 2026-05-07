import {ResolveFn} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {catchError, forkJoin, throwError} from "rxjs";
import {Location} from "@angular/common";
import {UtilisateurService} from "../../../../../../@externals/authentication/services/utilisateur.service";

@Injectable({
    providedIn: "root"
})
export class ListUsersResolver {

    private userService = inject(UtilisateurService);

    public getUsers(): any {
        return this.userService.getAllUsers(0, 10);
    }
}

export const listUsersResolver: ResolveFn<any> = (route, state) => {
    const location = inject(Location);
    const usersResolver = inject(ListUsersResolver);
    return forkJoin<any>([
        usersResolver.getUsers().toPromise(),
    ]).pipe(catchError(err => {
        location.back()
        return throwError(() => err)
    }));
};
