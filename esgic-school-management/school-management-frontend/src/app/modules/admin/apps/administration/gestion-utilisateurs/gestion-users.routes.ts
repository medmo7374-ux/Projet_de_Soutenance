import {Routes} from "@angular/router";
import {ListUtilisateurComponent} from "./list-utilisateur/list-utilisateur.component";
import {listUsersResolver} from "./list-users.resolver";
import {UpdateUtilisateurComponent} from "./update-utilisateur/update-utilisateur.component";
import {updateUserResolver} from "./update-user.resolver";
import {SaveUtilisateurComponent} from "./save-utilisateur/save-utilisateur.component";
import {roleChildGuard} from "../../../../../../@externals/authentication/guards/role-child.guard";

export default [
    {
        path: '',
        component: ListUtilisateurComponent,
        resolve: {
            data: listUsersResolver
        },
        canActivateChild: [roleChildGuard],
        data: {
            roles: ['ADMINISTRATEUR', 'USER']
        }
    },

    {
        path: ':id/update',
        component: UpdateUtilisateurComponent,
        resolve: {
            data: updateUserResolver
        },
        canActivateChild: [roleChildGuard],
        data: {
            roles: ['ADMINISTRATEUR', 'USER']
        }
    },
    {
        path: 'save',
        component: SaveUtilisateurComponent,
        resolve: {
            data: listUsersResolver
        },
        canActivateChild: [roleChildGuard],
        data: {
            roles: ['ADMINISTRATEUR', 'USER']
        }
    }
] as Routes;
