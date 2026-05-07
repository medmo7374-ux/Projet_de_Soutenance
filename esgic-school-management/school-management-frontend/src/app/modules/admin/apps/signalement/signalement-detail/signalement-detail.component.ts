import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Signalement} from "../../../../../main/models/signalement.model";
import {FuseAlertComponent, FuseAlertType} from "../../../../../../@fuse/components/alert";
import {ActivatedRoute, Router} from "@angular/router";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
    selector: 'app-signalement-detail',
    standalone: true,
    imports: [CommonModule, MatInputModule, MatButtonModule, FuseAlertComponent],
    templateUrl: './signalement-detail.component.html',
    styleUrl: './signalement-detail.component.scss',
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SignalementDetailComponent implements OnInit {

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;
    signalement: Signalement;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(data => {
            if (data && data.data) {
                this.signalement = data.data[0]; // Signalement chargé via le resolver
            } else {
                this.showAlert = true;
                this.alert.type = 'error';
                this.alert.message = 'Erreur lors du chargement du signalement.';
            }
        });
    }

    goBack() {
        this.router.navigateByUrl('/signalements');
    }
}
