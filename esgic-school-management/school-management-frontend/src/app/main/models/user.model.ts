export interface User {
    status: string;
    email: string;
    id: number;
    prenom: string;
    nom: string;
    username: string;
    password: string;
    createdAt: Date;
    active: boolean;
    roles: string[];
    avatar: string;
}
