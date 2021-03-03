import { UpdateNameDialogComponent } from "./update-name-dialog.component";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

describe("UpdateNameDialogComponent", () => {
  let component: UpdateNameDialogComponent;
  let fixture: ComponentFixture<UpdateNameDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateNameDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
