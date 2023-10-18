import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize } from 'rxjs';
import { IFileUpload } from '../models/i-file-upload';

@Injectable({
  providedIn: 'root',
})
export class FileUploadFirebaseService {
  private basePath = '/uploads';

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  pushFileToStorage(fileUpload: IFileUpload): Promise<string> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadImage = this.storage.upload(filePath, fileUpload.file);

    return new Promise<string>((resolve, reject) => {
      uploadImage
        .snapshotChanges()
        .pipe(
          finalize(() => {
            storageRef.getDownloadURL().subscribe((downloadURL) => {
              console.log('Image url : ', downloadURL);
              resolve(downloadURL);
              // fileUpload.name = fileUpload.file.name;
              // fileUpload.url = downloadURL;

              this.saveFileData(fileUpload);
            });
          })
        )
        .subscribe(),
        (e: any) => reject(e);
    });
  }

  private saveFileData(fileUpload: IFileUpload): void {
    console.log('File upload : ', fileUpload);

    this.db.list(this.basePath).push(fileUpload);
  }

  getFiles(numberItems: number): AngularFireList<IFileUpload> {
    return this.db.list(this.basePath, (ref) => ref.limitToLast(numberItems));
  }

  deleteFile(fileUpload: IFileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch((error: any) => console.error(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
