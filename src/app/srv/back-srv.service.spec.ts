import { TestBed } from '@angular/core/testing';

import { BackSrvService } from './back-srv.service';

describe('BackSrvService', () => {
  let service: BackSrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackSrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
