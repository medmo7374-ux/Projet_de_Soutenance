import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Inscription, InscriptionPage} from 'app/main/models/inscription.model';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {


    private http = inject(HttpClient);
    apiUrl = environment.apiUrl;

    options = {
        headers: new HttpHeaders().set("Authorization", "application/json")
    }

    getAllInscription(): Observable<Array<Inscription>> {
        return this.http.get<Array<Inscription>>(this.apiUrl + `inscriptions`, this.options);
    }

    getById(id: number): Observable<Inscription> {
        return this.http.get<Inscription>(this.apiUrl + `inscriptions/${id}`, this.options);
    }
    create(spec: Inscription): Observable<any> {
        return this.http.post(this.apiUrl + `inscriptions`, spec);
    }

    public search(page: number, size: number, name: string): Observable<InscriptionPage> {
        let params = new HttpParams().set('page', page).set('size', size).set('criteria', name);
        return this.http.get<InscriptionPage>(this.apiUrl + `inscriptions/search`, {params});
    }
    public getPage(page: number, size: number): Observable<InscriptionPage> {
        let params = new HttpParams().set('page', page).set('size', size);
        return this.http.get<InscriptionPage>(this.apiUrl + `inscriptions/page`, {params});
    }

    public update(id: number, spec: Inscription): Observable<Inscription> {
        return this.http.put<Inscription>(this.apiUrl + `inscriptions/${id}`, spec);
    }

    public delete(id: number) {
        return this.http.delete(this.apiUrl + `inscriptions/${id}`);
    }

    public approve(id: number) : Observable<Inscription> {
        return this.http.put<Inscription>(this.apiUrl + `inscriptions/${id}/accepter`, {})
    }

    public cancel(id: number) : Observable<Inscription> {
        return this.http.put<Inscription>(this.apiUrl + `inscriptions/${id}/annuler`, {})
    }
}
