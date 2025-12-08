import { TestBed } from '@angular/core/testing';

import { SideNav } from './side-nav';

describe('SideNav', () => {
  let service: SideNav;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SideNav);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
