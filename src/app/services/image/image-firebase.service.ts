import { Injectable, inject, Inject } from '@angular/core';
import { ImageService } from './image.service';
import { Observable, defer, from, map } from 'rxjs';
import { FirebaseStorage, getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { FirebaseApp } from '@angular/fire/app';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ImageFirebaseService extends ImageService{
  private storage: FirebaseStorage;
  constructor(private app: FirebaseApp) {
    super();
    this.storage = getStorage();
   }

  override loadImage(path: string): string {
    return "https://firebasestorage.googleapis.com/v0/b/ponder-hosting.appspot.com/o/images%2F" + path + "?alt=media";
  }

  override uploadImage(image: File): Observable<string> {
    const imageId = 'images/' + uuid();
    const imageRef = ref(this.storage, imageId);
    return defer(() => from(uploadBytes(imageRef, image, {cacheControl: 'public, max-age=86400' }))).pipe(map(() => {
      return imageRef.name
    }))
  }
}
