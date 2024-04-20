import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Abstract class that defines the standard methods for all Image Services.
 */
@Injectable({
  providedIn: 'root'
})
export abstract class ImageService {
  /**
   * Returns image data as a string of byte data
   * @param path the path or url of the image to be loaded
   */
  abstract loadImage(path: string): string;

  /**
   * Returs the file/path name of the stored image to be accessed later
   * @param image the byte data of the image to be uploaded
   */
  abstract uploadImage(image: string): Observable<string>;
}
