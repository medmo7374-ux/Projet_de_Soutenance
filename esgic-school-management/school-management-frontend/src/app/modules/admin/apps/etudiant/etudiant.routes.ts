import {Routes} from "@angular/router";
import {InscriptionEtudiantComponent} from "./inscription-etudiant/inscription-etudiant.component";
import {inscriptionResolver} from "./inscription-etudiant/inscription-etudiant.resolver";
import {ListEtudiantComponent} from "./list-etudiant/list-etudiant.component";
import {etudiantListResolver} from "./etudiant-list.resolver";
import { roleChildGuard } from "@externals/authentication/guards/role-child.guard";
import {UpdateEtudiantComponent} from "./update-etudiant/update-etudiant.component";

export default [
    {
        path: '',
        component: ListEtudiantComponent,
        resolve: {
            data: etudiantListResolver
        },
        canActivateChild: [roleChildGuard],
        data: {
            roles: ['ADMINISTRATEUR', 'USER']
        }
    },

    {
        path: ':id/display',
        component: UpdateEtudiantComponent,
        canActivateChild: [roleChildGuard],
        data: {
            roles: ['ADMINISTRATEUR', 'USER']
        }
    },
    {
        path: 'save',
        component: InscriptionEtudiantComponent,
        resolve: {
            data: inscriptionResolver
        },
        canActivateChild: [roleChildGuard],
        data: {
            roles: ['ADMINISTRATEUR', 'USER']
        }
    }
] as Routes;
