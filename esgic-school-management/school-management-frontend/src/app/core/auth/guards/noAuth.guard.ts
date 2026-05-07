import {inject} from '@angular/core';
import {CanActivateChildFn, CanActivateFn, Router} from '@angular/router';
import {Helpers} from "../../../main/helpers/Helpers";
import {Paths} from "../../../main/paths/Paths";

export const NoAuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
    const router: Router = inject(Router);

    if (Helpers.getAccessTokenInSessionStorage() == undefined) {
        return true;
    }
    /*const routerPromise = router.navigate([Paths.login()], {queryParams : {to : state.url}});
    routerPromise.then()*/
    router.navigateByUrl(Paths.dashboard())
    return false;
};
