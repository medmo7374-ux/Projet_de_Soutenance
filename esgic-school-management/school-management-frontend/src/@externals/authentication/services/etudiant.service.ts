import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import { Etudiant, EtudiantDto, EtudiantPage } from 'app/main/models/etudiant.model';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

    private http = inject(HttpClient);
    apiUrl = environment.apiUrl;

    options = {
        headers: new HttpHeaders().set("Authorization", "application/json")
    }

    getAllEtudiant(): Observable<Array<Etudiant>> {
        return this.http.get<Array<Etudiant>>(this.apiUrl + `etudiants`, this.options);
    }

    getById(id: number): Observable<Etudiant> {
        return this.http.get<Etudiant>(this.apiUrl + `etudiants/${id}`, this.options);
    }
    create(spec: Etudiant): Observable<any> {
        return this.http.post(this.apiUrl + `etudiants`, spec);
    }

    createEtudiantInscription(etd: EtudiantDto) : Observable<any> {
        return this.http.post(this.apiUrl + `etudiants/inscription`, etd);
    }

    public search(page: number, size: number, name: string): Observable<EtudiantPage> {
        let params = new HttpParams().set('page', page).set('size', size).set('criteria', name);
        return this.http.get<EtudiantPage>(this.apiUrl + `etudiants/search`, {params});
    }
    public getPage(page: number, size: number): Observable<EtudiantPage> {
        let params = new HttpParams().set('page', page).set('size', size);
        return this.http.get<EtudiantPage>(this.apiUrl + `etudiants/page`, {params});
    }

    public update(id: number, spec: Etudiant): Observable<Etudiant> {
        return this.http.put<Etudiant>(this.apiUrl + `etudiants/${id}`, spec);
    }

    public delete(id: number) {
        return this.http.delete(this.apiUrl + `etudiants/${id}`);
    }
}
