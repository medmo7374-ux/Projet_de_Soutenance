import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from 'environments/environment';
import {Statut, StatutPage} from "../../../app/main/models/statut.model";

@Injectable({
    providedIn: 'root'
})
export class StatutService {

    apiUrl = environment.apiUrl;
    options = {
        headers: new HttpHeaders().set("Authorization", "application/json")
    }
    private http = inject(HttpClient);

    getAllStatut(): Observable<Array<Statut>> {
        return this.http.get<Array<Statut>>(this.apiUrl + `statuts`, this.options);
    }

    create(spec: Statut): Observable<any> {
        return this.http.post(this.apiUrl + `statuts`, spec);
    }

    public getAllPage(page: number, size: number, name: string): Observable<StatutPage> {
        let params = new HttpParams().set('page', page).set('size', size).set('name', name);
        return this.http.get<StatutPage>(this.apiUrl + `statuts/by-name`, {params});
    }

    public getPage(page: number, size: number): Observable<StatutPage> {
        let params = new HttpParams().set('page', page).set('size', size);
        return this.http.get<StatutPage>(this.apiUrl + `statuts/page`, {params});
    }

    public update(id: number, spec: Statut): Observable<Statut> {
        return this.http.put<Statut>(this.apiUrl + `statuts/${id}`, spec);
    }

    public delete(id: number) {
        return this.http.delete(this.apiUrl + `statuts/${id}`);
    }
}
