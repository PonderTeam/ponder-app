import { Injectable } from "@angular/core";
import { ImageService } from "./image.service"
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageDevService extends ImageService {

  override loadImage(path: string): Observable<string> {
      return of("assets/images/lemon-pic.jpeg");
  }

  override uploadImage(image: Blob): Observable<string> {
    return of("assets/images/lemon-pic.jpeg");
  }
}
