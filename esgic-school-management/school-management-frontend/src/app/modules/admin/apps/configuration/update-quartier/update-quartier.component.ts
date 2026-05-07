import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Quartier} from "../../../../../main/models/quartier.model";
import {QuartierService} from "../../../../../../@externals/authentication/services/quartier.service";
import {DialogService} from "../../../../../main/helpers/dialog/dialog.service";

@Component({
  selector: 'app-update-quartier',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './update-quartier.component.html',
  styleUrl: './update-quartier.component.scss'
})
export class UpdateQuartierComponent {

    isEditing = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: { quartier: Quartier },
                private quartierService: QuartierService,
                private dialogService: DialogService,
                private matDialog: MatDialog) {
    }

    toggleEdit() {
        this.isEditing = !this.isEditing;
    }

    updateQuartier(form: NgForm) {
        if (this.isEditing) {
            this.quartierService.update(this.data?.quartier?.id, this.data?.quartier).subscribe({
                    next: response => {
                        // Handle successful response
                        this.matDialog.closeAll();
                        this.dialogService.openDialog('Quartier modifié avec succès', true);
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
