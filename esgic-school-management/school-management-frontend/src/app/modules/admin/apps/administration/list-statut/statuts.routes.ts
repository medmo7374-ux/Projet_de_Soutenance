import {Routes} from "@angular/router";
import {roleChildGuard} from "../../../../../../@externals/authentication/guards/role-child.guard";
import {ListStatutComponent} from "./list-statut.component";
import {statutResolver} from "../../configuration/statut-resolver.resolver";

export default [
    {
        path: '',
        component: ListStatutComponent,
        resolve: {
            data: statutResolver
        },
        canActivateChild: [roleChildGuard],
        data: {
            roles: ['ADMINISTRATEUR', 'USER']
        }
    },

] as Routes;
