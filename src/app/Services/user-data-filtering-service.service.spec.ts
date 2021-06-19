import { TestBed } from '@angular/core/testing';

import { UserDataFilteringServiceService } from './user-data-filtering-service.service';

describe('UserDataFilteringServiceService', () => {
  let service: UserDataFilteringServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataFilteringServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
