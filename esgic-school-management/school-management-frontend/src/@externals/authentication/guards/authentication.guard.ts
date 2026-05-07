import {CanActivateFn, Router} from '@angular/router';
import {Helpers} from "../../../app/main/helpers/Helpers";
import {inject} from "@angular/core";


export const authenticationGuard: CanActivateFn = (route, state) => {
    const router: Router = inject(Router);
    return Helpers.checkAuthorization(router, state);
};
