import { CommonModule } from '@angular/common';
import {Commune} from "../../../../../main/models/commune.model";
import {Gravite} from "../../../../../main/models/gravite.model";
import {AfterContentChecked, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {
    NgForm,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators
} from "@angular/forms";

import {MatSelectCountryModule} from "@angular-material-extensions/select-country";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {SelectCommuneComponent} from "../../../../../../@externals/components/select-commune/select-commune.component";
import {SelectGraviteComponent} from "../../../../../../@externals/components/select-gravite/select-gravite.component";
import {MatButtonModule} from "@angular/material/button";
import {DialogService} from "../../../../../main/helpers/dialog/dialog.service";
import {EtudiantService} from "../../../../../../@externals/authentication/services/etudiant.service";
import {FuseLoadingBarComponent} from "../../../../../../@fuse/components/loading-bar";
import {FuseAlertComponent, FuseAlertType} from "../../../../../../@fuse/components/alert";
import {fuseAnimations} from "../../../../../../@fuse/animations";


interface Country {
    name: string;
    alpha2Code: string;
    alpha3Code: string;
    numericCode: string;
    callingCode: string;
}

@Component({
  selector: 'app-inscription-etudiant',
  standalone: true,
    imports: [CommonModule, FuseLoadingBarComponent, RouterLink, FuseAlertComponent, MatInputModule, ReactiveFormsModule, MatDatepickerModule, MatSelectCountryModule, MatOptionModule, MatSelectModule, SelectCommuneComponent, SelectGraviteComponent, MatButtonModule],
  templateUrl: './inscription-etudiant.component.html',
  styleUrl: './inscription-etudiant.component.scss',

    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class InscriptionEtudiantComponent implements OnInit, AfterContentChecked {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    filieres: Array<Commune>;
    niveaux: Array<Gravite>;
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;
    showLoading: boolean = true;
    country: Country = {
        name: 'Mali',
        alpha2Code: 'ML',
        alpha3Code: 'MLI',
        numericCode: '276',
        callingCode: '+223'
    };

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private changeDetector: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router,
        private dialogService: DialogService,
        private etudiantService: EtudiantService
    ) {
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            if (data.data) {
                this.filieres = data.data[0];
                this.niveaux = data.data[1];
            }
        });

        this.signUpForm = this._formBuilder.group({
            nom: ['', Validators.required],
            prenom: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            telephone: ['', [ Validators.required]],
            paysResidence: [this.country, Validators.required],
            typeInscription: ['', Validators.required],
            filiere: ['', Validators.required],
            niveau: ['', Validators.required],
            dateNaissance: ['', Validators.required],
            lieuNaissance: ['', Validators.required],
            adresse: ['', Validators.required]
        });
    }

    signUp() {
        this.showLoading = true;
        this.signUpForm.disable();

        if (this.signUpForm.invalid) {
            this.signUpForm.enable();
            this.showLoading = false;
            return;
        }

        this.signUpForm.value.paysResidence = this.signUpForm.value.paysResidence?.name;

        this.etudiantService.createEtudiantInscription(this.signUpForm.value).subscribe({
            next: (data) => {
                this.showLoading = false;
                this.signUpForm.enable();
                this.dialogService.openDialog('Inscription réussie ! Un message vous a été envoyé par SMS', true);
                this.signUpNgForm.resetForm();
                this.showAlert = false;
            },
            error: (err) => {
                this.signUpForm.enable();
                this.showLoading = false;
                this.alert.message = err.error || 'Erreur de connexion!';
                this.alert.type = err.status ? 'error' : 'warning';
                this.showAlert = true;
            }
        });
    }

    ngAfterContentChecked(): void {
        this.changeDetector.detectChanges();
    }

}
