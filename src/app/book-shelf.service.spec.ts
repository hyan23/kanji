import { TestBed } from '@angular/core/testing';

import { BookShelfService } from './book-shelf.service';

describe('BookShelfService', () => {
  let service: BookShelfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookShelfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
