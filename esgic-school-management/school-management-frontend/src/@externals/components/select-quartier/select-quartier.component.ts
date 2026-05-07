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
import {SaveQuartierDialogComponent} from "../save-quartier-dialog/save-quartier-dialog.component";
import {QuartierService} from "../../authentication/services/quartier.service";
import {Quartier} from "../../../app/main/models/quartier.model";

@Component({
    selector: 'app-select-quartier',
    standalone: true,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectQuartierComponent),
            multi: true
        }
    ],
    imports: [CommonModule, MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule],
    templateUrl: './select-quartier.component.html',
    styleUrl: './select-quartier.component.scss'
})
export class SelectQuartierComponent implements ControlValueAccessor {

    @ViewChild('inputSpec') inputSpec: ElementRef<HTMLInputElement>
    @Input({required: true}) specs: Array<Quartier>;
    @Input({required: true}) label: string;
    @Input() placeholder: string;
    @Input() defaultValue: Quartier;
    @Input() apparence: MatFormFieldAppearance;
    filteredSpecs: Array<Quartier>;
    public openDialog = inject(MatDialog);
    onChange: (value: any) => void = () => {
    }
    onTouched: () => {}
    public specService = inject(QuartierService)

    filterSpecs(): void {
        const filterValue = this.inputSpec.nativeElement.value.toLowerCase();
        this.filteredSpecs = this.specs.filter(o => o.nom.toLowerCase().includes(filterValue));
    }

    writeValue(value: any): void {
        if (value) {
            const selectedOption = this.specs.find(option => option.id === value.id);
            if (selectedOption) {
                this.inputSpec.nativeElement.value = selectedOption?.nom;
            }
        } else if (this.defaultValue) {
            this.inputSpec.nativeElement.value = this.defaultValue?.nom;
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
        const dialogRef = this.openDialog.open(SaveQuartierDialogComponent);

        dialogRef.componentInstance.quartierCreated.subscribe((newQuartier: Quartier) => {
            this.specs.push(newQuartier);
            this.writeValue(newQuartier)
            this.onChange(newQuartier)
        })
        dialogRef.beforeClosed().subscribe({
            next: value => {
                this.specService.getAllQuartier().subscribe({
                    next: data => {
                        this.specs = data;
                    }
                })
            }
        })
    }
}
