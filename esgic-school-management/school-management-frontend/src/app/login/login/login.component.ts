import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule, NgIf, NgOptimizedImage} from '@angular/common';
import {FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {FuseAlertComponent, FuseAlertType} from "../../../@fuse/components/alert";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {fuseAnimations} from "../../../@fuse/animations";
import {LayoutModule} from "@angular/cdk/layout";
import {FuseLoadingBarComponent} from "../../../@fuse/components/loading-bar";
import {UserLogin} from "../../main/models/login.model";
import {AuthService} from "../../main/services/auth.service";
import {Helpers} from "../../main/helpers/Helpers";

@Component({
    selector: 'login',
    standalone: true,
    imports: [LayoutModule, RouterLink, NgIf, FuseAlertComponent, FormsModule, ReactiveFormsModule, CommonModule, FormsModule, FuseAlertComponent, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressSpinnerModule,  FuseLoadingBarComponent, FuseLoadingBarComponent],
    templateUrl: './login.component.html',
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;
    showLoading: boolean = true;

    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
    }


    ngOnInit(): void {

        this.signInForm = this._formBuilder.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],

        });
    }


    login(userLogin: UserLogin) {
        userLogin.username = this.signInForm.value.username;
        userLogin.password = this.signInForm.value.password;
        this.showLoading = true;
        this.signInForm.disable();
        if (this.signInForm.invalid) {
            this.signInForm.enable()
            return;
        }

        this._authService.login(userLogin).subscribe({

            next: (response) => {
                this.showAlert = false;
                Helpers.saveAccessTokenInSessionStorage(response.body.token)
                Helpers.saveCurrentUserInSessionStorage(JSON.stringify(response.body.utilisateur))
                Helpers.saveRolesInSessionStorage(JSON.stringify(response.body.roles));
                const activatedRoute = this.activatedRoute.snapshot.queryParamMap.get('to')
                this.router.navigateByUrl(activatedRoute);
                this.signInForm.reset();
            },
            error: (err) => {
                this.signInForm.enable()
                if (err.status === 403) {
                    this.showLoading = false;
                    this.alert.message = err.error;
                    this.alert.type = 'error';
                    this.showAlert = true;

                } else {
                    this.showLoading = false;
                    this.alert.message = "Erreur de connexion!";
                    this.alert.type = 'warning'
                    this.showAlert = true;

                }

            }
        })
    }
}
