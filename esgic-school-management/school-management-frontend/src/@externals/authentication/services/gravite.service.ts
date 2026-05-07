import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Gravite, GravitePage} from "../../../app/main/models/gravite.model";

@Injectable({
    providedIn: 'root'
})
export class GraviteService {

    private http = inject(HttpClient);
    apiUrl = environment.apiUrl;

    options = {
        headers: new HttpHeaders().set("Authorization", "application/json")
    }

    getAllGravite(): Observable<Array<Gravite>> {
        return this.http.get<Array<Gravite>>(this.apiUrl + `niveaux`, this.options);
    }

    create(spec: Gravite): Observable<any> {
        return this.http.post(this.apiUrl + `niveaux`, spec);
    }

    public getAllPage(page: number, size: number, name: string): Observable<GravitePage> {
        let params = new HttpParams().set('page', page).set('size', size).set('name', name);
        return this.http.get<GravitePage>(this.apiUrl + `niveaux/by-name`, {params});
    }
    public getPage(page: number, size: number): Observable<GravitePage> {
        let params = new HttpParams().set('page', page).set('size', size);
        return this.http.get<GravitePage>(this.apiUrl + `niveaux/page`, {params});
    }

    public update(id: number, spec: Gravite): Observable<Gravite> {
        return this.http.put<Gravite>(this.apiUrl + `niveaux/${id}`, spec);
    }

    public delete(id: number) {
        return this.http.delete(this.apiUrl + `niveaux/${id}`);
    }
}
