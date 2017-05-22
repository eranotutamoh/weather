import { LocalService } from './local.service';

describe('LocalService', () => {
  let geoService: LocalService;
  let myGeo: Promise<Object>;
  let myErrGeo: Promise<Object>;
  const testCoords = { 'lat' : 100 , 'lon' : 200 };
  const err = 'error';

  beforeEach(() => {
    geoService = new LocalService();

  });

  describe('Returns Promise and calls geolocation', () => {
    beforeEach(() => {
      spyOn(navigator.geolocation, 'getCurrentPosition');
      geoService.getLocale();
    });
      it('returns a promise', function () {
        expect(geoService.getLocale()).toEqual(jasmine.any(Promise));
      });

      it('calls geolocation', function() {
        expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
      });
  });

  describe('Promise resolved', () => {
    beforeEach(() => {
      spyOn(geoService, 'getLocale').and.returnValue(Promise.resolve(testCoords));
      myGeo = geoService.getLocale();
    });
    it('returns coordinates', function(done) {
      myGeo.then((coords) => {
        expect(coords).toEqual(testCoords);
        done();
      });
    });
  });

  describe('Promise rejected', () => {
    beforeEach(() => {
      spyOn(geoService, 'getLocale').and.returnValue(Promise.reject(err));
      myErrGeo = geoService.getLocale();
    });
    it('returns error', function(done) {
      myErrGeo.then()
        .catch((error) => {
        expect(error).toEqual(err);
        done();
      });
    });
  });
});
