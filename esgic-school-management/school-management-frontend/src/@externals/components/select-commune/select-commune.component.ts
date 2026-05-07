import {Component, ElementRef, forwardRef, inject, Input, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldAppearance, MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Commune} from "../../../app/main/models/commune.model";
import {CommuneService} from "../../authentication/services/commune.service";
import {SaveCommuneDialogComponent} from "../save-commune-dialog/save-commune-dialog.component";

@Component({
    selector: 'app-select-commune',
    standalone: true,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectCommuneComponent),
            multi: true
        }
    ],
    imports: [CommonModule, MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule],
    templateUrl: './select-commune.component.html',
    styleUrl: './select-commune.component.scss'
})
export class SelectCommuneComponent implements ControlValueAccessor {

    @ViewChild('inputSpec') inputSpec: ElementRef<HTMLInputElement>
    @Input({required: true}) specs: Array<Commune>;
    @Input({required: true}) label: string;
    @Input() placeholder: string;
    @Input() defaultValue: Commune;
    @Input() apparence: MatFormFieldAppearance;
    filteredSpecs: Array<Commune>;
    public openDialog = inject(MatDialog);
    onChange: (value: any) => void = () => {
    }
    onTouched: () => {}
    public specService = inject(CommuneService)

    filterSpecs(): void {
        const filterValue = this.inputSpec.nativeElement.value.toLowerCase();
        this.filteredSpecs = this.specs.filter(o => o.nom.toLowerCase().includes(filterValue));
    }

    writeValue(value: any): void {
        if (value) {
            const selectedOption = this.specs.find(option => option.id === value.id);
            if (selectedOption) {
                this.inputSpec.nativeElement.value = selectedOption.nom;
            }
        } else if (this.defaultValue) {
            this.inputSpec.nativeElement.value = this.defaultValue.nom;
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
        return option ? option?.nom : '';
    }

    onSpecSelected(e: any) {
        this.onChange(e.option.value);
    }

    openSaveSpecDialog() {
        const dialogRef = this.openDialog.open(SaveCommuneDialogComponent);

        dialogRef.componentInstance.communeCreated.subscribe((newCommune: Commune) => {
            this.specs.push(newCommune);
            this.writeValue(newCommune)
            this.onChange(newCommune)
        })
        dialogRef.beforeClosed().subscribe({
            next: value => {
                this.specService.getAllCommune().subscribe({
                    next: data => {
                        this.specs = data;
                    }
                })
            }
        })
    }
}
