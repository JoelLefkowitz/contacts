import {
    async,
    ComponentFixture,
    TestBed,
} from "@angular/core/testing";

import { UpdatePhoneNumberDialogComponent } from "./update-phone-number-dialog.component";

describe("UpdatePhoneNumberDialogComponent", () => {
    let component: UpdatePhoneNumberDialogComponent;
    let fixture: ComponentFixture<UpdatePhoneNumberDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UpdatePhoneNumberDialogComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(
            UpdatePhoneNumberDialogComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
