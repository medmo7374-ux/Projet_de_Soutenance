import {ResolveFn} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {Location} from "@angular/common";
import {catchError, forkJoin, throwError} from "rxjs";
import {UtilisateurService} from "../../../../../../@externals/authentication/services/utilisateur.service";

@Injectable({
    providedIn: "root"
})
export class UpdateUserResolver {
    private userService = inject(UtilisateurService);

    public getUserById(id: number): any {
        return this.userService.getUserById(id);
    }
}

export const updateUserResolver: ResolveFn<any> = (route, state) => {
    const userResolver = inject(UpdateUserResolver);
    const location = inject(Location);
    return forkJoin<any>([
        userResolver.getUserById(route.params['id']).toPromise(),
    ]).pipe(catchError(err => {
        location.back();
        return throwError(() => err);
    }));
};
