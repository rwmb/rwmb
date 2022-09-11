import { Injectable } from '@angular/core';
import { collection, getFirestore, addDoc, connectFirestoreEmulator } from 'firebase/firestore';


@Injectable()
export class ContactMessageService {
  private database;

  constructor() {
  }

  async createContactMessage(message) {
    this.database = getFirestore();
    try {
      const ref = collection(this.database, 'contacts');
      const docRef = await addDoc(ref, {
        ...message,
        read: false,
        relevant: true,
        responded: false
      });
      return { error: null, id: docRef.id };
    } catch (error) {
      return { error }
    }
  }
}
