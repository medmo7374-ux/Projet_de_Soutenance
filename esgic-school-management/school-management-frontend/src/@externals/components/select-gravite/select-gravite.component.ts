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
import {Gravite} from "../../../app/main/models/gravite.model";
import {GraviteService} from "../../authentication/services/gravite.service";
import {SaveGraviteDialogComponent} from "../save-gravite-dialog/save-gravite-dialog.component";

@Component({
    selector: 'app-select-gravite',
    standalone: true,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectGraviteComponent),
            multi: true
        }
    ],
    imports: [CommonModule, MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule],
    templateUrl: './select-gravite.component.html',
    styleUrl: './select-gravite.component.scss'
})
export class SelectGraviteComponent implements ControlValueAccessor {

    @ViewChild('inputSpec') inputSpec: ElementRef<HTMLInputElement>
    @Input({required: true}) specs: Array<Gravite>;
    @Input({required: true}) label: string;
    @Input() placeholder: string;
    @Input() defaultValue: Gravite;
    @Input() apparence: MatFormFieldAppearance;
    filteredSpecs: Array<Gravite>;
    public openDialog = inject(MatDialog);
    onChange: (value: any) => void = () => {
    }
    onTouched: () => {}
    public specService = inject(GraviteService)

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
        const dialogRef = this.openDialog.open(SaveGraviteDialogComponent);

        dialogRef.componentInstance.graviteCreated.subscribe((newGravite: Gravite) => {
            this.specs.push(newGravite);
            this.writeValue(newGravite)
            this.onChange(newGravite)
        })
        dialogRef.beforeClosed().subscribe({
            next: value => {
                this.specService.getAllGravite().subscribe({
                    next: data => {
                        this.specs = data;
                    }
                })
            }
        })
    }
}
