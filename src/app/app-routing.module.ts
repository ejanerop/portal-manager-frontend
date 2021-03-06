import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { HomeComponent } from './components/home/home.component';
import { PortalsComponent } from './components/portals/portals.component';
import { EditComponent as EditPortalComponent } from './components/portals/edit/edit.component';
import { EditComponent as EditClientComponent } from './components/clients/edit/edit.component';

const routes: Routes = [
  {path : 'home', component : HomeComponent},
  {path : 'client', component : ClientsComponent},
  {path : 'portal', component : PortalsComponent},
  {path : 'portal/:id', component : EditPortalComponent},
  {path : 'client/:id', component : EditClientComponent},
  {path : '**', pathMatch : 'full', redirectTo : 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
