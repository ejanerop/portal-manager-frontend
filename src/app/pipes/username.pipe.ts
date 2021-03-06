import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'username'
})
export class UsernamePipe implements PipeTransform {

  transform( name: string | null ): string {
    return !name || name.trim() == '' ? '---': name;
  }

}
