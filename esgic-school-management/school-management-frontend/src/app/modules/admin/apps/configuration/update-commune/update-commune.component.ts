import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {DialogService} from "../../../../../main/helpers/dialog/dialog.service";
import {Commune} from "../../../../../main/models/commune.model";
import {CommuneService} from "../../../../../../@externals/authentication/services/commune.service";

@Component({
    selector: 'app-update-commune',
    standalone: true,
    imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule],
    templateUrl: './update-commune.component.html',
    styleUrl: './update-commune.component.scss'
})
export class UpdateCommuneComponent {
    isEditing = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: { commune: Commune },
                private communeService: CommuneService,
                private dialogService: DialogService,
                private matDialog: MatDialog) {
    }

    toggleEdit() {
        this.isEditing = !this.isEditing;
    }

    updateCommune(form: NgForm) {
        if (this.isEditing) {
            this.communeService.update(this.data?.commune?.id, this.data?.commune).subscribe({
                    next: response => {
                        // Handle successful response
                        this.matDialog.closeAll();
                        this.dialogService.openDialog('Filière modifiée avec succès', true);
                        this.toggleEdit();
                    },
                    error: err => {
                        // Handle error response
                        this.dialogService.openDialog(err.error?.message || err.error, false)
                    }
                }
            );
        } else {
            this.toggleEdit();
        }

    }
}
