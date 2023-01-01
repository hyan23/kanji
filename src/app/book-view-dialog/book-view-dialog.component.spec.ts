import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookViewDialogComponent } from './book-view-dialog.component';

describe('BookViewDialogComponent', () => {
  let component: BookViewDialogComponent;
  let fixture: ComponentFixture<BookViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookViewDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
