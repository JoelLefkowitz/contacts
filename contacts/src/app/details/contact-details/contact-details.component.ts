import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Contact } from 'src/api/contact.model';
import { ContactsService } from 'src/app/helpers/contacts.service';
import { Image } from 'src/api/image.model';
import { ImagesService } from 'src/app/helpers/images.service';
import { MatDialog } from "@angular/material/dialog";
import { UpdateDetailsDialogComponent } from "../update-details-dialog/update-details-dialog.component"

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  contact: Contact;
  
  inputs = new FormGroup(
    {
      note: new FormControl(),
      photo: new FormControl()
    }
  )
  
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
    this.subscriptions.unshift(this.contactsService.retrieveContact(parseInt(this.route.snapshot.paramMap.get("id"), 10)).subscribe()
    )
  }  

  get icon(): string {
    return this.contact.icon
    ? this.contact.icon.image
    : this.imagesService.getPlaceholder().image
  }
  
  get photos(): string[] {
    return this.contact.photos.map(photo => photo.image)
  }

  updateBasicDetails(): void {
    const dialogRef = this.dialog.open(UpdateDetailsDialogComponent, {
      data: { 
        firstName: this.contact.firstName,
        lastName: this.contact.lastName
      },
    });

    const updateName = (result) => {
      this.contact.firstName = result.firstName;
      this.contact.lastName = result.lastName;
    }

    const updateIcon = (result) => result.newIcon ? this.imagesService.uploadImage(result.newIcon) : of(null)

    const onUpload = (icon: Image) => { 
      this.contact.icon = icon;
      this.updateContact();
    }

    this.subscriptions.unshift(
      dialogRef.afterClosed().pipe(
      tap(updateName),
      switchMap(updateIcon)
    ).subscribe(onUpload))
  }
  
  deleteNote(index: number): void {
   this.contact.notes.splice(index, 1);
   this.updateContact();
  }

  addNote(): void {
    if (this.contactDetails.value.newNote) {
      this.contact.notes = this.contact.notes ? this.contact.notes : []
      this.contact.notes.unshift(this.contactDetails.value.newNote)
      this.updateContact();
    }
  }
  
  addPhoto(): void {
    if (this.newPhoto.value) {
      const imagePayload = {name: "null", image: this.newPhoto.value}
      const onUpload = (photo: Image) => { 
        this.updateContact();
      }
      this.subscriptions.unshift(this.imagesService.uploadImage(imagePayload).subscribe(onUpload))
    }
  }
  
  deletePhoto(index: number): void {
    this.contact.photos.splice(index, 1);
    this.updateContact();
  }
  
  updateContact(): void {
    this.subscriptions.unshift(this.contactsService.updateContact(this.contact).subscribe())
  }
  
  deleteContact(): void {
    this.subscriptions.unshift(this.contactsService.deleteContact(this.contact.id).subscribe())
    this.router.navigateByUrl("/")
  }
  
  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      if(subscription) {
        subscription.unsubscribe();
      }
    }
  }
}
