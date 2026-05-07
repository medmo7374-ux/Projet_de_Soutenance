import {Routes} from "@angular/router";
import {roleChildGuard} from "../../../../../../@externals/authentication/guards/role-child.guard";
import {quartierResolver} from "../quartier-resolver.resolver";
import {ListQuartierComponent} from "./list-quartier.component";

export default [
    {
        path: '',
        component: ListQuartierComponent,
        resolve: {
            data: quartierResolver
        },
        canActivateChild: [roleChildGuard],
        data: {
            roles: ['ADMINISTRATEUR', 'USER']
        }
    },

] as Routes;
