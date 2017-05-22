import { Injectable } from '@angular/core';

@Injectable()
export class LocalService {

  constructor() { }

  getLocale(): Promise<Object> {
    if (!('geolocation' in navigator)) { return Promise.reject('Find My Location not supported.'); }
    return new Promise( ( resolve, reject ) => {
      navigator.geolocation.getCurrentPosition( ( position ) => {

        const lat  = position.coords.latitude;
        const long = position.coords.longitude;
        resolve( { lat, long } );

      }, () => { reject( 'We could not get your location.' ); } );
    });
  }


}
