import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { Globals } from '../util/global';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor( private http : HttpClient , public global : Globals , private authService : AuthService ) { }

  getClientType() {

    const url = `${this.global.url}/client_type?api_token=${this.authService.token}`;

    return this.http.get(url);

  }

  getClients() {

    const url = `${this.global.url}/client?api_token=${this.authService.token}`;

    return this.http.get(url, {observe : 'response'});

  }

  getClient( id : string ) {

    const url = `${this.global.url}/client/${id}?api_token=${this.authService.token}`;

    return this.http.get(url, {observe : 'response'});

  }

  getClientByIp() {

    const url = `${this.global.url}/ip_client`;

    return this.http.get(url, {observe : 'response'});

  }

  edit(data : any) {
    const url = data.id == 0 ? `${this.global.url}/client` : `${this.global.url}/client/${data.id}`;

    data.api_token = this.authService.token;

    if (data.id == 0) {
      return this.http.post(url , data, {observe : 'response'});
    } else {
      return this.http.patch(url , data, {observe : 'response'});
    }

  }

  delete( client : Client ) {

    const url = `${this.global.url}/client/${client.id}?api_token=${this.authService.token}`;

    return this.http.delete(url, {observe : 'response'});

  }
  close( client : Client ) {

    const url = `${this.global.url}/client_logout/${client.id}`;

    return this.http.get(url, {observe : 'response'});

  }

}
