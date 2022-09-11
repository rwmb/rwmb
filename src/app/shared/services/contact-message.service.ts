import { Injectable } from '@angular/core';
import * as fs from 'firebase/firestore';


@Injectable()
export class ContactMessageService {
  private database: fs.Firestore;

  constructor() {
    setTimeout(() => {
      this.database = fs.getFirestore();
    }, 10000);
  }

  async createContactMessage(message) {
    let docRef: fs.DocumentReference;
    try {
      docRef = await fs.addDoc(fs.collection(this.database, "contacts"), {
        ...message,
        read: false,
        relevant: true,
        responded: false
      });
    } catch (error) {
      return { error }
    }
    return { error: null, id: docRef.id };
  }
}
