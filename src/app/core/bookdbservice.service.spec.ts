import { TestBed } from '@angular/core/testing';

import { BookdbService } from './bookdbservice.service';

describe('BookdbService', () => {
  let service: BookdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
