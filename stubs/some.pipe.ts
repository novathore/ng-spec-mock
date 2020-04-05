import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { DatePipe, ALIASES } from '../from/the/path/of/my/heart';
import locale from './locale.i18n';
import * as kotik from '@domik/v-derevne';
import { KeyPad } from 'keypad';

@Injectable()
@Pipe({ name: 'MyCatStrong' })
export class MyCatStrongPipe implements PipeTransform {
  constructor(private datePipe: DatePipe, public keyPad: KeyPad) {
    const a = this.datePipe;
    a();
  }

  transform(date: string, flag: boolean): string {
    const transformedDate = this.datePipe.transform(date);
    return flag ? `do-something on ${transformedDate}`: 'wrong';
  }
}
