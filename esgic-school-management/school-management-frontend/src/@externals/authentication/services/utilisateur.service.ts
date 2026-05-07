import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {UtilisateurEntity, UtilisateurPage} from "../../../app/main/Utils/utilisateur.page";
import {ProfileEntity} from "../../../app/main/Utils/profile.page";

@Injectable({
    providedIn: 'root'
})
export class UtilisateurService {
    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    public getAllUsers(page: number, size: number): Observable<UtilisateurPage> {
        let params = new HttpParams();
            params = params.set('page', page).set('size', size);
        return this.http.get<UtilisateurPage>(this.apiUrl + `users/page`, {params})
    }
    public getAllUsersByCriteria(page: number, size: number, criteria: any): Observable<UtilisateurPage> {
        let params = new HttpParams();

        if (page === null && size === null) {
            params = params.set('criteria', criteria);
        } else {
            params = params.set('page', page).set('size', size).set('criteria', criteria)
        }
        return this.http.get<UtilisateurPage>(this.apiUrl + `users/search/page`, {params})
    }

    public deleteUser(id: number) {
        return this.http.delete(this.apiUrl + `users/${id}`);
    }

    public getUserById(id: number): Observable<any> {
        return this.http.get(this.apiUrl + `users/${id}`);
    }

    public updateUser(id: number, updateUser: UpdateUser): Observable<any> {
        return this.http.put(this.apiUrl + `users/${id}`, updateUser);
    }

    public resetUserPasswordFromBO(id: number, dto: ResetUserPwdFromBO): Observable<any> {
        return this.http.patch(this.apiUrl + `users/${id}/reset-pwd-bo`, dto);
    }

    public changeUserOwnPwd(pwd: ChangeOwnPwd) {
        return this.http.patch(this.apiUrl + `auth/change-my-pwd`, pwd)
    }

    public saveUser(user: UtilisateurEntity): Observable<any> {
        return this.http.post(this.apiUrl + `users`, user);
    }

    public getAllUsersList() {
        return this.http.get<Array<UtilisateurEntity>>(this.apiUrl + `users/list`)
    }
}

export interface UpdateUser {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    profile: ProfileEntity
}

export interface ResetUserPwdFromBO {
    password: string;
    confirmPassword: string;
}

export interface ChangeOwnPwd {
    username: string,
    oldPwd: string,
    newPwd: string
}
