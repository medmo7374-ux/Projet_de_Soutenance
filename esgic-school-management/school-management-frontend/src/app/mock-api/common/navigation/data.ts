/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';
import { Helpers } from 'app/main/helpers/Helpers';


export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'school-management',
        title: 'SCHOOL MANAGEMENT',
        type: 'group',
        icon: 'mat_solid:school', // Icon for education/school management
        children: [
            {
                id: 'school-management.dashboard',
                title: 'Tableau de Bord',
                type: 'basic',
                icon: 'mat_solid:dashboard',
                link: '/school-management/dashboard',
                hidden: () => !Helpers.hasRole('ADMINISTRATEUR'),
            },
            {
                id: 'school-management.students',
                title: 'Gestion des étudiants',
                type: 'collapsable',
                icon: 'mat_solid:people_alt', // Icon for student management
                hidden: () => !Helpers.hasRoles(['ADMINISTRATEUR', 'USER']),
                children: [
                    {
                        id: 'school-management.students.list',
                        title: 'Liste des étudiants',
                        type: 'basic',
                        link: '/apps/etudiants',
                        icon: 'mat_solid:list_alt', // Icon for a list of students
                    },
                    {
                        id: 'school-management.students.levels',
                        title: 'Niveaux d\'études',
                        type: 'basic',
                        link: '/apps/niveaux',
                        icon: 'mat_solid:stairs', // Icon for academic levels
                    },
                ],
            },
            {
                id: 'school-management.inscriptions',
                title: 'Gestion des inscriptions',
                type: 'collapsable',
                icon: 'mat_solid:how_to_reg', // Icon for registrations/inscriptions
                hidden: () => !Helpers.hasRoles(['ADMINISTRATEUR', 'USER']),
                children: [
                    {
                        id: 'school-management.inscriptions.list',
                        title: 'Liste des inscriptions',
                        type: 'basic',
                        link: '/apps/inscriptions',
                        icon: 'mat_solid:assignment', // Icon for a list of inscriptions
                    },
                    {
                        id: 'school-management.inscriptions.filieres',
                        title: 'Filières',
                        type: 'basic',
                        link: '/apps/filieres',
                        icon: 'mat_solid:category', // Icon for academic programs/filieres
                    },
                ],
            },
            {
                id: 'school-management.administrations',
                title: 'Administration',
                type: 'collapsable',
                icon: 'mat_solid:admin_panel_settings', // Retained: perfect for administration
                hidden: () => !Helpers.hasRoles(['ADMINISTRATEUR', 'USER']),
                children: [
                    {
                        id: 'school-management.administration.users',
                        title: 'Utilisateurs',
                        type: 'basic',
                        link: '/apps/users',
                        icon: 'mat_solid:people', // Retained: ideal for users
                        hidden: () => !Helpers.hasRoles(['ADMINISTRATEUR', 'USER']),
                    },
                ],
            },
        ]
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'aquasentry',
        title: 'AQUA SENTRY',
        type: 'group',
        icon: 'mat_solid:water_drop',
        children: [
            {
                id: 'aquasentry.dashboard',
                title: 'Tableau de Bord',
                type: 'basic',
                icon: 'mat_solid:dashboard',
                link: '/school-management/dashboard',
                hidden: () => !Helpers.hasRole('ADMINISTRATEUR'),
            },
            {
                id: 'aquasentry.signalement',
                title: 'Gestion des Signalements',
                type: 'collapsable',
                icon: 'mat_solid:report_problem',
                hidden: () => !Helpers.hasRoles(['ADMINISTRATEUR', 'USER']),
                children: [
                    {
                        id: 'aquasentry.signalement.list',
                        title: 'Liste des fuites',
                        type: 'basic',
                        link: '/apps/signalements',
                        icon: 'mat_solid:leak_add',
                    },
                    {
                        id: 'aquasentry.configurations.gravites',
                        title: 'Gravités de fuite',
                        type: 'basic',
                        link: '/apps/gravites',
                        icon: 'mat_solid:warning',
                    },
                    {
                        id: 'aquasentry.configurations.statuts',
                        title: 'Statuts',
                        type: 'basic',
                        link: '/apps/statuts',
                        icon: 'mat_solid:assignment',
                    },
                ],
            },
            {
                id: 'aquasentry.administrations',
                title: 'Administration',
                type: 'collapsable',
                icon: 'mat_solid:admin_panel_settings',
                hidden: () => !Helpers.hasRoles(['ADMINISTRATEUR', 'USER']),
                children: [
                    {
                        id: 'aquasentry.administration.utilisateurs',
                        title: 'Utilisateurs',
                        type: 'basic',
                        link: '/apps/users',
                        icon: 'mat_solid:people',
                        hidden: () => !Helpers.hasRoles(['ADMINISTRATEUR', 'USER']),
                    },
                ],
            },
            {
                id: 'aquasentry.configurations',
                title: 'Configuration',
                type: 'collapsable',
                icon: 'mat_solid:settings',
                hidden: () => !Helpers.hasRoles(['ADMINISTRATEUR', 'USER']),
                children: [
                    {
                        id: 'aquasentry.configurations.communes',
                        title: 'Communes',
                        type: 'basic',
                        link: '/apps/communes',
                        icon: 'mat_solid:location_city',
                    },
                    {
                        id: 'aquasentry.configurations.quartiers',
                        title: 'Quartiers',
                        type: 'basic',
                        link: '/apps/quartiers',
                        icon: 'mat_solid:map',
                    },
                ],
            },
        ]
    }
];

export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'aquasentry',
        title: 'AQUA SENTRY',
        type: 'group',
        icon: 'mat_solid:water_drop',
        children: [
            {
                id: 'aquasentry.dashboard',
                title: 'Tableau de Bord',
                type: 'basic',
                icon: 'mat_solid:dashboard',
                link: '/school-management/dashboard',
                hidden: () => !Helpers.hasRole('ADMINISTRATEUR'),
            },
            {
                id: 'aquasentry.signalement',
                title: 'Gestion des Signalements',
                type: 'collapsable',
                icon: 'mat_solid:report_problem',
                hidden: () => !Helpers.hasRoles(['ADMINISTRATEUR', 'USER']),
                children: [
                    {
                        id: 'aquasentry.signalement.list',
                        title: 'Liste des fuites',
                        type: 'basic',
                        link: '/apps/signalements',
                        icon: 'mat_solid:leak_add',
                    },
                    {
                        id: 'aquasentry.configurations.gravites',
                        title: 'Gravités de fuite',
                        type: 'basic',
                        link: '/apps/gravites',
                        icon: 'mat_solid:warning',
                    },
                    {
                        id: 'aquasentry.configurations.statuts',
                        title: 'Statuts',
                        type: 'basic',
                        link: '/apps/statuts',
                        icon: 'mat_solid:assignment',
                    },
                ],
            },
            {
                id: 'aquasentry.administrations',
                title: 'Administration',
                type: 'collapsable',
                icon: 'mat_solid:admin_panel_settings',
                hidden: () => !Helpers.hasRoles(['ADMINISTRATEUR', 'USER']),
                children: [
                    {
                        id: 'aquasentry.administration.utilisateurs',
                        title: 'Utilisateurs',
                        type: 'basic',
                        link: '/apps/users',
                        icon: 'mat_solid:people',
                        hidden: () => !Helpers.hasRoles(['ADMINISTRATEUR', 'USER']),
                    },
                ],
            },
            {
                id: 'aquasentry.configurations',
                title: 'Configuration',
                type: 'collapsable',
                icon: 'mat_solid:settings',
                hidden: () => !Helpers.hasRoles(['ADMINISTRATEUR', 'USER']),
                children: [
                    {
                        id: 'aquasentry.configurations.communes',
                        title: 'Communes',
                        type: 'basic',
                        link: '/apps/communes',
                        icon: 'mat_solid:location_city',
                    },
                    {
                        id: 'aquasentry.configurations.quartiers',
                        title: 'Quartiers',
                        type: 'basic',
                        link: '/apps/quartiers',
                        icon: 'mat_solid:map',
                    },
                ],
            },
        ]
    }
];

export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'aquasentry',
        title: 'SCHOOL MANAGEMENT',
        type: 'group',
        icon: 'mat_solid:water_drop',
        children: [

            {
                id: 'aquasentry.signalement',
                title: 'Gestion des étudiants',
                type: 'collapsable',
                icon: 'mat_solid:report_problem',
                hidden: () => !Helpers.hasRoles(['ADMINISTRATEUR', 'USER']),
                children: [
                    {
                        id: 'aquasentry.signalement.list',
                        title: 'Liste des étudiants',
                        type: 'basic',
                        link: '/apps/etudiants',
                        icon: 'mat_solid:leak_add',
                    },
                    {
                        id: 'aquasentry.configurations.gravites',
                        title: "Niveaux d'études",
                        type: 'basic',
                        link: '/apps/niveaux',
                        icon: 'mat_solid:warning',
                    },
                ],
            },
            {
                id: 'aquasentry.administrations',
                title: 'Administration',
                type: 'collapsable',
                icon: 'mat_solid:admin_panel_settings',
                hidden: () => !Helpers.hasRoles(['ADMINISTRATEUR', 'USER']),
                children: [
                    {
                        id: 'aquasentry.administration.utilisateurs',
                        title: 'Utilisateurs',
                        type: 'basic',
                        link: '/apps/users',
                        icon: 'mat_solid:people',
                        hidden: () => !Helpers.hasRoles(['ADMINISTRATEUR', 'USER']),
                    },
                ],
            },
            {
                id: 'aquasentry.configurations',
                title: 'Gestion des inscriptions',
                type: 'collapsable',
                icon: 'mat_solid:settings',
                hidden: () => !Helpers.hasRoles(['ADMINISTRATEUR', 'USER']),
                children: [
                    {
                        id: 'aquasentry.configurations.communes',
                        title: 'Listes des inscriptions',
                        type: 'basic',
                        link: '/apps/inscriptions',
                        icon: 'mat_solid:location_city',
                    },
                    {
                        id: 'aquasentry.configurations.quartiers',
                        title: 'Filières',
                        type: 'basic',
                        link: '/apps/filieres',
                        icon: 'mat_solid:map',
                    },
                ],
            },
        ]
    }
];
