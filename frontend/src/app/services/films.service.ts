import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  
  private db;

  constructor(private firestore: AngularFirestore) { }

  //Obtiene todos los gatos
  getfilms() {
    return this.firestore.collection('films', ref => ref.limit(200)).snapshotChanges();
  }


  
}
