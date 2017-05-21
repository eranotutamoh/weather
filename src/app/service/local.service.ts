import { Injectable } from '@angular/core';

@Injectable()
export class LocalService {

  constructor() { }

  getLocale(): Promise<string> {
    return new Promise(resolve => {
      setTimeout( () => resolve(this.nextLocale()), 500 );
    });
  }

  private nextLocale() {
    return 'Hamburg';
  }

}
