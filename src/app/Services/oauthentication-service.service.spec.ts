import { TestBed } from '@angular/core/testing';

import { OAuthenticationServiceService } from './oauthentication-service.service';

describe('OAuthenticationServiceService', () => {
  let service: OAuthenticationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OAuthenticationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
