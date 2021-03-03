import { RestService } from "./rest.service";
import { TestBed } from "@angular/core/testing";

describe("RestService", () => {
  let service: RestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
