import { Observable, from, of } from 'rxjs';
import { catchError, map, switchMap, tap, } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import {Image} from 'src/api/image.model';
import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  
  placeholderImage = "./assets/avatar.svg"
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
  

  uploadImage(image: File): Observable<Image> {
    return this.http.post<Image>(
        this.imagesBackend,
        {image},
        this.restService.defaultHeaders()
      ).pipe(
      catchError(this.restService.handleError)
      )
    }
}
