import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from 'environments/environment';
import {Commune, CommunePage} from "../../../app/main/models/commune.model";

@Injectable({
    providedIn: 'root'
})
export class CommuneService {

    private http = inject(HttpClient);
    apiUrl = environment.apiUrl;

    options = {
        headers: new HttpHeaders().set("Authorization", "application/json")
    }

    getAllCommune(): Observable<Array<Commune>> {
        return this.http.get<Array<Commune>>(this.apiUrl + `filieres`, this.options);
    }

    create(spec: Commune): Observable<any> {
        return this.http.post(this.apiUrl + `filieres`, spec);
    }

    public getAllPage(page: number, size: number, name: string): Observable<CommunePage> {
        let params = new HttpParams().set('page', page).set('size', size).set('name', name);
        return this.http.get<CommunePage>(this.apiUrl + `filieres/by-name`, {params});
    }
    public getPage(page: number, size: number): Observable<CommunePage> {
        let params = new HttpParams().set('page', page).set('size', size);
        return this.http.get<CommunePage>(this.apiUrl + `filieres/page`, {params});
    }

    public update(id: number, spec: Commune): Observable<Commune> {
        return this.http.put<Commune>(this.apiUrl + `filieres/${id}`, spec);
    }

    public delete(id: number) {
        return this.http.delete(this.apiUrl + `filieres/${id}`);
    }
}
