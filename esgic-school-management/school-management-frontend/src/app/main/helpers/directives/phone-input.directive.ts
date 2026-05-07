import {Directive, ElementRef, forwardRef, HostListener} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Directive({
    selector: 'input[phoneSeparator]',
    standalone: true,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PhoneSeparatorDirective),
        multi: true
    }]
})
export class PhoneSeparatorDirective implements ControlValueAccessor {

    constructor(private _inputEl: ElementRef) {}

    @HostListener('input', ['$event'])
    onInput(event: any) {
        let value = this._inputEl.nativeElement.value.replace(/\s/g, '');

        value = value.replace(/\D/g, '');

        //TODO: SUPPRIMER POUR NE PAS ACCEPTER LES NUMÉROS DU MALI UNIQUEMENT
        // Limiter à 8 chiffres
        //if (value.length > 8) {
          //  value = value.slice(0, 8);
        //}

        let formattedValue = value.replace(/(\d{2})(?=\d)/g, '$1 ');

        this._inputEl.nativeElement.value = formattedValue;
        this.onChange(value);
    }

    @HostListener('blur', ['$event'])
    onBlur() {
        this.onTouched();
    }

    writeValue(value: string): void {
        if (value) {

            let unformattedValue = value.replace(/\s/g, '');

            //TODO: SUPPRIMER POUR NE PAS ACCEPTER LES NUMÉROS DU MALI UNIQUEMENT
            // Limiter à 8 chiffres
            //if (unformattedValue.length > 8) {
            //     unformattedValue = unformattedValue.slice(0, 8);
            // }

            this._inputEl.nativeElement.value = unformattedValue.replace(/(\d{2})(?=\d)/g, '$1 ');
        } else {
            this._inputEl.nativeElement.value = '';
        }
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this._inputEl.nativeElement.disabled = isDisabled;
    }

    private onChange: (value: string) => void = () => {
    };

    private onTouched: () => void = () => {
    };
}
