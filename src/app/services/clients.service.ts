import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { Globals } from '../util/global';


@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor( private http : HttpClient , public global : Globals ) { }

  getClientType() {

    const url = `${this.global.url}/client_type`;

    return this.http.get(url);

  }

  getClients() {

    const url = `${this.global.url}/client`;

    return this.http.get(url, {observe : 'response'});

  }

  getClient( id : string ) {

    const url = `${this.global.url}/client/${id}`;

    return this.http.get(url, {observe : 'response'});

  }

  getClientByIp() {

    const url = `${this.global.url}/ip_client`;

    return this.http.get(url, {observe : 'response'});

  }

  currentPortal() {

    const url = `${this.global.url}/ip_portal`;

    return this.http.get(url, {observe : 'response'});

  }

  edit(data : any) {
    const url = data.id == 0 ? `${this.global.url}/client` : `${this.global.url}/client/${data.id}`;

    if (data.id == 0) {
      return this.http.post(url , data, {observe : 'response'});
    } else {
      return this.http.patch(url , data, {observe : 'response'});
    }

  }

  delete( client : Client ) {

    const url = `${this.global.url}/client/${client.id}`;

    return this.http.delete(url, {observe : 'response'});

  }
  close( client : Client ) {

    const url = `${this.global.url}/client_logout/${client.id}`;

    return this.http.get(url, {observe : 'response'});

  }

}
