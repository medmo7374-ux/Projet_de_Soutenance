import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {AuthService} from "../../../app/main/services/auth.service";


/**
 * Intercept
 *
 * @param req
 * @param next
 */
export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const authService = inject(AuthService);

    let newReq = req.clone({
        headers: req.headers
            .set('X-POWERED-BY', 'ESGIC')
            .set('X-AUTH-TOKEN', 'true')
            .set('X-ORG-IDENTIFIER', 'AQUA SENTRY')
    });

    if (authService.accessToken) {
        newReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + authService.accessToken).set('X-POWERED-BY', 'LOGA ENGINEERING').set('X-AUTH-TOKEN', 'true').set('X-ORG-IDENTIFIER', 'AMASEM'),
        });
    }

    return next(newReq).pipe(
        catchError((error) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {

                //sessionStorage.removeItem('access-token');
                //sessionStorage.removeItem('roles');
                //sessionStorage.removeItem('current');
                //sessionStorage.removeItem('adherent');

                //Reload the app
                //location.reload();
            }

            return throwError(() => error);
        }),
    );
};
