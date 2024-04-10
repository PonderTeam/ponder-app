import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], searchtext: any): any {
    if(!value) return null;
    if(!searchtext) return value;
    searchtext = searchtext.toLowerCase();
    return value.filter(function(item:any){
      return JSON.stringify(item).toLowerCase().includes(searchtext);
    })
  }

}
