import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignalementService} from "../../../../../../@externals/authentication/services/signalement.service";
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {FuseAlertComponent, FuseAlertType} from "../../../../../../@fuse/components/alert";
import {SelectStatutComponent} from "../../../../../../@externals/components/select-statut/select-statut.component";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SelectGraviteComponent} from "../../../../../../@externals/components/select-gravite/select-gravite.component";
import {
    SelectQuartierComponent
} from "../../../../../../@externals/components/select-quartier/select-quartier.component";
import {SelectCommuneComponent} from "../../../../../../@externals/components/select-commune/select-commune.component";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {Signalement} from "../../../../../main/models/signalement.model";
import {Commune} from "../../../../../main/models/commune.model";
import {Quartier} from "../../../../../main/models/quartier.model";
import {Gravite} from "../../../../../main/models/gravite.model";
import {Statut} from "../../../../../main/models/statut.model";

@Component({
    selector: 'app-signalement-update',
    standalone: true,
    imports: [CommonModule, SelectStatutComponent, ReactiveFormsModule, MatButtonModule, MatProgressSpinnerModule, SelectGraviteComponent, SelectQuartierComponent, SelectCommuneComponent, MatInputModule, MatDatepickerModule, FuseAlertComponent],
    templateUrl: './signalement-update.component.html',
    styleUrl: './signalement-update.component.scss',
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class SignalementUpdateComponent implements OnInit {

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signalementForm: UntypedFormGroup;
    showAlert: boolean = false;
    showLoading: boolean = false;
    signalement: Signalement;
    communes: Commune[] = [];
    quartiers: Quartier[] = [];
    gravites: Gravite[] = [];
    statuts: Statut[] = [];

    constructor(
        private _signalementService: SignalementService,
        private _formBuilder: UntypedFormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(data => {
            if (data && data.data) {
                this.signalement = data.data[0];
                this.communes = data.data[1];
                this.quartiers = data.data[2];
                this.gravites = data.data[3];
                this.statuts = data.data[4];

                this.signalementForm = this._formBuilder.group({
                    nom: [this.signalement?.nom || '', Validators.required],
                    prenom: [this.signalement?.prenom || '', Validators.required],
                    adresse: [this.signalement?.adresse || '', Validators.required],
                    telephone: [this.signalement?.telephone || '', [Validators.required, Validators.pattern('^[0-9]{8,}$')]],
                    description: [this.signalement?.description || '', Validators.required],
                    date: [this.signalement?.date ? new Date(this.signalement.date) : '', Validators.required],
                    commune: [this.signalement?.commune || null, Validators.required],
                    quartier: [this.signalement?.quartier || null, Validators.required],
                    gravite: [this.signalement?.gravite || null, Validators.required],
                    statut: [this.signalement?.statut || null, Validators.required]
                });
            } else {
                this.showAlert = true;
                this.alert.type = 'error';
                this.alert.message = 'Erreur lors du chargement du signalement.';
            }
        });
    }

    updateSignalement(signalementData: Signalement) {
        this.showLoading = true;
        this.signalementForm.disable();

        if (this.signalementForm.invalid) {
            this.signalementForm.enable();
            this.showLoading = false;
            return;
        }

        const updatedSignalement: Signalement = {
            ...this.signalement,
            nom: this.signalementForm.value.nom,
            prenom: this.signalementForm.value.prenom,
            adresse: this.signalementForm.value.adresse,
            telephone: this.signalementForm.value.telephone,
            description: this.signalementForm.value.description,
            date: this.signalementForm.value.date.toISOString(),
            commune: this.signalementForm.value.commune,
            quartier: this.signalementForm.value.quartier,
            gravite: this.signalementForm.value.gravite,
            statut: this.signalementForm.value.statut
        };

        this._signalementService.update(this.signalement.id, updatedSignalement).subscribe({
            next: (response) => {
                this.showAlert = false;
                this.router.navigateByUrl(`/apps/signalements/${this.signalement.id}/display`);
                this.signalementForm.reset();
                this.showLoading = false;
            },
            error: (err) => {
                this.signalementForm.enable();
                this.showLoading = false;
                this.alert.message = err.error?.message || "Erreur lors de la mise à jour du signalement !";
                this.alert.type = 'error';
                this.showAlert = true;
            }
        });
    }

    goBack() {
        this.router.navigateByUrl(`/apps/signalements/${this.signalement.id}/display`);
    }
}
