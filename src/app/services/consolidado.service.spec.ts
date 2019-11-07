import { TestBed } from '@angular/core/testing';

import { ConsolidadoService } from './consolidado.service';

describe('ConsolidadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsolidadoService = TestBed.get(ConsolidadoService);
    expect(service).toBeTruthy();
  });
});
