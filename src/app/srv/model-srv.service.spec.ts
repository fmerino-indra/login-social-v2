import { TestBed } from '@angular/core/testing';

import { ModelSrvService } from './model-srv.service';

describe('ModelSrvService', () => {
  let service: ModelSrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelSrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
