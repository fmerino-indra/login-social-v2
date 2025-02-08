import { TestBed } from '@angular/core/testing';

import { FuncModelSrvService } from './func-model-srv.service';

describe('FuncModelSrvService', () => {
  let service: FuncModelSrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuncModelSrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
