import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { HomeComponent } from './components/home/home.component';
import { PortalsComponent } from './components/portals/portals.component';
import { EditComponent as EditPortalComponent } from './components/portals/edit/edit.component';
import { EditComponent as EditClientComponent } from './components/clients/edit/edit.component';
import { LogsComponent } from './components/logs/logs.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ShowComponent } from './components/portals/show/show.component';

const routes: Routes = [
  {path : 'home', component : HomeComponent},
  {path : 'client', component : ClientsComponent, canActivate : [AuthGuard]},
  {path : 'portal', component : PortalsComponent, canActivate : [AuthGuard]},
  {path : 'log', component : LogsComponent},
  {path : 'login', component : LoginComponent},
  {path : 'portal/:id', component : EditPortalComponent, canActivate : [AuthGuard]},
  {path : 'portal/:id/show', component : ShowComponent, canActivate : [AuthGuard]},
  {path : 'client/:id', component : EditClientComponent, canActivate : [AuthGuard]},
  {path : '**', pathMatch : 'full', redirectTo : 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
