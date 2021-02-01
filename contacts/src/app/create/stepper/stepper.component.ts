import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription, forkJoin, of } from "rxjs";
import { share, switchMap, tap } from "rxjs/operators";

import { ContactsService } from "src/app/helpers/contacts.service";
import { ImagesService } from "../../helpers/images.service";
import { Router } from "@angular/router";
import { pick } from "lodash";

@Component({
    selector: "app-stepper",
    templateUrl: "./stepper.component.html",
    styleUrls: ["./stepper.component.scss"],
})
export class StepperComponent implements OnInit, OnDestroy {
    contactDetails = new FormGroup({
        firstName: new FormControl(""),
        lastName: new FormControl(""),
        phoneNumber: new FormControl(null, Validators.pattern('[- +()0-9]+')),
        icon: new FormControl(),
        notes: new FormControl([]),
        photos: new FormControl([]),
    });
    
    rawInputs = new FormGroup({
        iconUpload: new FormControl(),
        notesInput: new FormControl(""),
        photosUpload: new FormControl([])
    })
        
    submssionSubscription: Subscription;

    constructor(
        private contactsService: ContactsService,
        private imagesService: ImagesService
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
        this.contactDetails.patchValue({
            icon:{
                name: iconUpload.name,
                image: iconUpload
            }
        })
    }
    
    pushNote(): void {
        this.contactDetails.patchValue({
            notes: this.contactDetails.value.notes.concat([this.rawInputs.value.notesInput])
        })
    }
    
    pushPhotos(){
        const images = this.rawInputs.value.photosUpload.map(
            photoUpload => ({
                name: photoUpload.name,
                image: photoUpload
            })
        )
        this.contactDetails.patchValue({
            photos: this.contactDetails.value.photos.concat(images)
        })
    }
    
    removeIcon(): void {
        this.contactDetails.patchValue({icon: null})
    }
    
    popNote(note: string): void {
        this.contactDetails.patchValue(
            {notes: this.contactDetails.value.notes.filter(x => x != note)}
        )
    }
    
    popPhoto(photo) : void {
        this.contactDetails.patchValue(
            {photos: this.contactDetails.value.photos.filter(x => x.image != photo.image)}
        )
    }

    onSubmit(): void {
        const iconUpload = this.imagesService.uploadImage(
            this.contactDetails.value.icon
        )
        
        const photosUpload = this.imagesService.uploadMultipleImages(
            this.contactDetails.value.photos
        )
        
        const contactCreation = this.contactsService.createContact(
            pick(this.contactDetails.value, [
                "firstName",
                "lastName",
                "phoneNumber",
                "notes"
            ])
        ).pipe(share())
        
        
        const setIcon = forkJoin(
                [contactCreation, iconUpload]
                )
            .pipe(
                switchMap(
                ([contact, icon]) => this.contactsService.setIcon(contact, icon)
            )
        )
        
        const setPhotos = forkJoin(
            [contactCreation, photosUpload]
            )
        .pipe(switchMap
            (
                ([contact, photos]) => this.contactsService.setPhotos(contact, photos)
            )
        )
        
        this.submssionSubscription = forkJoin(
            [contactCreation, setIcon, setPhotos]
        ).subscribe();
        
        // this.router.navigateByUrl("/");
    }

    ngOnDestroy(): void {
        if (this.submssionSubscription) {
            this.submssionSubscription.unsubscribe();
        }
    }
}
