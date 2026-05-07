import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Quartier, QuartierPage} from "../../../app/main/models/quartier.model";

@Injectable({
    providedIn: 'root'
})
export class QuartierService {

    private http = inject(HttpClient);
    apiUrl = environment.apiUrl;

    options = {
        headers: new HttpHeaders().set("Authorization", "application/json")
    }

    getAllQuartier(): Observable<Array<Quartier>> {
        return this.http.get<Array<Quartier>>(this.apiUrl + `quartiers`, this.options);
    }

    create(spec: Quartier): Observable<any> {
        return this.http.post(this.apiUrl + `quartiers`, spec);
    }

    public getAllPage(page: number, size: number, name: string): Observable<QuartierPage> {
        let params = new HttpParams().set('page', page).set('size', size).set('name', name);
        return this.http.get<QuartierPage>(this.apiUrl + `quartiers/by-name`, {params});
    }
    public getPage(page: number, size: number): Observable<QuartierPage> {
        let params = new HttpParams().set('page', page).set('size', size);
        return this.http.get<QuartierPage>(this.apiUrl + `quartiers/page`, {params});
    }

    public update(id: number, spec: Quartier): Observable<Quartier> {
        return this.http.put<Quartier>(this.apiUrl + `quartiers/${id}`, spec);
    }

    public delete(id: number) {
        return this.http.delete(this.apiUrl + `quartiers/${id}`);
    }
}
