import { Injectable, inject, Inject } from '@angular/core';
import { ImageService } from './image.service';
import { Observable, defer, from, map } from 'rxjs';
import { FirebaseStorage, getStorage, ref, uploadString } from '@angular/fire/storage';
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
    if(path.substring(0, 15) == "assets/images/"){
      return path;
    }
    return "assets/images/lemon-pic.jpeg";
  }

  override uploadImage(image: string): Observable<string> {
    const imageId = 'images/' + uuid();
    const imageRef = ref(this.storage, imageId);
    return defer(() => from(uploadString(imageRef, image))).pipe(map(() => {
      return imageRef.name
    }))
  }
}
