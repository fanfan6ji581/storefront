import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sfCurrency'
})
export class SfCurrencyPipe implements PipeTransform {

  constructor() { }

  transform(value: any, suffix?: string, args?: any): string {
    // validate if it's number
    if (isNaN(value)) {
      return value;
    }
    // use USD default output
    const amount = new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(value);
    // append suffix if needed
    return suffix ? `${amount} ${suffix}` : amount;
  }

}
