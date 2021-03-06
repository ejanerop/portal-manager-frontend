import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Portal } from '../models/portal.model';

@Injectable({
  providedIn: 'root'
})
export class PortalsService {

  private _url : string = 'http://localhost:8001/api'

  constructor( private http : HttpClient ) { }

  getPortals() {

    const url = `${this._url}/portal`;

    return this.http.get(url);

  }

  getPortal( id : string ) {

    const url = `${this._url}/portal/${id}`;

    return this.http.get(url, {observe : 'response'});

  }

  edit( data : any ) {

    const url = data.id == 0 ? `${this._url}/portal` : `${this._url}/portal/${data.id}`;

    if (data.id == 0) {
      return this.http.post(url , data, {observe : 'response'});
    } else {
      return this.http.patch(url , data, {observe : 'response'});
    }

  }

  delete( portal : Portal ) {

    const url = `${this._url}/portal/${portal.id}`;

    return this.http.delete(url, {observe : 'response'});

  }
  close( portal : Portal ) {

    const url = `${this._url}/close/${portal.id}`;

    return this.http.get(url, {observe : 'response'});

  }

}
