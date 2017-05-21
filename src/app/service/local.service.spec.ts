import { TestBed, inject } from '@angular/core/testing';

import { LocalService } from './local.service';

describe('LocalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalService]
    });
  });

  it('should ...', inject([LocalService], (service: LocalService) => {
    expect(service).toBeTruthy();
  }));
});
