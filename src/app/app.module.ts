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
import { FeaturesComponent } from './components/home/features/features.component';
import { ShowComponent } from './components/portals/show/show.component';
import { SwalHelper } from './util/swalHelper';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { FooterComponent } from './components/shared/footer/footer.component';

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
    LoginComponent,
    FeaturesComponent,
    ShowComponent,
    LoadingComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    Globals,
    SwalHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
