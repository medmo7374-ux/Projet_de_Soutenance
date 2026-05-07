import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {DashboardData} from "./dashboard-amasem.component";

@Injectable({providedIn: 'root'})
export class DashboardAmasemService {
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);

    private apiUrl = environment.apiUrl;
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for data
     */
    get data$(): Observable<any> {
        return this._data.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get data
     */
    getData(): Observable<DashboardData> {
        return this._httpClient.get<DashboardData>(this.apiUrl + 'dashboard/stats');
    }
}
