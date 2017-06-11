import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from "@angular/common";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { routing } from './app.routes';

import { HttpUtilService } from './services/http-util.service';
import { IsAuthenticatedService } from './services/is-authenticated.service';
import { LoginGuardService } from "./services/login-guard.service";
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoryComponent } from './history/history.component';
import { ZonesComponent } from './zones/zones.component';
import { UsersComponent } from './users/users.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';
import { UserService } from "app/services/user.service";
import { AlertService } from "app/services/alert.service";
import { DashboardListComponent } from './dashboard/dashboard-list/dashboard-list.component';
import { DashboardEditComponent } from './dashboard/dashboard-edit/dashboard-edit.component';
import { DashboardItemComponent } from "app/dashboard/dashboard-list/dashboard-item.component";
import { ZonesInternalComponent } from './zones/zones-internal/zones-internal.component';
import { ZonesExternalComponent } from './zones/zones-external/zones-external.component';
import { ZonesSensorCreateComponent } from './zones/zones-sensor-create/zones-sensor-create.component';
import { ZonesSensorEditComponent } from './zones/zones-sensor-edit/zones-sensor-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HistoryComponent,
    ZonesComponent,
    UsersComponent,
    NotificationsComponent,
    ProfileComponent,
    DashboardListComponent,
    DashboardItemComponent,
    DashboardEditComponent,
    ZonesInternalComponent,
    ZonesExternalComponent,
    ZonesSensorCreateComponent,
    ZonesSensorEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    routing
  ],
  providers: [
    IsAuthenticatedService,
    LoginGuardService,
    HttpUtilService,
    AlertService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
