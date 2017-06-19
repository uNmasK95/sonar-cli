import { Component } from '@angular/core';
import { IsAuthenticatedService } from "./services/is-authenticated.service";
import { Router } from "@angular/router";
import { Notification } from "app/models/notification";
import { NotificationsService } from "app/services/notifications.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app workssadas!';
  
  notNotReaded: Notification[] = [];
  notifications: Notification[] = [];
                    /*new Notification(1,"Sensor 1","Zone1","Sensor fora 40db",new Date()),
                          new Notification(2,"Sensor 2","Zone2","Sensor fora 40db",new Date()),
                          new Notification(3,"Sensor 3","Zone3","Sensor fora 40db",new Date()),
                          new Notification(4,"Sensor 4","Zone4","Sensor fora 40db",new Date()),
                          new Notification(4,"Sensor 4","Zone4","Sensor fora 40db",new Date()),
                          new Notification(4,"Sensor 4","Zone4","Sensor fora 40db",new Date()),
                          new Notification(4,"Sensor 4","Zone4","Sensor fora 40db",new Date()),
                          new Notification(4,"Sensor 4","Zone4","Sensor fora 40db",new Date()),
                          new Notification(4,"Sensor 4","Zone4","Sensor fora 40db",new Date()),
                          new Notification(4,"Sensor 4","Zone4","Sensor fora 40db",new Date()),
                          new Notification(4,"Sensor 4","Zone4","Sensor fora 40db",new Date()),
                          new Notification(4,"Sensor 4","Zone4","Sensor fora 40db",new Date())
                          ];*/

  constructor(
    private isAuthenticatedService: IsAuthenticatedService,
    private router: Router,
    private notificationsService: NotificationsService)
    //private userService: UserService) 
    { 
      //Buscar todas notificacoes
    this.notificationsService.getAll()
      .subscribe(
        res => {
          //res.reverse();
          for(let i=0;i<res.length;i++){
            //console.log(i);
            let not: Notification =  new Notification(res[i].id.$oid,res[i].zone.id.$oid,res[i].zone.name,res[i].sensor.id.$oid,
            res[i].sensor.name,res[i].min,res[i].max,res[i].value,res[i].description,res[i].timestamp);
            this.notifications.unshift(not);
          }
          console.log("Todas not:"+res.length);
          this.getNotifications();
        }
      );
     
  }

  getNotifications(){
    
    //A cada x tempo ver se ha novas notificacoes
    setInterval(() => { 
          this.notificationsService.getNotificationsNotRead().subscribe(
              res =>{
                console.log("A cada 5 seg vejo se tenho novos, res tamanho:"+res.length);
                //console.log(this.notNotReaded);
                //res.reverse();
                if(res.length>this.notNotReaded.length){//Nova notificacao
                  let newSize = res.length-this.notNotReaded.length;
                  console.log("Tem nova notificacao")
                  for(let i=0;i<newSize;i++){
                    let not: Notification =  new Notification(res[i].id.$oid,res[i].zone.id.$oid,res[i].zone.name,res[i].sensor.id.$oid,
            res[i].sensor.name,res[i].min,res[i].max,res[i].value,res[i].description,res[i].timestamp);
                    this.notNotReaded.unshift(not);
                    this.notifications.unshift(not);
                  }
                }else{//Nao ha nova notificacao
                  console.log("Nao ha novas notificacoes");
                }
              },
              error =>{
                  console.log(error);
              }
          );
      }, 5000); 
  }
  
  //Ao clicar no notification o badge fica a 0, todas lidas
  readAll($event){
    console.log($event);
    //Marcar como liga pelo user logado as notificacoes
    for(let i=0;i<this.notNotReaded.length;i++){
      //console.log(this.notNotReaded[i]);
      this.notificationsService.wasRead(this.notNotReaded[i])
        .subscribe();
    }
    this.notNotReaded = [];
  }

  //Calcular ha qts minutos foi notificacao
  timeToNow(timestamp){
    let dateNow = new Date();
    let dateNotification = new Date(timestamp*1000);

    let dif = dateNow.getTime() - dateNotification.getTime();

    var minutes = Math.floor(dif / 60000);
    var seconds = ((dif % 60000) / 1000).toFixed(0);

    return minutes;
  }


  isLogged(){
    return this.isAuthenticatedService.getLoginStatus();
  }
  
  logout(){
    this.isAuthenticatedService.logout();
    delete localStorage['token'];
    delete localStorage['userOn'];
    location.reload();
  }

}
