import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'environments/environment';
import {Signalement, SignalementDto, SignalementPage} from '../../../app/main/models/signalement.model';
import {Statut} from "../../../app/main/models/statut.model";

@Injectable({
    providedIn: 'root'
})
export class SignalementService {

    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl + 'signalements';

    private options = {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    getAll(): Observable<Signalement[]> {
        return this.http.get<Signalement[]>(this.apiUrl, this.options);
    }

    create(signalement: SignalementDto): Observable<Signalement> {
        return this.http.post<Signalement>(this.apiUrl, signalement, this.options);
    }

    getById(id: number): Observable<Signalement> {
        return this.http.get<Signalement>(`${this.apiUrl}/${id}`, this.options);
    }

    update(id: number, signalement: Signalement): Observable<Signalement> {
        return this.http.put<Signalement>(`${this.apiUrl}/${id}`, signalement, this.options);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`, this.options);
    }

    changeStatus(id: number, statut: Statut): Observable<Signalement> {
        return this.http.put<Signalement>(`${this.apiUrl}/${id}/status`, statut, this.options);
    }

    getPage(page: number, size: number): Observable<SignalementPage> {
        const params = new HttpParams()
            .set('page', page)
            .set('size', size);
        return this.http.get<SignalementPage>(`${this.apiUrl}/page`, {params});
    }

    searchByCriteria(criteria: string, page: number, size: number): Observable<SignalementPage> {
        const params = new HttpParams()
            .set('name', criteria)
            .set('page', page)
            .set('size', size);
        return this.http.get<SignalementPage>(`${this.apiUrl}/search`, {params});
    }
}
