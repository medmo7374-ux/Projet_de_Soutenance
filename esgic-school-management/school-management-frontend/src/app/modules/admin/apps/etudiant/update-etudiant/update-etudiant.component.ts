import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {Etudiant} from "../../../../../main/models/etudiant.model";
import {FuseAlertComponent, FuseAlertType} from "../../../../../../@fuse/components/alert";
import {EtudiantService} from "../../../../../../@externals/authentication/services/etudiant.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FuseLoadingBarComponent} from "../../../../../../@fuse/components/loading-bar";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'app-update-etudiant',
    standalone: true,
    imports: [CommonModule, FuseLoadingBarComponent, FuseAlertComponent, MatIconModule],
    templateUrl: './update-etudiant.component.html',
    styleUrl: './update-etudiant.component.scss',
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class UpdateEtudiantComponent implements OnInit {

    etudiant: Etudiant | null = null;
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    showAlert: boolean = false;
    showLoading: boolean = true;

    constructor(
        private etudiantService: EtudiantService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        const id = this.route.snapshot.params['id']
        this.etudiantService.getById(id).subscribe({
            next: (data: Etudiant) => {
                this.etudiant = data;
                this.showLoading = false;
            },
            error: (err) => {
                this.showLoading = false;
                this.alert.message = err.error || 'Erreur lors du chargement des données!';
                this.alert.type = 'error';
                this.showAlert = true;
            }
        });
    }
}
