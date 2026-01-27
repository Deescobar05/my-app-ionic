import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { introGuardGuard } from './intro.guard-guard';

describe('introGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => introGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
