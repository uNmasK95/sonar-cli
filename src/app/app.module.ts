import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from "@angular/common";

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { routing } from './app.routes';

import { HttpUtilService } from './services/http-util.service';
import { IsAuthenticatedService } from './services/is-authenticated.service';
/*import { LoginGuardService } from "./services/login-guard.service";*/
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HistoryComponent } from './components/history/history.component';
import { ZonesComponent } from './components/zones/zones.component';
import { UsersComponent } from './components/users/users.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserService } from "./services/user.service";
import { AlertService } from "./services/alert.service";
import { DashboardListComponent } from './components/dashboard/dashboard-list/dashboard-list.component';
import { AlertComponent } from "./components/alert/alert.component";
import { DashboardEditComponent } from './components/dashboard/dashboard-edit/dashboard-edit.component';
import { DashboardItemComponent } from "./components/dashboard/dashboard-list/dashboard-item.component";
import { ZonesInternalComponent } from './components/zones/zones-internal/zones-internal.component';
import { ZonesExternalComponent } from './components/zones/zones-external/zones-external.component';
import { ZonesSensorCreateComponent } from './components/zones/zones-sensor-create/zones-sensor-create.component';
import { ZonesSensorEditComponent } from './components/zones/zones-sensor-edit/zones-sensor-edit.component';
import { UsersCreateComponent } from './components/users/users-create/users-create.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AuthLoginService } from "./services/auth-login.service";
import { FilterPipe } from './components/users/FilterPipe';
import { ZonesService } from "./services/zones.service";
import { SensorsService } from "./services/sensors.service";
import { AgmCoreModule } from '@agm/core';
import { SensorValuesService} from "./services/sensorvalues.service";
import { DashboardItemGraficComponent } from './components/dashboard/dashboard-list/dashboard-item-grafic/dashboard-item-grafic.component';
import { RowService } from "./services/row.service";
import { GraficService } from "./services/grafic.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HistoryComponent,
    ZonesComponent,
    AlertComponent,
    UsersComponent,
    FilterPipe,
    NotificationsComponent,
    ProfileComponent,
    DashboardListComponent,
    DashboardItemComponent,
    DashboardEditComponent,
    ZonesInternalComponent,
    ZonesExternalComponent,
    ZonesSensorCreateComponent,
    ZonesSensorEditComponent,
    UsersCreateComponent,
    DashboardItemGraficComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    routing,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDKaj_b4kICi5aOJhOOQAmci5eKKa30YTk'
    })
  ],
  providers: [
    IsAuthenticatedService,
    HttpUtilService,
    AlertService,
    SensorValuesService,
    UserService,
    AuthLoginService,
    ZonesService,
    RowService,
    GraficService,
    SensorsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
