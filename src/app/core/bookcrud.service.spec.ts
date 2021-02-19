import { TestBed } from '@angular/core/testing';

import { BookcrudService } from './bookcrud.service';

describe('BookcrudService', () => {
  let service: BookcrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookcrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
