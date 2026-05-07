import {inject} from '@angular/core';
import {CanActivateChildFn, CanActivateFn, Router} from '@angular/router';
import {of} from 'rxjs';
import {Helpers} from "../../../main/helpers/Helpers";

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
    const router: Router = inject(Router);

    /*// Check the authentication status
    return inject(AuthService).check().pipe(
        switchMap((authenticated) =>
        {
            // If the user is not authenticated...
            if ( !authenticated )
            {
                // Redirect to the sign-in page with a redirectUrl param
                const redirectURL = state.url === '/sign-out' ? '' : `redirectURL=${state.url}`;
                const urlTree = router.parseUrl(`sign-in?${redirectURL}`);

                return of(urlTree);
            }

            // Allow the access
            return of(true);
        }),
    );*/

    if (Helpers.getAccessTokenInSessionStorage() == undefined) {
        const redirectURL = state.url === '/sign-out' ? '' : `redirectURL=${state.url}`;
        const urlTree = router.parseUrl(`sign-in?${redirectURL}`);
        return of(urlTree);
    }

    return of(true)
};
