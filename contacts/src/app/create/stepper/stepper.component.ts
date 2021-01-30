import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";

import { ContactsService } from "src/app/helpers/contacts.service";
import { Image } from "src/api/image.model";
import { ImagesService } from "src/app/helpers/images.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-stepper",
    templateUrl: "./stepper.component.html",
    styleUrls: ["./stepper.component.scss"],
})
export class StepperComponent implements OnInit, OnDestroy {
    contactDetails = new FormGroup({
        firstName: new FormControl(),
        lastName: new FormControl(),
        phoneNumber: new FormControl(),
        icon: new FormControl(),
        photos: new FormControl(),
    });

    submssionSubscription: Subscription;

    constructor(
        private router: Router,
        private contactsService: ContactsService
    ) {}

    ngOnInit(): void {}

    onSubmit(): void {
        const details = this.contactDetails.value;
        this.submssionSubscription = this.contactsService
            .createContact({
                firstName: details.firstName,
                lastName: details.lastName,
                icon: null,
                photos: [],
                phoneNumber: details.phoneNumber,
                notes: [],
            })
            .subscribe();
        this.router.navigateByUrl("/");
    }

    ngOnDestroy(): void {
        if (this.submssionSubscription) {
            this.submssionSubscription.unsubscribe();
        }
    }
}
