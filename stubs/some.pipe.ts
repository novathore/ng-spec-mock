import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { DatePipe, ALIASES } from '../from/the/path/of/my/heart';
import locale from './locale.i18n';
import * as kotik from '@domik/v-derevne';

@Injectable()
@Pipe({ name: 'MyCatStrong' })
export class MyCatStrongPipe implements PipeTransform {
  constructor(private ccmDatePipe: CcmDatePipe) {
    const a = this.ccmDatePipe;
    a();
  }

  transform(date: string, flag: boolean): string {
    const transformedDate = this.ccmDatePipe.transform(date);
    return flag ? `do-something on ${transformedDate}`: 'wrong';
  }
}
