import { TestBed } from '@angular/core/testing';

import { CodegenService } from './codegen.service';

describe('CodegenService', () => {
  let service: CodegenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodegenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
