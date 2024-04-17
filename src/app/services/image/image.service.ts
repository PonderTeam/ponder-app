import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class ImageService {
  abstract loadImage(path: string): string;

  abstract uploadImage(image: string): Observable<string>;
}
