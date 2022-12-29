import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetWordListComponent } from './target-word-list.component';

describe('TargetWordListComponent', () => {
  let component: TargetWordListComponent;
  let fixture: ComponentFixture<TargetWordListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetWordListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TargetWordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
