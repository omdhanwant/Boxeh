import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'appFilterSearch'
})
export class FilterPipeSearch implements PipeTransform {
   transform(items: any[], field1: string, value: string): any[] {
    if (!items) return [];
    if(!value) return items;
    // return items.filter(it => it[field1].includes(value));
    return items.filter(it =>
        {
            if(it[field1] && it[field1].toLowerCase().includes(value.toLowerCase()) != ''){
                return it[field1].toLowerCase().includes(value.toLowerCase())
            }
            
        }
        
    );
  }
}