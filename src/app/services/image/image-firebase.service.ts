import { Injectable } from "@angular/core";
import { ImageService } from "./image.service"
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageFirebaseService extends ImageService {

  override loadImage(path: string): string {
    if(sessionStorage.getItem(path)){
      return <string>sessionStorage.getItem(path)
    }
    return path;
  }

  override uploadImage(image: string): Observable<string> {
    return of("assets/images/lemon-pic.jpeg");
  }
}
