import { Injectable, Inject } from "@angular/core";
import { ImageService } from "./image.service"
import { Observable, defer, from, map } from "rxjs";
import { getStorage, FirebaseStorage, ref, uploadString } from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class ImageFirebaseService extends ImageService {
  private storage: FirebaseStorage = getStorage();

  override loadImage(path: string): string {
    if(sessionStorage.getItem(path)){
      return <string>sessionStorage.getItem(path)
    }
    return path;
  }

  override uploadImage(image: string): Observable<string> {
    const imageRef = ref(this.storage, 'images/\(UUID().uuidStrinng))');
    return defer(() => from(uploadString(imageRef, image))).pipe(map(() => {
      return imageRef.name
    }))

  }
}
