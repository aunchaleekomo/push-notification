import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notificationMessage = new EventEmitter();
  constructor() { }
}
