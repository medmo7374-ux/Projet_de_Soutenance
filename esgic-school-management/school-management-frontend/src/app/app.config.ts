import {HTTP_INTERCEPTORS, HttpClientModule, HttpHeaders, provideHttpClient} from '@angular/common/http';
import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom, inject} from '@angular/core';
import {LuxonDateAdapter, MAT_LUXON_DATE_ADAPTER_OPTIONS} from '@angular/material-luxon-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {provideAnimations} from '@angular/platform-browser/animations';
import {
    PreloadAllModules,
    provideRouter,
    withInMemoryScrolling,
    withPreloading,
    withViewTransitions
} from '@angular/router';
import {provideFuse} from '@fuse';
import {provideTransloco, TranslocoService} from '@ngneat/transloco';
import {firstValueFrom} from 'rxjs';
import {appRoutes} from 'app/app.routes';
import {provideAuth} from 'app/core/auth/auth.provider';
import {provideIcons} from 'app/core/icons/icons.provider';
import {mockApiServices} from 'app/mock-api';
import {TranslocoHttpLoader} from './core/transloco/transloco.http-loader';
import {authInterceptor} from "../@externals/authentication/interceptors/auth.interceptor";
import {MatSelectCountryModule} from "@angular-material-extensions/select-country";

export const MY_DATE_FORMATS = {
    parse: {
        dateInput: 'dd/MM/yyyy, HH:mm', // Le format de date et d'heure pour l'analyse
    },
    display: {
        dateInput: 'dd/MM/yyyy, HH:mm', // Le format de date et d'heure à afficher
        monthYearLabel: 'MMM yyyy', // Format pour l'affichage du mois et de l'année
        dateA11yLabel: 'dd/MM/yyyy', // Format pour l'accessibilité de la date
        monthYearA11yLabel: 'MMMM yyyy', // Format pour l'accessibilité du mois et de l'année
    },
};
export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideHttpClient(),
        importProvidersFrom(MatSelectCountryModule.forRoot('fr')),
        provideRouter(appRoutes,
            withPreloading(PreloadAllModules),
            withInMemoryScrolling({scrollPositionRestoration: 'enabled'}),
            withViewTransitions()
        ),

        /*// Material Date Adapter
        {
            provide : DateAdapter,
            useClass: LuxonDateAdapter,
        },*/
        //Interceptors
        {
            provide: HTTP_INTERCEPTORS,
            useValue: authInterceptor,
            multi: true
        },
        //////////////////////////////// GRAPHQL CONFIGS START ///////////////////////////

        HttpClientModule,

        //////////////////////////////// GRAPHQL CONFIGS END ///////////////////////////
        /*{
            provide : MAT_DATE_FORMATS,
            useValue: {
                parse  : {
                    dateInput: 'D',
                },
                display: {
                    dateInput         : 'DDD',
                    monthYearLabel    : 'LLL yyyy',
                    dateA11yLabel     : 'DD',
                    monthYearA11yLabel: 'LLLL yyyy',
                },
            },
        },*/

        {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}, // Locale de date
        {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}, // Formats de date personnalisés
        {provide: DateAdapter, useClass: LuxonDateAdapter}, // Utilisation de LuxonDateAdapter
        {provide: MAT_LUXON_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}, // Options pour LuxonDateAdapter

        // Transloco Config
        provideTransloco({
            config: {
                availableLangs: [
                    {
                        id: 'en',
                        label: 'English',
                    },
                    {
                        id: 'tr',
                        label: 'Turkish',
                    },
                ],
                defaultLang: 'en',
                fallbackLang: 'en',
                reRenderOnLangChange: true,
                prodMode: true,
            },
            loader: TranslocoHttpLoader,
        }),
        {
            // Preload the default language before the app starts to prevent empty/jumping content
            provide: APP_INITIALIZER,
            useFactory: () => {
                const translocoService = inject(TranslocoService);
                const defaultLang = translocoService.getDefaultLang();
                translocoService.setActiveLang(defaultLang);

                return () => firstValueFrom(translocoService.load(defaultLang));
            },
            multi: true,
        },

        // Fuse
        provideAuth(),
        provideIcons(),
        provideFuse({
            mockApi: {
                delay: 0,
                services: mockApiServices,
            },
            fuse: {
                layout: 'classy',
                scheme: 'light',
                screens: {
                    sm: '600px',
                    md: '960px',
                    lg: '1280px',
                    xl: '1440px',
                },
                theme: 'theme-default',
                themes: [
                    {
                        id: 'theme-default',
                        name: 'Default',
                    },
                    {
                        id: 'theme-brand',
                        name: 'Brand',
                    },
                    {
                        id: 'theme-teal',
                        name: 'Teal',
                    },
                    {
                        id: 'theme-rose',
                        name: 'Rose',
                    },
                    {
                        id: 'theme-purple',
                        name: 'Purple',
                    },
                    {
                        id: 'theme-amber',
                        name: 'Amber',
                    },
                ],
            },
        }),
    ],


};
