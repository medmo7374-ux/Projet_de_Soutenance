import {Component, ElementRef, forwardRef, inject, Input, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldAppearance, MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Statut} from "../../../app/main/models/statut.model";
import {MatDialog} from "@angular/material/dialog";
import {StatutService} from "../../authentication/services/statut.service";
import {SaveStatutDialogComponent} from "../save-statut-dialog/save-statut-dialog.component";

@Component({
    selector: 'app-select-statut',
    standalone: true,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectStatutComponent),
            multi: true
        }
    ],
    imports: [CommonModule, MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule],
    templateUrl: './select-statut.component.html',
    styleUrl: './select-statut.component.scss'
})
export class SelectStatutComponent  implements ControlValueAccessor {

    @ViewChild('inputSpec') inputSpec: ElementRef<HTMLInputElement>
    @Input({required: true}) specs: Array<Statut>;
    @Input({required: true}) label: string;
    @Input() placeholder: string;
    @Input() defaultValue: Statut;
    @Input() apparence: MatFormFieldAppearance;
    filteredSpecs: Array<Statut>;
    public openDialog = inject(MatDialog);
    onChange: (value: any) => void = () => {
    }
    onTouched: () => {}
    public specService = inject(StatutService)

    filterSpecs(): void {
        const filterValue = this.inputSpec.nativeElement.value.toLowerCase();
        this.filteredSpecs = this.specs.filter(o => o.libelle.toLowerCase().includes(filterValue));
    }

    writeValue(value: any): void {
        if (value) {
            const selectedOption = this.specs.find(option => option.id === value.id);
            if (selectedOption) {
                this.inputSpec.nativeElement.value = selectedOption.libelle;
            }
        } else if (this.defaultValue) {
            this.inputSpec.nativeElement.value = this.defaultValue.libelle;
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn
    }

    setDisabledState?(isDisabled: boolean): void {

    }

    displayFn(option: any) {
        return option ? option?.libelle : '';
    }

    onSpecSelected(e: any) {
        this.onChange(e.option.value);
    }

    openSaveSpecDialog() {
        const dialogRef = this.openDialog.open(SaveStatutDialogComponent);

        dialogRef.componentInstance.statutCreated.subscribe((newStatut: Statut) => {
            this.specs.push(newStatut);
            this.writeValue(newStatut)
            this.onChange(newStatut)
        })
        dialogRef.beforeClosed().subscribe({
            next: value => {
                this.specService.getAllStatut().subscribe({
                    next: data => {
                        this.specs = data;
                    }
                })
            }
        })
    }
}
