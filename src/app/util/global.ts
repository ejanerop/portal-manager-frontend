import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Client } from '../models/client.model';
import { Portal } from '../models/portal.model';

@Injectable()
export class Globals {

  private isBusy : boolean = false;
  private _loading : boolean = false;
  private _url : string = environment.api_url;
  private _client : Client = new Client();
  private portal : Portal = new Portal();

  triggerTimeout() {
    this.isBusy = true;
    setTimeout(() => {
      this.isBusy = false;
    }, 5500);
  }

  public get busy() {
    return this.isBusy;
  }

  public get loading() {
    return this._loading;
  }

  public get url() {
    return this._url;
  }

  public get client() {
    return this._client;
  }

  public get currentPortal() {
    return this.portal;
  }

  setClient( client : Client ) {
    this._client = client;
    console.log(client);
  }

  clientCan( permission : string ) {

    return this._client?.permissions.find(item => item.name == permission);

  }

  setCurrentPortal( portal : Portal ) {
    this.portal = portal;
  }

  setLoading(val : boolean){
    this._loading = val;
  }

}
