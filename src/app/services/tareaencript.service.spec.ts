import { TestBed } from '@angular/core/testing';

import { TareaencriptService } from './tareaencript.service';

describe('TareaencriptService', () => {
  let service: TareaencriptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareaencriptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
