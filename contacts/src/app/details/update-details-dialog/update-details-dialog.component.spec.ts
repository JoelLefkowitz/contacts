import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDetailsDialogComponent } from './update-details-dialog.component';

describe('UpdateDetailsDialogComponent', () => {
  let component: UpdateDetailsDialogComponent;
  let fixture: ComponentFixture<UpdateDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
