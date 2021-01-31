import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription, of } from "rxjs";

import { ContactsService } from "src/app/helpers/contacts.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-stepper",
    templateUrl: "./stepper.component.html",
    styleUrls: ["./stepper.component.scss"],
})
export class StepperComponent implements OnInit, OnDestroy {
    contactDetails = new FormGroup({
        firstName: new FormControl(""),
        lastName: new FormControl(""),
        phoneNumber: new FormControl("", Validators.pattern('[- +()0-9]+')),
        icon: new FormControl(null),
        notes: new FormControl([]),
        photos: new FormControl([]),
    });
    
    rawInputs = new FormGroup({
        iconUpload: new FormControl(null),
        notesInput: new FormControl(""),
        photosUpload: new FormControl([])
    })
        
    submssionSubscription: Subscription;

    constructor(
        private router: Router,
        private contactsService: ContactsService
    ) {}

    ngOnInit(): void {}

    get currentIcon() {
        return this.contactDetails.value.icon
    }
    
    get currentNotes() {
        return this.contactDetails.value.notes
    }
    
    get currentPhotos() {
        return this.contactDetails.value.photos
    }
    
    setIcon() {
        const iconUpload = this.rawInputs.value.iconUpload
        this.contactDetails.value.icon = {
            name: iconUpload.name,
            image: iconUpload
        }
    }
    
    pushNote(): void {
        this.contactDetails.value.notes.push(this.rawInputs.value.notesInput)
    }
    
    pushPhotos(){
        const images = this.rawInputs.value.photosUpload.map(
            photoUpload => ({
                name: photoUpload.name,
                image: photoUpload
            })
        )
        this.contactDetails.value.photos.push(...images)
    }
    
    removeIcon(): void {
        this.contactDetails.value.icon = null
    }
    
    popNote(note: string): void {
        this.contactDetails.value.notes = this.contactDetails.value.notes.filter(x => x != note)
    }
    
    popPhoto(photo) : void {
        this.contactDetails.value.photos = this.contactDetails.value.photos.filter(x => x.image != photo.image)
    }

    onSubmit(): void {
        console.log(this.contactDetails.value)
        this.submssionSubscription = this.contactsService
            .createContact(this.contactDetails.value)
            .subscribe();
        this.router.navigateByUrl("/");
    }

    ngOnDestroy(): void {
        if (this.submssionSubscription) {
            this.submssionSubscription.unsubscribe();
        }
    }
}
