import { Injectable } from '@angular/core';
import { of } from 'rxjs';


@Injectable()
export class ContactMessageService {
  // TODO: fix this service
  // constructor(private httpClient: HttpClient) {}
  constructor() {}

  sendMessage (message) {
    console.log(message);
    // return this.httpClient.put('/api/sendMessage', message);
    return of(null);
  }
}
