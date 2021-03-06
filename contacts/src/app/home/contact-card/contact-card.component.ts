import { Component, Input, OnInit } from '@angular/core';

import { Contact } from "src/api/contact.model";
import { ImagesService } from "src/app/helpers/images.service"

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {
  @Input() contact: Contact;
  
  constructor(private imagesService: ImagesService) { }

  ngOnInit(): void {}
  
  get icon(): string {
    return this.contact.icon
    ? this.contact.icon.image
    : this.imagesService.getPlaceholder().image
  }
}
