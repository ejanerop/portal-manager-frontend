import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Globals } from '../util/global';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_token : string | null = '';


  constructor( private http : HttpClient , public global : Globals ) { }


  login(data : any){

    const url = `${this.global.url}/login`;

    return this.http.post(url, data, {observe: 'response'}).pipe( map( (resp : any) => {
      this.saveToken(resp.body.data.api_token);
      return resp;
    })
    );

  }

  logout() {

    const url = `${this.global.url}/logout`;

    const token = this.api_token;
    return this.http.post(url, {api_token : token}, {observe: 'response'}).pipe( map( (resp : any) => {
      this.removeToken();
      return resp;
    })
    );;

  }


  private saveToken( idToken: string ) {

    this.api_token = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem('expira', hoy.getTime().toString() );

  }

  removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('expira');
  }

  loadToken() {

    if ( localStorage.getItem('token') == null ) {
      this.api_token = '';
    } else {
      this.api_token = localStorage.getItem('token');
    }

    return this.api_token;

  }

  isAuth() {
    if ( this.api_token != null && this.api_token.length < 2  ) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if ( expiraDate > new Date() ) {
      return true;
    } else {
      return false;
    }

  }
}
