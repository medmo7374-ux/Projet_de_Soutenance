import {Routes} from "@angular/router";
import {roleChildGuard} from "../../../../../../@externals/authentication/guards/role-child.guard";
import { ListCommuneComponent } from "./list-commune.component";
import {communeResolver} from "../commune-resolver.resolver";

export default [
    {
        path: '',
        component: ListCommuneComponent,
        resolve: {
            data: communeResolver
        },
        canActivateChild: [roleChildGuard],
        data: {
            roles: ['ADMINISTRATEUR', 'USER']
        }
    },

] as Routes;
