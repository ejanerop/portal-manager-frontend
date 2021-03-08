import { Injectable } from '@angular/core';

@Injectable()
export class Globals {

  private isBusy : boolean = false;
  private _url : string = 'http://192.168.20.2:8000/api';

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
