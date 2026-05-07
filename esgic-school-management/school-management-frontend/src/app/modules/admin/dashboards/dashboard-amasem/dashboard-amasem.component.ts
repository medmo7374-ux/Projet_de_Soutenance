import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatRippleModule} from "@angular/material/core";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {ApexOptions, NgApexchartsModule} from "ng-apexcharts";
import {Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilisateurEntity} from "../../../../main/Utils/utilisateur.page";
import {FuseAlertComponent, FuseAlertType} from "../../../../../@fuse/components/alert";
import {FuseLoadingBarComponent} from "../../../../../@fuse/components/loading-bar";
import {fuseAnimations} from "../../../../../@fuse/animations";
import {DashboardAmasemService} from "./dashboard-amasem.service";


export interface DashboardData {
    nombreEtudiant: number;
    nombreInscription: number;
    nombreFiliere: number;
    nombreNiveau: number;
    nombreInscriptionAccepter: number;
    nombreInscriptionRejeter: number;
    nombreInscriptionAttente: number;
    niveaux: string[];
}

@Component({
    selector: 'dashboard-school-management',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatButtonToggleModule, MatIconModule, MatMenuModule, MatRippleModule, MatTableModule, MatTabsModule, NgApexchartsModule, FuseAlertComponent, FuseLoadingBarComponent],
    templateUrl: './dashboard-amasem.component.html',
    styleUrl: './dashboard-amasem.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})
export class DashboardAmasemComponent implements OnInit {
    dashboardData: DashboardData;
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    showAlert: boolean = false;
    showLoading: boolean = false;

    constructor(private route: ActivatedRoute,
                private dashboardService: DashboardAmasemService,
                private changeDetection: ChangeDetectorRef) {}

    ngOnInit() {
        this.dashboardService.getData().subscribe({
            next: (data) => {
                console.log(JSON.stringify(data))

                    this.dashboardData = data;
                    this.showLoading = false;
                    this.changeDetection.detectChanges();
            },
            error: (err) => {
                this.showLoading = false;
                this.alert.message = err.error || 'Erreur lors du chargement des données!';
                this.alert.type = 'error';
                this.showAlert = true;
            }
        });

        // this.dashboardData = {
        //     "nombreEtudiant": 120,
        //     "nombreInscription": 150,
        //     "nombreFiliere": 10,
        //     "nombreNiveau": 5,
        //     "nombreInscriptionAccepter": 100,
        //     "nombreInscriptionRejeter": 20,
        //     "nombreInscriptionAttente": 0,
        //     "niveaux": ["Licence 1", "Licence 2", "Licence 3", "Master 1", "Master 2"]
        // }
    }
}
