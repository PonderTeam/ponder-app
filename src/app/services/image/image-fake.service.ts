import { Injectable } from "@angular/core";
import { ImageService } from "./image.service"
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageDevService extends ImageService {

  override loadImage(path: string): string {
    if(path.substring(0, 11) == "data:image/"){
      return path;
    }
    return path;
  }

  override uploadImage(image: string): Observable<string> {
    return of("assets/images/lemon-pic.jpeg");
  }
}
