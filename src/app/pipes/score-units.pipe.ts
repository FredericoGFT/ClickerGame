import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scoreUnits'
})
export class ScoreUnitsPipe implements PipeTransform {

  transform(value: number): string {
    let result = '';
    const format = new Intl.NumberFormat('en', {
      minimumFractionDigits: 0
    });

    result = format.format(Number(value));

    const digits = value.toString().length;
    switch (true) {
      case digits > 18:
        break;
      case digits > 15:
        result += ' p';
        break;
      case digits > 12:
        result += ' g';
        break;
      case digits > 9:
        result += ' t';
        break;
      case digits > 6:
        result += ' m';
        break;
      case digits > 3:
        result += ' k';
        break;
      default:
        break;
    }
    return result;
  }

}
