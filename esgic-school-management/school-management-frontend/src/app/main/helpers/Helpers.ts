import { Router, RouterStateSnapshot } from "@angular/router";
import { Paths } from "../paths/Paths";
import { User } from "../models/user.model";
import { of } from 'rxjs';

export class Helpers {

    /// PRIVATE CONSTANTS
    private static accessTokenKey = 'access-token';
    private static currentUserKey = 'current';
    private static userRolesKey = 'roles';

    /// PUBLIC CONSTANTS
    public static OTP_SENDED_SUCCESSFULLY = 'Un code vous a été envoyé sur cet email. Merci de l\'utiliser pour la suite.';
    public static PASSWORD_RESET_SUCCESSFULLY = 'Votre mot de passe a été réinitialisé avec succès!';
    public static EMAIL_STORE_LOCALSTORAGE_FOR_OTP = 'email-for-reset-password';
    public static OTP_STORE_LOCALSTORAGE_FOR_OTP = 'otp-for-reset-password';
    public static RESET_PASSWORD_ROUTE = 'reset-password';
    public static VERIFY_OTP_ROUTE = 'verify-otp';
    public static UNATTENDED_ERROR_MESSAGE = "Une erreur inattendue s'est produite, veuillez réessayer plus tard!";

    public static saveAccessTokenInSessionStorage(token: any) {
        sessionStorage.setItem(this.accessTokenKey, token);
    }

    public static getAccessTokenInSessionStorage(): string {
        return sessionStorage.getItem(this.accessTokenKey);
    }

    public static saveCurrentUserInSessionStorage(current: any) {
        sessionStorage.setItem(this.currentUserKey, current);
    }

    public static getCurrentUserInSessionStorage(): User {
        const userData = sessionStorage.getItem(this.currentUserKey);
        if (userData) {
            return JSON.parse(userData);
        } else {
            return null;
        }
    }

    public static saveRolesInSessionStorage(roles: any) {
        sessionStorage.setItem(this.userRolesKey, roles);
    }

    public static getRolesInSessionStorage() {
        return sessionStorage.getItem(this.userRolesKey);
    }

    public static checkAuthorization(router: Router, state: RouterStateSnapshot): any {
        if (Helpers.getAccessTokenInSessionStorage() == undefined) {
            const routerPromise = router.navigate([Paths.login()], { queryParams: { to: state.url } });
            return of(routerPromise.then());
        }
        return of(true);
    }

    public static getUserId(): number {
        let user = Helpers.getCurrentUserInSessionStorage();
        if (user !== null) {
            return user.id;
        } else {
            return 0;
        }
    }

    public static hasRoles(roles: string[]): boolean {
        for (const role of roles) {
            if (this.userRolesString().includes(role)) {
                return true;
            }
        }
        return false;
    }

    public static hasRole(role: string): boolean {
        const test = this.userRolesString().includes(role);

        return test;
    }

    public static userRolesString(): string[] {
        const roles$ = sessionStorage.getItem(this.userRolesKey);
        if (!roles$) {
            return [];
        }

        try {
            return JSON.parse(roles$);
        } catch (error) {
            console.error('Erreur lors du parsing des rôles : ', error);
            return [];
        }
    }

    public static whichPageToNavigate(): string {
        if (this.hasRole('ADMINISTRATEUR')) {
            return 'school-management/dashboard';
        }
        return "school-management/dashboard";
    }
}
