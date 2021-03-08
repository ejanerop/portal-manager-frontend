import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Portal } from '../models/portal.model';
import { Globals } from '../util/global';

@Injectable({
  providedIn: 'root'
})
export class PortalsService {

  constructor( private http : HttpClient , public global : Globals ) { }

  getPortals() {

    const url = `${this.global.url}/portal`;

    return this.http.get(url);

  }

  getPortal( id : string ) {

    const url = `${this.global.url}/portal/${id}`;

    return this.http.get(url, {observe : 'response'});

  }

  edit( data : any ) {

    const url = data.id == 0 ? `${this.global.url}/portal` : `${this.global.url}/portal/${data.id}`;

    if (data.id == 0) {
      return this.http.post(url , data, {observe : 'response'});
    } else {
      return this.http.patch(url , data, {observe : 'response'});
    }

  }

  delete( portal : Portal ) {

    const url = `${this.global.url}/portal/${portal.id}`;

    return this.http.delete(url, {observe : 'response'});

  }
  close( portal : Portal ) {

    const url = `${this.global.url}/close/${portal.id}`;

    return this.http.get(url, {observe : 'response'});

  }

  change( portal : Portal ) {

    const url = `${this.global.url}/change/${portal.id}`;

    return this.http.get(url, {observe : 'response'});

  }

}
