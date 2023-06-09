import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcriptionModalComponent } from './subcription-modal.component';

describe('SubcriptionModalComponent', () => {
  let component: SubcriptionModalComponent;
  let fixture: ComponentFixture<SubcriptionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubcriptionModalComponent]
    });
    fixture = TestBed.createComponent(SubcriptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
