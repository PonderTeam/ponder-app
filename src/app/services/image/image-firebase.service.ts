import { Injectable } from '@angular/core';
import { ImageService } from './image.service';
import { Observable, defer, from, map } from 'rxjs';
import { FirebaseStorage, getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { FirebaseApp } from '@angular/fire/app';
import { v4 as uuid } from 'uuid';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageFirebaseService extends ImageService {
  private storage: FirebaseStorage;
  private pathPrefix: string;
  constructor(private app: FirebaseApp) {
    super();
    this.storage = getStorage();
    if (environment.production) {
      this.pathPrefix = "https://firebasestorage.googleapis.com/v0/b/ponder-hosting.appspot.com/o/images%2F";
    } else {
      this.pathPrefix = "http://127.0.0.1:9199/v0/b/ponder-hosting.appspot.com/o/images%2F";
    }
  }

  override loadImage(path: string): string {
    return this.pathPrefix + path + "?alt=media";
  }

  override uploadImage(image: File): Observable<string> {
    const imageId = 'images/' + uuid();
    const imageRef = ref(this.storage, imageId);
    return defer(() => from(uploadBytes(imageRef, image, {cacheControl: 'public, max-age=86400' }))).pipe(map(() => {
      return imageRef.name;
    }));
  }
}
