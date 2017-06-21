import { Component, OnInit } from '@angular/core';
import { Notification } from "app/models/notification";
import { NotificationsService } from "app/services/notifications.service";

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: Notification[] = [];

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.readAll();
  }

  isInternal(zone: string): boolean{
    if(zone=="Zone1" || zone=="Zone3"){ 
      return true;
    }else{
      return false;
    }
  }

  readAll(){
    //Buscar todas notificacoes
    this.notificationsService.getAll()
      .subscribe(
        res => {
          for(let i=0;i<res.length;i++){
            //console.log(i);
            let not: Notification =  new Notification(res[i].id.$oid,res[i].zone.id.$oid,res[i].zone.name,res[i].sensor.id.$oid,
            res[i].sensor.name,res[i].min,res[i].max,res[i].value,res[i].description,res[i].timestamp);
            this.notifications.unshift(not);
          }
          console.log("Todas not:"+res.length);
        }
      );
  }

  max(n: Notification){
    if(n.value>= n.max){//Acima
      return true;
    }else{//Abaixo  
      return false;
    }
  }

  dif(n: Notification){
    if(n.value>= n.max){//Acima
      return n.value-n.max;
    }else{//Abaixo  
      return n.min-n.value;
    }
  }

  timeToNow(timestamp){
    let dateNow = new Date();
    let dateNotification = new Date(timestamp*1000);

    let dif = dateNow.getTime() - dateNotification.getTime();

    var minutes = Math.floor(dif / 60000);
    var seconds = ((dif % 60000) / 1000).toFixed(0);

    return minutes;
  }
  

}
