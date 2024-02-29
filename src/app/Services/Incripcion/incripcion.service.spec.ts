import { TestBed } from '@angular/core/testing';

import { IncripcionService } from './incripcion.service';

describe('IncripcionService', () => {
  let service: IncripcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncripcionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
