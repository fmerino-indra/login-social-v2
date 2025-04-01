import { TestBed } from '@angular/core/testing';

import { AbstractSrvService } from './abstract-srv.service';

describe('AbstractSrvService', () => {
  let service: AbstractSrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractSrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
