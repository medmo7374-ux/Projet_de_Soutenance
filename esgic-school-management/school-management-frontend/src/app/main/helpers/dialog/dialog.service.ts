import {Injectable} from '@angular/core';
import {DialogComponent} from "./dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    constructor(private dialog: MatDialog) {
    }

    openDialog(message: string, isSuccess: boolean): void {
        this.dialog.open(DialogComponent, {
            width: '400px',
            data: {message, isSuccess}
        });
    }
}
