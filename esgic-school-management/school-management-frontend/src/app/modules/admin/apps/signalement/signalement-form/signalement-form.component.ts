import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectCommuneComponent } from '@externals/components/select-commune/select-commune.component';
import { SelectQuartierComponent } from '@externals/components/select-quartier/select-quartier.component';
import { SelectGraviteComponent } from '@externals/components/select-gravite/select-gravite.component';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { fuseAnimations } from '@fuse/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { Commune } from 'app/main/models/commune.model';
import { Quartier } from 'app/main/models/quartier.model';
import { Gravite } from 'app/main/models/gravite.model';
import { SignalementDto } from 'app/main/models/signalement.model';
import { SignalementService } from '@externals/authentication/services/signalement.service';
import { DialogService } from 'app/main/helpers/dialog/dialog.service';
import Swiper from "swiper";
import {Autoplay, Navigation, Pagination} from "swiper/modules";

// Installer les modules Swiper nécessaires
Swiper.use([Autoplay, Navigation, Pagination]);

@Component({
    selector: 'app-signalement',
    standalone: true,
    imports: [
        LayoutModule,
        NgIf,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FuseAlertComponent,
        SelectCommuneComponent,
        SelectQuartierComponent,
        SelectGraviteComponent
    ],
    templateUrl: './signalement-form.component.html',
    styleUrls: ['./signalement-form.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class SignalementComponent implements OnInit {
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signalementForm: UntypedFormGroup;
    showAlert = false;
    showLoading = false;
    communes: Commune[] = [];
    quartiers: Quartier[] = [];
    gravites: Gravite[] = [];
    step: 'onboarding' | 'form' = 'onboarding';
    slides = [
        {
            video: 'assets/videos/leak.mp4',
            title: 'Signalez les fuites d’eau !',
            description: 'Aidez SOMAGEP S.A. à préserver l’eau en signalant une fuite.',
            logo: 'assets/images/somagep-logo.svg'
        },
        {
            video: 'assets/videos/repair.mp4',
            title: 'SOMAGEP S.A. agit vite',
            description: 'Nos équipes réparent rapidement les fuites signalées.',
            logo: 'assets/images/somagep-logo.svg'
        },
        {
            video: 'assets/videos/save-water.mp4',
            title: 'Préservons l’eau',
            description: 'Contribuez à un Mali durable avec SOMAGEP S.A.',
            logo: 'assets/images/somagep-logo.svg'
        }
    ];

    constructor(
        private _signalementService: SignalementService,
        private _formBuilder: UntypedFormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dialogService: DialogService
    ) {}

    ngOnInit(): void {
        this.signalementForm = this._formBuilder.group({
            nom: ['', Validators.required],
            prenom: ['', Validators.required],
            adresse: ['', Validators.required],
            telephone: ['', [Validators.required, Validators.pattern('^[0-9]{8,}$')]],
            description: ['', Validators.required],
            date: ['', Validators.required],
            commune: [null, Validators.required],
            quartier: [null, Validators.required],
            gravite: [null, Validators.required]
        });

        this.activatedRoute.data.subscribe(data => {
            if (data?.data) {
                this.communes = data.data[0];
                this.quartiers = data.data[1];
                this.gravites = data.data[2];
            }
        });
    }

    goToForm(): void {
        this.step = 'form';
    }

    submitSignalement(): void {
        this.showLoading = true;
        this.signalementForm.disable();

        if (this.signalementForm.invalid) {
            this.signalementForm.enable();
            this.showLoading = false;
            return;
        }

        const signalement: SignalementDto = {
            nom: this.signalementForm.value.nom,
            prenom: this.signalementForm.value.prenom,
            adresse: this.signalementForm.value.adresse,
            telephone: this.signalementForm.value.telephone,
            description: this.signalementForm.value.description,
            date: this.signalementForm.value.date,
            commune: this.signalementForm.value.commune,
            quartier: this.signalementForm.value.quartier,
            gravite: this.signalementForm.value.gravite
        };

        this._signalementService.create(signalement).subscribe({
            next: () => {
                this.showAlert = false;
               this.dialogService.openDialog('Signalement effectué avec succès !', true);
                    this.signalementForm.reset();
                    this.signalementForm.enable();
                    this.showLoading = false;
                    this.step = 'onboarding';
            },
            error: (err) => {
                this.signalementForm.enable();
                this.showLoading = false;
                this.alert.message = err.error?.message || 'Erreur lors de la soumission du signalement !';
                this.alert.type = 'error';
                this.showAlert = true;
            }
        });
    }
}
