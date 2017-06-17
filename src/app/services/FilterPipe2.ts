import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterPipe2',
})
export class FilterPipe2 implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (el: any) {
                let aux = el.name + ":" + el.description;
                return aux.toLowerCase().indexOf(input) > -1;
            })
        }
        return value;
    }
}
