import { ContactsService } from "./contacts.service";
import { TestBed } from "@angular/core/testing";

describe("ContactsService", () => {
  let service: ContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
