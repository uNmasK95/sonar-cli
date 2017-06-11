import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginGuardService } from './services/login-guard.service';
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

export const routes: Routes = [
   // { path: '', component: LoginComponent/*, canActivate: [AuthGuard]*/ },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuardService] },
    { path: 'register', component: RegisterComponent, canActivate: [LoginGuardService] },

    { path: 'dashboard', component: DashboardComponent },
    { path: 'row/:id', component: DashboardEditComponent },
    
    { path: 'history', component: HistoryComponent },
    { path: 'zones', component: ZonesComponent },
    { path: 'zones/internal/:id', component: ZonesInternalComponent },
    { path: 'zones/internal/:id/new', component: ZonesSensorCreateComponent },
    { path: 'zones/internal/:id/sensor/:id2', component: ZonesSensorEditComponent },
    { path: 'zones/external/:id', component: ZonesExternalComponent },
    { path: 'zones/external/:id/new', component: ZonesSensorCreateComponent },
    { path: 'zones/external/:id/sensor/:id2', component: ZonesSensorEditComponent },

    { path: 'users', component: UsersComponent },
    { path: 'users/new', component: UsersCreateComponent },

    { path: 'notifications', component: NotificationsComponent },
    { path: 'profile', component: ProfileComponent },

    //Novas
   /* { path: 'projects', component: DashboardComponent },
    { path: 'projects/new', component: CreateProjectComponent },
    { path: 'projects/:id/userstories', component: UserStoriesComponent }, //para PO

    { path: 'projects/:id/sprints', component: SprintsComponent }, //para SM (estes acho que tem de ter um canActivate)
    { path: 'projects/:id/sprints/new', component: SprintCreateComponent }, //para SM //mudar comp
    { path: 'projects/:id/sprints/:id2', component: SprintsUserStoriesTasksComponent }, //para SM //mudar comp

    { path: 'projects/:id', component: UserStoriesDashboardComponent }, //para Dev/SM    

    { path: 'teams', component: TeamsComponent, canActivate: [ IsAuthenticatedService ] },
    { path: 'teams/new', component: TeamsCreateComponent, canActivate: [ IsAuthenticatedService ] }, //Para SM
    { path: 'userstories', component: UserStoriesComponent, canActivate: [ IsAuthenticatedService ] }, // tab direto
    { path: 'questions', component: QuestionsComponent, canActivate: [ IsAuthenticatedService ] },
    //{ path: 'questions/:id', component: QuestionsDetailComponent },
    { path: 'profile/:id', component: ProfileComponent, canActivate: [ IsAuthenticatedService ] },
    //{ path: 'profile/:id', component: ProfileComponent },*/

    { path: '', component: DashboardComponent, canActivate: [LoginGuardService]/*, canActivate: [AuthGuard]*/ }

]

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);