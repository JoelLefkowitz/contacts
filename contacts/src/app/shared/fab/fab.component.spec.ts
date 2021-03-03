import { FabComponent } from "./fab.component";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

describe("FabComponent", () => {
  let component: FabComponent;
  let fixture: ComponentFixture<FabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FabComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
