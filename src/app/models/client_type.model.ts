

export class ClientType {
  id : number;
  type : string;
  desc : string;
  allowedPortals : number;

  constructor( id? : number , type? : string , desc? : string , allowedPortals? : number ){
    this.id = id ? id : 0 ;
    this.type = type ? type : '' ;
    this.desc = desc ? desc : '' ;
    this.allowedPortals = allowedPortals ? allowedPortals : 1 ;
  }
}
