import {Routes} from "@angular/router";
import {roleChildGuard} from "../../../../../../@externals/authentication/guards/role-child.guard";
import {quartierResolver} from "../../configuration/quartier-resolver.resolver";
import {ListGraviteComponent} from "./list-gravite.component";
import {graviteResolver} from "../../configuration/gravite-resolver.resolver";

export default [
    {
        path: '',
        component: ListGraviteComponent,
        resolve: {
            data: graviteResolver
        },
        canActivateChild: [roleChildGuard],
        data: {
            roles: ['ADMINISTRATEUR', 'USER']
        }
    },

] as Routes;
