import {Component, OnInit} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatStepperModule} from "@angular/material/stepper";
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {DialogService} from "../../../../../../main/helpers/dialog/dialog.service";
import {ActivatedRoute} from "@angular/router";
import {UtilisateurEntity} from "../../../../../../main/Utils/utilisateur.page";
import {PhoneSeparatorDirective} from "../../../../../../main/helpers/directives/phone-input.directive";
import {UtilisateurService} from "../../../../../../../@externals/authentication/services/utilisateur.service";

@Component({
    selector: 'app-update-utilisateur',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatSelectModule, MatStepperModule, ReactiveFormsModule, PhoneSeparatorDirective],
    templateUrl: './update-utilisateur.component.html',
    styleUrl: './update-utilisateur.component.scss'
})
export class UpdateUtilisateurComponent implements OnInit {

    updateUserForm: UntypedFormGroup;
    user: UtilisateurEntity;

    userId: number;

    constructor(private _fb: UntypedFormBuilder,
                private userService: UtilisateurService,
                private _dialogService: DialogService,
                private activatedRoute: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit(): void {

        this.activatedRoute.data.subscribe({
            next: data => {
                if (data.data) {
                    this.user = data.data[0];
                }
            }
        })
        this.userId = this.activatedRoute.snapshot.params['id']
        this.updateUserForm = this._fb.group({
            step1: this._fb.group({
                prenom: ['', [Validators.required]],
                nom: ['', Validators.required],

            }),

            step2: this._fb.group({
                email: ['', [Validators.required, Validators.email]],
                username: ['', [Validators.required, Validators.email]],
                telephone: ['', Validators.required]
            }),
        });

        this.userService.getUserById(this.userId).subscribe({
            next: data => {
                if (data) {
                    this.updateUserForm.setValue({
                        step1: {
                            prenom: data?.prenom,
                            nom: data?.nom
                        },

                        step2: {
                            email: data?.email,
                            tel: data?.tel,
                            username: data?.username
                        }
                    });
                }
            },
            error: err => {
                this._dialogService.openDialog(err.error.message, false);
            }
        });
    }

    updateUser() {
        if (this.updateUserForm.invalid) {
            return;
        }

        let user: any = {
            firstName: this.updateUserForm.get('step1').get('prenom').value,
            lastName: this.updateUserForm.get('step1').get('nom').value,
            email: this.updateUserForm.get('step2').get('email').value,
            username: this.updateUserForm.get('step2').get('username').value,
            profile: this.updateUserForm.get('step2').get('profile').value,
            tel: this.updateUserForm.get('step2').get('tel').value
        }
        this.userService.updateUser(this.userId, user).subscribe({
            next: data => {
                this._dialogService.openDialog("Utilisateur modifié avec succès!", true);
                this.goBack()
            },
            error: err => {
                console.log("erreur de mise à jour de l'utilisateur");
                this._dialogService.openDialog(err.error.message, false);
            }
        })
    }

    goBack() {
        this.location.back()
    }

}
