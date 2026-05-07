import { Routes } from "@angular/router";
import { SignalementComponent } from "./signalement-form/signalement-form.component";
import {signalementResolver} from "./signalement-resolver";
import {SignalementListComponent} from "./signalement-list/signalement-list.component";
import {signalementListResolver} from "./signalement-list.resolver";
import {SignalementUpdateComponent} from "./signalement-update/signalement-update.component";
import {signalementDetailResolver} from "./signalement-display.resolver";
import {SignalementDetailComponent} from "./signalement-detail/signalement-detail.component";

export default [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '',
    },
    {
        path: '',
        component: SignalementListComponent,
        resolve: {
            data: signalementListResolver
        }
    },
    {
        path: ':id/display',
        component: SignalementDetailComponent,
        resolve: {
            data: signalementDetailResolver
        }
    },
    {
        path: 'update-signalement/:id',
        component: SignalementUpdateComponent,
        resolve: {
            data: signalementDetailResolver
        }
    }
] as Routes;
