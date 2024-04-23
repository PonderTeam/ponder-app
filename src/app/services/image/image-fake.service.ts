import { Injectable } from "@angular/core";
import { ImageService } from "./image.service"
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageDevService extends ImageService {

  override loadImage(path: string): string {
    return path;
  }

  override uploadImage(image: File): Observable<string> {
    return of("assets/images/lemon-pic.jpeg");
  }
}
