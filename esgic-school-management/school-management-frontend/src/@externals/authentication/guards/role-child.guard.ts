import {CanActivateFn, Router} from '@angular/router';
import {Helpers} from "../../../app/main/helpers/Helpers";
import {inject} from "@angular/core";
import {of} from "rxjs";

export const roleChildGuard: CanActivateFn = (route, state) => {
    const requiredRoles = route.data['roles'] as string[];
    const router = inject(Router);
    if(Helpers.hasRoles(requiredRoles) && Helpers.checkAuthorization(router, state)) {
        return true;
    } else {
        return of(false);
    }

};
