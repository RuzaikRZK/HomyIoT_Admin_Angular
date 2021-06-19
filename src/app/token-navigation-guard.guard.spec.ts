import { TestBed } from '@angular/core/testing';

import { TokenNavigationGuardGuard } from './token-navigation-guard.guard';

describe('TokenNavigationGuardGuard', () => {
  let guard: TokenNavigationGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TokenNavigationGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
