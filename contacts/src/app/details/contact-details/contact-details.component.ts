import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription, of } from "rxjs";

import { Contact } from "src/api/contact.model";
import { ContactsService } from "src/app/helpers/contacts.service";
import { ImagesService } from "src/app/helpers/images.service";
import { MatDialog } from "@angular/material/dialog";
import { UpdateDetailsDialogComponent } from "../update-details-dialog/update-details-dialog.component";

@Component({
    selector: "app-contact-details",
    templateUrl: "./contact-details.component.html",
    styleUrls: ["./contact-details.component.scss"],
})
export class ContactDetailsComponent
    implements OnInit, OnDestroy {
    contact: Contact;

    contactDetails = new FormGroup({
        note: new FormControl(),
        photo: new FormControl(),
    });

    subscriptions: Subscription[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private contactsService: ContactsService,
        private imagesService: ImagesService,
        private dialog: MatDialog
    ) {}

    // The contact model in the parent component might be dirty.
    // Retrieve a fresh instance rather than copying it over.
    ngOnInit(): void {
        this.fetchContact(
            parseInt(this.route.snapshot.paramMap.get("id"), 10)
        );
    }

    get icon(): string {
        return this.contact.icon
            ? this.contact.icon.image
            : this.imagesService.getPlaceholder().image;
    }

    updateBasicDetails(): void {
        const dialogRef = this.dialog.open(
            UpdateDetailsDialogComponent,
            { data: this.contact }
        );

        this.subscriptions.unshift(
            dialogRef
                .afterClosed()
                .subscribe((_) => this.updateContact())
        );
    }

    addNote(): void {}

    addPhoto(): void {}

    deleteNote(index: number): void {
        this.contact.notes.splice(index, 1);
        this.updateContact();
    }

    deletePhoto(id: number): void {
        this.contact.photos.filter(x => x.id != id);
        this.updateContact();
    }

    fetchContact(id: number): void {
        this.subscriptions.unshift(
            this.contactsService
                .retrieveContact(id)
                .subscribe(
                    (contact: Contact) =>
                        (this.contact = contact)
                )
        );
    }

    updateContact(): void {
        this.subscriptions.unshift(
            this.contactsService
                .updateContact(this.contact)
                .subscribe()
        );
    }

    deleteContact(): void {
        this.subscriptions.unshift(
            this.contactsService
                .deleteContact(this.contact.id)
                .subscribe()
        );
        this.router.navigateByUrl("/");
    }

    ngOnDestroy(): void {
        for (let subscription of this.subscriptions) {
            if (subscription) {
                subscription.unsubscribe();
            }
        }
    }
}
