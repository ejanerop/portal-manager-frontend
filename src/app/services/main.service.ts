import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../util/global';

@Injectable({
  providedIn: 'root'
})
export class MainService {


  constructor( private http : HttpClient , public global : Globals ) { }


  getQuery( query : string ){

    const endpoint = `${this.global.url}/${ query }`;

    return this.http.get(endpoint , {observe : 'response'});

  }

  getIp() {

    return this.getQuery('ip');

  }

  pingInternet() {

    const url = 'https://api.github.com';

    return this.http.get(url, {observe : 'response'});

  }

  logs() {

    return this.getQuery(`log`);

  }

}
