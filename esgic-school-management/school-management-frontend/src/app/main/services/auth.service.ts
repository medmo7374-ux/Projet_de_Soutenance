import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserLogin} from "../models/login.model";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    get accessToken(): string {
        return sessionStorage.getItem('access-token') ?? '';
    }

    login(userLogin: UserLogin): Observable<any> {
        return this._http.post(this.apiUrl + `auth/login`, userLogin, {observe: 'response'})
    }
}

export interface ResetPassword {
    otpUsage: VerifyOtp
    password: string,
    confirmPassword: string
}

export interface VerifyOtp {
    otp: string;
    email: string;
}
