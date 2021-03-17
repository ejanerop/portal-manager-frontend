import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Portal } from '../models/portal.model';
import { Globals } from '../util/global';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PortalsService {

  constructor( private http : HttpClient , public global : Globals , private authService : AuthService ) { }

  getPortals() {

    const url = `${this.global.url}/portal?api_token=${this.authService.token}`;

    return this.http.get(url);

  }

  getPortal( id : string ) {

    const url = `${this.global.url}/portal/${id}?api_token=${this.authService.token}`;

    return this.http.get(url, {observe : 'response'});

  }

  getClientsIn( portal : Portal) {

    const url = `${this.global.url}/client_in_portal/${portal.id}?api_token=${this.authService.token}`;

    return this.http.get(url, {observe : 'response'});

  }

  edit( data : any ) {

    const url = data.id == 0 ? `${this.global.url}/portal` : `${this.global.url}/portal/${data.id}`;

    data.api_token = this.authService.token;

    if (data.id == 0) {
      return this.http.post(url , data, {observe : 'response'});
    } else {
      return this.http.patch(url , data, {observe : 'response'});
    }

  }

  delete( portal : Portal ) {

    const url = `${this.global.url}/portal/${portal.id}?api_token=${this.authService.token}`;

    return this.http.delete(url, {observe : 'response'});

  }
  close( portal : Portal ) {

    const url = `${this.global.url}/close/${portal.id}?api_token=${this.authService.token}`;

    return this.http.get(url, {observe : 'response'});

  }

  change( portal : Portal ) {

    const url = `${this.global.url}/change/${portal.id}`;

    return this.http.get(url, {observe : 'response'});

  }

}
