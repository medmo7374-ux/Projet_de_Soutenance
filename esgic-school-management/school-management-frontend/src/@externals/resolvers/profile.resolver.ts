import {ResolveFn} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {ProfileService} from "../authentication/services/profile.service";
import {catchError, forkJoin, throwError} from "rxjs";
import {Location} from "@angular/common";

@Injectable({
    providedIn: "root"
})
export class ProfileResolver {
    profileService = inject(ProfileService);

    public getProfilesByCriteria(): any {
        return this.profileService.getProfilesByCriteria(0, 10, '');
    }

}

export const profileResolver: ResolveFn<any> = (route, state) => {
    const profileResolver = inject(ProfileResolver)
    const location = inject(Location);
    return forkJoin<any>([
        profileResolver.getProfilesByCriteria().toPromise(),

    ]).pipe(catchError(err => {
        location.back();
        return throwError(() => err);
    }));
};
