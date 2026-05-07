import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {AppConfig} from "../models/app-config.model";

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {

    private apiUrl = environment.apiUrl

    constructor(private http: HttpClient) {
    }

    public getAppConfig(): Observable<any> {
        return this.http.get<AppConfig>(this.apiUrl + `configs`);
    }

    public updateAppConfig(id: number, appConfig: AppConfig): Observable<AppConfig> {
        return this.http.patch<AppConfig>(this.apiUrl + `configs/${id}`, appConfig)
    }
}
