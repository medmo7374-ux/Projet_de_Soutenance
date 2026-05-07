import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {DialogService} from "../../../../../main/helpers/dialog/dialog.service";
import {Gravite} from "../../../../../main/models/gravite.model";
import {GraviteService} from "../../../../../../@externals/authentication/services/gravite.service";

@Component({
    selector: 'app-update-gravite',
    standalone: true,
    imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule],
    templateUrl: './update-gravite.component.html',
    styleUrl: './update-gravite.component.scss'
})
export class UpdateGraviteComponent {
    isEditing = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: { gravite: Gravite },
                private graviteService: GraviteService,
                private dialogService: DialogService,
                private matDialog: MatDialog) {
    }

    toggleEdit() {
        this.isEditing = !this.isEditing;
    }

    updateGravite(form: NgForm) {
        if (this.isEditing) {
            this.graviteService.update(this.data?.gravite?.id, this.data?.gravite).subscribe({
                next: response => {
                    this.matDialog.closeAll();
                    this.dialogService.openDialog('Niveau modifié avec succès', true);
                    this.toggleEdit();
                },
                error: err => {
                    this.dialogService.openDialog(err.error?.message || err.error, false);
                }
            });
        } else {
            this.toggleEdit();
        }
    }
}
