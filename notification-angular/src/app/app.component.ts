import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../app/service/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'push-notification';
  count: number = 0;

  constructor(private websocketService: WebsocketService) { }

  ngOnInit() {
    this.connect();
  }

  connect(): void {
    this.websocketService.connect();
    this.websocketService.notificationMessage.subscribe((msg) => {
      this.notify(msg['title'], msg['msg'])
      this.count++;
    })

  }

  notify(title, msg): void {
    if (Notification.permission !== "denied") {
      Notification.requestPermission(function (status) {
        new Notification(title, {
          body: msg
        });
      });
    }
  }
}
