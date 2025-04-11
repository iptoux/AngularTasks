import { Injectable } from '@angular/core';

interface Notification {
  type: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public notifications: Notification[] = [];

  constructor() { }

  addNotification(type: string, message: string) {
    this.notifications.push({type, message});
  }

  clearNotifications() {
    this.notifications = [];
  }

  getNotifications() {
    return this.notifications;
  }

  removeNotification(index: number) {
    this.notifications.splice(index, 1);
  }

}
