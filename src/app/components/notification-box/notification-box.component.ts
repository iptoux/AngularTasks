import {Component, inject} from '@angular/core';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-notification-box',
  imports: [],
  templateUrl: './notification-box.component.html',
  styleUrl: './notification-box.component.css'
})
export class NotificationBoxComponent {

  private notificationService = inject(NotificationService)

  constructor() { }

  getLastNotification() {
    return this.notificationService.getNotifications()[this.notificationService.getNotifications().length - 1];
  }

  removeLastNotification() {
    this.notificationService.removeNotification(this.notificationService.getNotifications().length - 1);
  }

}
