import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {Helpers} from "../../../app/main/helpers/Helpers";

export const authenticationChildGuard: CanActivateFn = (route, state) => {
    const router: Router = inject(Router);
    return Helpers.checkAuthorization(router, state);
};
