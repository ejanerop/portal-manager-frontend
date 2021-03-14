import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class Globals {

  private isBusy : boolean = false;
  private _url : string = environment.api_url;

  triggerTimeout() {
    this.isBusy = true;
    setTimeout(() => {
      this.isBusy = false;
    }, 15000);
  }

  public get busy() {
    return this.isBusy;
  }

  public get url() {
    return this._url;
  }

}
