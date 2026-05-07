import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FuseAlertComponent, FuseAlertType} from "../../../../../../@fuse/components/alert";
import {FuseLoadingBarComponent} from "../../../../../../@fuse/components/loading-bar";
import {InscriptionService} from "../../../../../../@externals/authentication/services/inscription.service";
import {Inscription} from "../../../../../main/models/inscription.model";
import {fuseAnimations} from "../../../../../../@fuse/animations";

@Component({
  selector: 'app-display-etudiant',
  standalone: true,
    imports: [CommonModule, MatIconModule, RouterLink, FuseAlertComponent, FuseLoadingBarComponent],
  templateUrl: './display-etudiant.component.html',
  styleUrl: './display-etudiant.component.scss',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DisplayEtudiantComponent implements OnInit {
    inscription: Inscription | null = null;
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    showAlert: boolean = false;
    showLoading: boolean = true;

    constructor(
        private inscriptionService: InscriptionService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.inscriptionService.getById(+id).subscribe({
                next: (data: Inscription) => {
                    this.inscription = data;
                    this.showLoading = false;
                },
                error: (err) => {
                    this.showLoading = false;
                    this.alert.message = err.error?.message || 'Erreur lors du chargement des données!';
                    this.alert.type = 'error';
                    this.showAlert = true;
                }
            });
        } else {
            this.showLoading = false;
            this.alert.message = 'Aucune inscription sélectionnée.';
            this.alert.type = 'error';
            this.showAlert = true;
        }
    }
}
