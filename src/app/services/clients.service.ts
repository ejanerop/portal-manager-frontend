import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Client } from '../models/client.model';
import { Observable } from 'rxjs';

interface ErrorValidate{
  [s:string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  _url : string = 'http://localhost:8001/api';

  constructor( private http : HttpClient ) { }

  getClientType() {

    const url = `${this._url}/client_type`;

    return this.http.get(url);

  }

  getClients() {

    const url = `${this._url}/client`;

    return this.http.get(url, {observe : 'response'});

  }

  getClient( id : string ) {

    const url = `${this._url}/client/${id}`;

    return this.http.get(url, {observe : 'response'});

  }

  getClientByIp() {

    const url = `${this._url}/ip_client`;

    return this.http.get(url, {observe : 'response'});

  }

  currentPortal() {

    const url = `${this._url}/ip_portal`;

    return this.http.get(url, {observe : 'response'});

  }

  edit(data : any) {
    const url = data.id == 0 ? `${this._url}/client` : `${this._url}/client/${data.id}`;

    if (data.id == 0) {
      return this.http.post(url , data, {observe : 'response'});
    } else {
      return this.http.patch(url , data, {observe : 'response'});
    }

  }

  delete( client : Client ) {

    const url = `${this._url}/client/${client.id}`;

    return this.http.delete(url, {observe : 'response'});

  }
  close( client : Client ) {

    const url = `${this._url}/client_logout/${client.id}`;

    return this.http.get(url, {observe : 'response'});

  }

}
