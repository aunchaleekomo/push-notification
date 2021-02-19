import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { NotificationService } from '../service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  stompClient: any;

  notificationMessage = new EventEmitter();

  constructor() { }

  connect(): void {
    // url http://localhost:8082/socket
    let service = environment.url + '/socket'
    const ws = new SockJS(service)
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame) {
      _this.stompClient.subscribe('/message', (msg) => {
        _this.showMsg(msg);
      });
    }, this.errorCallBack);
  }

  errorCallBack(err) {
    console.log('errorCallBack : ' + err);
    setTimeout(() => {
      this.connect();
    }, 5000)
  }

  showMsg(msg) {
    this.notificationMessage.emit(JSON.parse(msg.body));
  }
}
