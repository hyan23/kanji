import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeImageDialogComponent } from './take-image-dialog.component';

describe('TakeImageDialogComponent', () => {
  let component: TakeImageDialogComponent;
  let fixture: ComponentFixture<TakeImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeImageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakeImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
