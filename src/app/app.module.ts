import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PortalsComponent } from './components/portals/portals.component';
import { ClientsComponent } from './components/clients/clients.component';
import { EditComponent } from './components/portals/edit/edit.component';
import { EditComponent as EditClientComponent } from './components/clients/edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsernamePipe } from './pipes/username.pipe';
import { LogsComponent } from './components/logs/logs.component';
import { Globals } from './util/global';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PortalsComponent,
    ClientsComponent,
    EditComponent,
    EditClientComponent,
    UsernamePipe,
    LogsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
