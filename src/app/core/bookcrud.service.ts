import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BookcrudService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  create_Book(record) {
    return this.firestore.collection('Books').add(record);
  }

  read_Books() {
    return this.firestore.collection('Books').snapshotChanges();
  }

  update_Book(recordID, record) {
    this.firestore.doc('Books/' + recordID).update(record);
  }
  
  delete_Book(record_id) {
    this.firestore.doc('Books/' + record_id).delete();
  }
}
