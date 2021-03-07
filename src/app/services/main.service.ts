import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  public _URL : string = 'http://localhost:8001/api'

  constructor( private http : HttpClient ) { }


  getQuery( query : string ){

    const endpoint = `${this._URL}/${ query }`;

    return this.http.get(endpoint);

  }

  getIp() {

    return this.getQuery('ip');

  }

  pingInternet() {
    const url = 'https://api.github.com';

    return this.http.get(url, {observe : 'response'});

  }


}
