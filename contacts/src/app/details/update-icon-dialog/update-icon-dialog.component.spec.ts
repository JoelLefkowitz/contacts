import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIconDialogComponent } from './update-icon-dialog.component';

describe('UpdateIconDialogComponent', () => {
  let component: UpdateIconDialogComponent;
  let fixture: ComponentFixture<UpdateIconDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateIconDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateIconDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
