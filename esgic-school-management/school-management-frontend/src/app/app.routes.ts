import {Route} from '@angular/router';
import {initialDataResolver} from 'app/app.resolvers';
import {NoAuthGuard} from 'app/core/auth/guards/noAuth.guard';
import {LayoutComponent} from 'app/layout/layout.component';
import {Helpers} from "./main/helpers/Helpers";
import {authenticationGuard} from "../@externals/authentication/guards/authentication.guard";
import {roleChildGuard} from "../@externals/authentication/guards/role-child.guard";
import { SignalementComponent } from './modules/admin/apps/signalement/signalement-form/signalement-form.component';
import {signalementResolver} from "./modules/admin/apps/signalement/signalement-resolver";
import {inscriptionResolver} from "./modules/admin/apps/etudiant/inscription-etudiant/inscription-etudiant.resolver";

export const appRoutes: Route[] = [

    // Redirect empty path to '/school-management/dashboard'
    {path: '', pathMatch: 'full', redirectTo: Helpers.whichPageToNavigate()},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },

        children: [
            {path: 'sign-in', loadChildren: () => import('app/login/login/login.routes')},
        ]
    },

    {
        path: '',

        component: LayoutComponent,
        data: {
            layout: 'empty'
        },

        children: [

            {
                path: "inscription",
                loadChildren: () => import("app/modules/admin/apps/etudiant/inscription-etudiant/inscription-etudiant.routes"),
                resolve: {data: inscriptionResolver}
            },
            //Public routes
            {
                path: 'public',
                children: [
                    {
                        path: 'signaler',
                        component: SignalementComponent,
                        resolve: {
                            data: signalementResolver
                        }
                    },
                    //{path: 'signalements', loadChildren: () => import('app/modules/admin/apps/signalement/signalement.routes')}
                ]
            },
        ]
    },

    // {
    //     path: 'public-payment',
    //     children: [
    //         {path: '', loadChildren: () => import("../@loga/components/payment/payment.routes")}
    //     ]
    // },


    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [authenticationGuard],
        canActivateChild: [authenticationGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes')
            }
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [authenticationGuard],
        canActivateChild: [authenticationGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [

            // Dashboards
            {
                path: 'school-management',
                canActivateChild: [roleChildGuard],
                data: {
                    roles: ['ADMINISTRATEUR']
                },
                children: [
                    {
                        path: 'dashboard',
                        loadChildren: () => import('app/modules/admin/dashboards/dashboard-amasem/dashboard-amasem.routes'),
                        data: {
                            roles: ['ADMINISTRATEUR']
                        },
                    },
                ]
            },

            {
                path: 'apps',
                children: [

                    {
                        path: 'users',
                        loadChildren: () => import('app/modules/admin/apps/administration/gestion-utilisateurs/gestion-users.routes'),
                        canActivateChild: [roleChildGuard],
                        data: {
                            roles: ['ADMINISTRATEUR', 'USER']
                        }
                    },
                    {
                        path: 'etudiants',
                        loadChildren: () => import('app/modules/admin/apps/etudiant/etudiant.routes'),
                        canActivateChild: [roleChildGuard],
                        data: {
                            roles: ['ADMINISTRATEUR', 'USER']
                        }
                    },
                    {
                        path: 'inscriptions',
                        loadChildren: () => import('app/modules/admin/apps/etudiant/inscription.routes'),
                        canActivateChild: [roleChildGuard],
                        data: {
                            roles: ['ADMINISTRATEUR', 'USER']
                        }
                    },

                    {
                        path: 'niveaux',
                        loadChildren: () => import('app/modules/admin/apps/administration/list-gravite/gravites.routes'),
                        canActivateChild: [roleChildGuard],
                        data: {
                            roles: ['ADMINISTRATEUR', 'USER']
                        }
                    },
                    {
                        path: 'filieres',
                        loadChildren: () => import('app/modules/admin/apps/configuration/list-communes/commune.routes'),
                        canActivateChild: [roleChildGuard],
                        data: {
                            roles: ['ADMINISTRATEUR', 'USER']
                        }
                    },


                ]
            },
            // Pages
            {
                path: 'pages',

                children: [

                    // Error
                    {
                        path: 'error', children: [
                            {
                                path: '404',
                                loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.routes')
                            },
                        ]
                    },
]
            },


            // 404 & Catch all
            {
                path: '404-not-found',
                pathMatch: 'full',
                loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.routes')
            },
            {path: '**', redirectTo: '404-not-found'}
        ]
    }
];
