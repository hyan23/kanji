import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotWordListComponent } from './forgot-word-list.component';

describe('ForgotWordListComponent', () => {
  let component: ForgotWordListComponent;
  let fixture: ComponentFixture<ForgotWordListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotWordListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotWordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
