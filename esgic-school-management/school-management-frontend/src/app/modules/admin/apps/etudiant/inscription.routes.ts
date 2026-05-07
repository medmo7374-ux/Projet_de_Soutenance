import {Routes} from "@angular/router";
import { roleChildGuard } from "@externals/authentication/guards/role-child.guard";
import {ListInscriptionComponent} from "./list-inscription/list-inscription.component";
import {inscriptionListResolver} from "./inscription-list.resolver";
import {DisplayEtudiantComponent} from "./display-etudiant/display-etudiant.component";

export default [
    {
        path: '',
        component: ListInscriptionComponent,
        resolve: {
            data: inscriptionListResolver
        },
        canActivateChild: [roleChildGuard],
        data: {
            roles: ['ADMINISTRATEUR', 'USER']
        }
    },

    {
        path: ':id/display',
        component: DisplayEtudiantComponent,
        canActivateChild: [roleChildGuard],
        data: {
            roles: ['ADMINISTRATEUR', 'USER']
        }
    },
] as Routes;
