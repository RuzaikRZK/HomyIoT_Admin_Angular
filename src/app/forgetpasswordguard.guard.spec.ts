import { TestBed } from '@angular/core/testing';

import { ForgetpasswordguardGuard } from './forgetpasswordguard.guard';

describe('ForgetpasswordguardGuard', () => {
  let guard: ForgetpasswordguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ForgetpasswordguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
