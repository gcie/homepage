import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConsoleViewComponent } from './admin-console-view.component';

describe('AdminConsoleViewComponent', () => {
  let component: AdminConsoleViewComponent;
  let fixture: ComponentFixture<AdminConsoleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminConsoleViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConsoleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
