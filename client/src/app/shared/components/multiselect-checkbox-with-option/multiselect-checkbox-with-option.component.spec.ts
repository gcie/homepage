import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectCheckboxWithOptionComponent } from './multiselect-checkbox-with-option.component';

describe('MultiselectCheckboxWithOptionComponent', () => {
  let component: MultiselectCheckboxWithOptionComponent;
  let fixture: ComponentFixture<MultiselectCheckboxWithOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiselectCheckboxWithOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiselectCheckboxWithOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
