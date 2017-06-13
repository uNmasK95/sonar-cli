import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { IsAuthenticatedService } from './services/is-authenticated.service';
import { DashboardComponent } from "app/dashboard/dashboard.component";
import { HistoryComponent } from "app/history/history.component";
import { ZonesComponent } from "app/zones/zones.component";
import { UsersComponent } from "app/users/users.component";
import { NotificationsComponent } from "app/notifications/notifications.component";
import { ProfileComponent } from "app/profile/profile.component";
import { DashboardEditComponent } from "app/dashboard/dashboard-edit/dashboard-edit.component";
import { ZonesExternalComponent } from "app/zones/zones-external/zones-external.component";
import { ZonesInternalComponent } from "app/zones/zones-internal/zones-internal.component";
import { ZonesSensorCreateComponent } from "app/zones/zones-sensor-create/zones-sensor-create.component";
import { ZonesSensorEditComponent } from "app/zones/zones-sensor-edit/zones-sensor-edit.component";
import { UsersCreateComponent } from "app/users/users-create/users-create.component";
import { AuthLoginService } from "app/services/auth-login.service";

export const routes: Routes = [
    { path: '', component: LoginComponent, canActivate: [AuthLoginService]/*canActivate: [LoginGuardService]*//*, canActivate: [AuthGuard]*/ },
   // { path: '', component: LoginComponent/*, canActivate: [AuthGuard]*/ },
  /*  { path: 'login', component: LoginComponent, canActivate: [LoginGuardService] },
    { path: 'register', component: RegisterComponent, canActivate: [LoginGuardService] },*/

    { path: 'dashboard', component: DashboardComponent, canActivate: [IsAuthenticatedService] },
    { path: 'row/:id', component: DashboardEditComponent, canActivate: [IsAuthenticatedService] },
    
    { path: 'history', component: HistoryComponent, canActivate: [IsAuthenticatedService] },
    { path: 'zones', component: ZonesComponent, canActivate: [IsAuthenticatedService] },
    { path: 'zones/internal/:id', component: ZonesInternalComponent, canActivate: [IsAuthenticatedService] },
    { path: 'zones/internal/:id/new', component: ZonesSensorCreateComponent, canActivate: [IsAuthenticatedService] },
    { path: 'zones/internal/:id/sensor/:id2', component: ZonesSensorEditComponent, canActivate: [IsAuthenticatedService] },
    { path: 'zones/external/:id', component: ZonesExternalComponent, canActivate: [IsAuthenticatedService] },
    { path: 'zones/external/:id/new', component: ZonesSensorCreateComponent, canActivate: [IsAuthenticatedService] },
    { path: 'zones/external/:id/sensor/:id2', component: ZonesSensorEditComponent, canActivate: [IsAuthenticatedService] },

    { path: 'users', component: UsersComponent, canActivate: [IsAuthenticatedService] },
    { path: 'users/new', component: UsersCreateComponent, canActivate: [IsAuthenticatedService] },

    { path: 'notifications', component: NotificationsComponent, canActivate: [IsAuthenticatedService] },
    { path: 'profile', component: ProfileComponent, canActivate: [IsAuthenticatedService] }


]

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);