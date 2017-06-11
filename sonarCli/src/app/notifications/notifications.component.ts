import { Component, OnInit } from '@angular/core';
import { Notification } from "app/models/notification";

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: Notification[] = [new Notification(1,"Sensor 1","Zone1","Sensor fora 40db",new Date()),new Notification(2,"Sensor 2","Zone2","Sensor fora 40db",new Date()),new Notification(3,"Sensor 3","Zone3","Sensor fora 40db",new Date()),new Notification(4,"Sensor 4","Zone4","Sensor fora 40db",new Date())];

  constructor() { }

  ngOnInit() {
  }

  isInternal(zone: string): boolean{
    if(zone=="Zone1" || zone=="Zone3"){ 
      return true;
    }else{
      return false;
    }
  }

}
