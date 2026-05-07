import {Directive, ElementRef, forwardRef, HostListener} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Directive({
    selector: 'input[separator]',
    standalone: true,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SeparatorDirective),
        multi: true
    }]
})
export class SeparatorDirective implements ControlValueAccessor {

    constructor(private _inputEl: ElementRef) {
    }

    @HostListener('input', ['$event'])
    onInput(event: any) {
        if (this._inputEl.nativeElement.value === '-') return;

        let value = this._inputEl.nativeElement.value.replace(/\s/g, '');
        let numericValue = value.replace(/[^0-9.]/g, '');

        let [integerPart, decimalPart] = numericValue.split('.');
        let formattedValue = parseInt(integerPart, 10).toLocaleString('fr-FR');
        if (decimalPart) {
            formattedValue += '.' + decimalPart;
        }

        this._inputEl.nativeElement.value = formattedValue;
        this.onChange(parseFloat(numericValue));
    }

    @HostListener('blur', ['$event'])
    onBlur() {
        this.onTouched();
    }

    writeValue(value: number): void {
        if (value !== null && value !== undefined) {
            let formattedValue = value.toLocaleString('fr-FR');
            this._inputEl.nativeElement.value = formattedValue;
        } else {
            this._inputEl.nativeElement.value = '';
        }
    }

    registerOnChange(fn: (value: number) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this._inputEl.nativeElement.disabled = isDisabled;
    }

    private onChange: (value: number) => void = () => {
    };

    private onTouched: () => void = () => {
    };
}
