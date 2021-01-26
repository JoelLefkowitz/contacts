import { Image, ImagePayload } from 'src/api/image.model';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { RestService } from './rest.service';
import { catchError, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  
  placeholderImage = "/assets/avatar.svg"
  imagesBackend = "/api/contacts/images/"
  
  constructor(private http: HttpClient, private restService: RestService) { }


  imageUrl(id: number): string {
    return this.imagesBackend.concat(id.toString(), "/")
  }
  
  retrieveImage(imageId: number): Observable<Image> {
    return this.http.get<Image>(
      this.imagesBackend.concat(imageId.toString(), "/"),
      this.restService.defaultHeaders()
    ).pipe(
      catchError(this.restService.handleError)
    );
  }
  
  uploadImage(payload: ImagePayload): Observable<Image> {
    return this.http.post<Image>(
      this.imagesBackend,
      payload,
      this.restService.defaultHeaders()
    ).pipe(
      catchError(this.restService.handleError)
      )
    }
}
