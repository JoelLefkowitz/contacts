import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

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
  contactId: number;
  
  newPhoto = new FormControl();
  
  contactDetails = new FormGroup(
    {newNote: new FormControl()}
  )
  
  imageSubscription: Subscription
  contactSubscription: Subscription
  dialogSubscription: Subscription
  
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
    this.contactId = parseInt(this.route.snapshot.paramMap.get("id"), 10)
    this.fetchContact()
  }

  fetchContact(): void {
    this.contactSubscription = this.contactsService.retrieveContact(this.contactId).subscribe((contact:Contact) => this.contact = contact)
  }

  iconUrl(iconId: number): string {
    return iconId ? this.imagesService.imageUrl(iconId) : this.imagesService.placeholderImage
  }
  
  photoUrl(photoId: number){
    return this.imagesService.imageUrl(photoId)
  }
  
  updateBasicDetails(): void {
    const dialogRef = this.dialog.open(UpdateDetailsDialogComponent, {
      data: { 
        firstName: this.contact.firstName,
        lastName: this.contact.lastName,

      },
    });
  this.dialogSubscription = dialogRef.afterClosed().pipe(
    tap(
      (result) => {
        this.contact.firstName = result.firstName;
        this.contact.lastName = result.lastName;
      }),
    switchMap(
      (result) => result.newIcon ? this.imagesService.uploadImage(result.newPhoto) : of(null)
    )
  )
  .subscribe((newIconId: number | null) => {this.contact.icon = newIconId; this.updateContact()});
  }
  
  deleteNote(index: number): void {
   this.contact.notes.splice(index, 1);
   this.updateContact();
  }

  addNote(): void {
    if (this.contactDetails.value.newNote) {
      this.contact.notes.unshift(this.contactDetails.value.newNote);
      this.updateContact();
    }
  }
  
  addPhoto(): void {
    if (this.newPhoto.value) {
      this.imageSubscription = this.imagesService.uploadImage(this.newPhoto.value)
      .subscribe(
        (photo: Image) => {
          this.contact.photos.unshift(photo.id);
          this.updateContact()
        }
      )
    }
  }
  
  deletePhoto(index: number): void {
    this.contact.photos.splice(index, 1);
    this.updateContact();
  }
  
  updateContact(): void {
    this.contactsService.updateContact(this.contact);
    this.fetchContact()
  }
  
  deleteContact(): void {
    this.contactsService.deleteContact(this.contactId);
    this.router.navigateByUrl("/")
  }
  
  ngOnDestroy(): void {
    if(this.imageSubscription){this.imageSubscription.unsubscribe()}
    if(this.contactSubscription){this.contactSubscription.unsubscribe()}
    if(this.dialogSubscription){this.dialogSubscription.unsubscribe()}
  }
}
