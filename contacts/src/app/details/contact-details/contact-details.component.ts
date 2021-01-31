import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription, of } from "rxjs";

import { Contact } from "src/api/contact.model";
import { ContactsService } from "src/app/helpers/contacts.service";
import { ImagesService } from "src/app/helpers/images.service";
import { MatDialog } from "@angular/material/dialog";
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

    toggleEditMode() {
        this.editMode = !this.editMode
    }
    
    updateName(): void {
        const dialogRef = this.dialog.open(
            UpdateNameDialogComponent, {
            data: {
                firstName: this.contact.firstName,
                lastName: this.contact.lastName
                }
            }
        );

        this.subscriptions.push(
            dialogRef
                .afterClosed()
                .subscribe((data) => {
                    if (data && data.firstName) {this.contact.firstName = data.firstName}
                    if (data && data.lastName) {this.contact.lastName = data.lastName}
                })
        );
    }

    updatePhoneNumber(): void {
        const dialogRef = this.dialog.open(
            UpdatePhoneNumberDialogComponent, {
            data: {
                phoneNumber: this.contact.phoneNumber
                }
            }
        );

        this.subscriptions.push(
            dialogRef
                .afterClosed()
                .subscribe((data) => {
                    if (data && data.phoneNumber) {this.contact.phoneNumber = data.phoneNumber}
                })
        );
    }

    setIcon(): void { 
        
    }
    
    pushNote(): void { 
        this.contact.notes.push(this.rawInputs.value.noteInput);
    }

    pushPhoto(): void {
        
    }

    removeIcon(): void { 
        this.contact.icon = null;
    }
    
    popNote(note: string): void {
        this.contact.notes = this.contact.notes.filter(x => x != note);
    }

    popPhoto(id: number): void {
        this.contact.photos.filter(x => x.id != id);
    }

    fetchContact(id: number): void {
        this.subscriptions.push(
            this.contactsService
                .retrieveContact(id)
                .subscribe(
                    (contact: Contact) =>
                        (this.contact = contact)
                )
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
