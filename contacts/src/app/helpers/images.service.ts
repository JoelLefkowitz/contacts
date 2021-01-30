import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Image, ImagePayload } from 'src/api/image.model';
import { Observable, from, fromEvent, of } from 'rxjs';
import { catchError, delay, map, switchMap, tap, } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  imagesBackend = environment.apiHost.concat("api/contacts/images/")

  constructor(private http: HttpClient, private restService: RestService) { }
  
  getPlaceholder(): Image {
    return {
        id: 0,
        name: "placeholder",
        image: environment.apiHost.concat("assets/avatar.svg")
      }
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
    let formData = new FormData();    
    formData.append("name", payload.name);
    formData.append("image", payload.image, payload.image.name);
    return this.http.post<Image>(this.imagesBackend, formData).pipe(
      catchError(this.restService.handleError)
    )
  }
}
