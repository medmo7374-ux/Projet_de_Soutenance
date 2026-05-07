import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    standalone: true,
    name: 'money'
})
export class MoneyPipe implements PipeTransform {

    transform(value: number | string, currencySymbol: string = 'FCFA'): string {
        if (value == null || isNaN(Number(value))) return '';


        let numberValue = Number(value);


        let formattedValue = numberValue.toLocaleString('fr-FR', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).replace(/,/g, ' ');


        return `${formattedValue} ${currencySymbol}`;
    }
}
