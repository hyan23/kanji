import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordBookListComponent } from './word-book-list.component';

describe('WordBookListComponent', () => {
  let component: WordBookListComponent;
  let fixture: ComponentFixture<WordBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordBookListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
