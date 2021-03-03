import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription, of } from "rxjs";
import { tap } from "rxjs/operators";
import { mergeOver } from "src/utils/objects";

import { Contact } from "src/api/contact.model";
import { ContactsService } from "src/app/helpers/contacts.service";
import { ImagesService } from "src/app/helpers/images.service";
import { MatDialog } from "@angular/material/dialog";
import { UpdateIconDialogComponent } from "../update-icon-dialog/update-icon-dialog.component";
import { UpdateNameDialogComponent } from "../update-name-dialog/update-name-dialog.component";
import { UpdatePhoneNumberDialogComponent } from "../update-phone-number-dialog/update-phone-number-dialog.component";

@Component({
    selector: "app-contact-details",
    templateUrl: "./contact-details.component.html",
    styleUrls: ["./contact-details.component.scss"],
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
    contact: Contact;
    editMode = false;

    rawInputs = new FormGroup({
        noteInput: new FormControl(""),
        photosUpload: new FormControl([]),
    });

    subscriptions: Subscription[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private contactsService: ContactsService,
        private imagesService: ImagesService,
        private dialog: MatDialog
    ) { }

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

    toggleEditMode() {
        this.editMode = !this.editMode
    }

    updateFromDialog(data: Object): void {
        if (data !== undefined && mergeOver(this.contact, data)) {
            this.updateContact();
        }
    }

    updateName(): void {
        this.subscriptions.push(
            this.dialog.open(
            UpdateNameDialogComponent, {
                data: {
                    firstName: this.contact.firstName,
                    lastName: this.contact.lastName
                }
            })
            .afterClosed()
            .subscribe(data => this.updateFromDialog(data))
        )
    }

    updatePhoneNumber(): void {
        this.subscriptions.push(
            this.dialog.open(
            UpdatePhoneNumberDialogComponent, {
            data: {phoneNumber: this.contact.phoneNumber}
        })
        .afterClosed()
        .subscribe(data => this.updateFromDialog(data))
        );
    }

    setIcon(): void {
        this.subscriptions.push(
            this.dialog.open(
            UpdateIconDialogComponent, {
            data: {icon: this.contact.icon}
        })
        .afterClosed()
        .subscribe(data => this.updateFromDialog(data))
        );
    }

    pushNote(): void {
        this.contact.notes = this.contact.notes ? this.contact.notes : [];
        this.contact.notes.push(this.rawInputs.value.noteInput);
        this.updateContact();
    }

    pushPhotos(): void {
        this.contact.photos = this.contact.photos.concat(
            this.rawInputs.value.photosUpload.map(
                photoUpload => ({
                    name: photoUpload.name,
                    image: photoUpload
                })
            )
        );
        this.updateContact();
    }

    removeIcon(): void {
        if (this.contact.icon) {
            this.contact.icon = null;
            this.updateContact()
        }
    }

    popNote(note: string): void {
        this.contact.notes = this.contact.notes.filter(x => x != note);
        this.updateContact();
    }

    popPhoto(id: number): void {
        this.contact.photos.filter(x => x.id != id);
        this.updateContact();
    }

    fetchContact(id: number): void {
        this.subscriptions.push(
            this.contactsService
                .retrieveContact(id)
                .subscribe((contact: Contact) => {this.contact = contact})
        );
    }

    updateContact(): void {
        this.subscriptions.push(
            this.contactsService
                .updateContact(this.contact)
                .subscribe()
        );
    }

    deleteContact(): void {
        this.subscriptions.push(
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
