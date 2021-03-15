import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../util/global';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {


  constructor( private http : HttpClient , public global : Globals , private authService : AuthService ) { }


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

    return this.getQuery(`log?api_token=${this.authService.token}`);

  }


}
