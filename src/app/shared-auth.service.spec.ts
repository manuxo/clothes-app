import { TestBed, inject } from '@angular/core/testing';

import { SharedAuthService } from './shared-auth.service';

describe('SharedAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedAuthService]
    });
  });

  it('should be created', inject([SharedAuthService], (service: SharedAuthService) => {
    expect(service).toBeTruthy();
  }));
});
