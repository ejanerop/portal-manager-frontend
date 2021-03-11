import { ClientType } from "./client_type.model";
import { Portal } from "./portal.model";

export class Client {
  id : number;
  nick : string;
  ip_address : string;
  desc : string;
  client_type : ClientType;
  portals : Portal[];

  constructor( id? : number , nick? : string , ip_address? : string , desc? : string , client_type? : ClientType, portals? : Portal[] ) {
    this.id = id ? id : 0 ;
    this.nick = nick ? nick : '';
    this.ip_address = ip_address ? ip_address : '';
    this.desc = desc ? desc : '';
    this.client_type = client_type ? client_type : new ClientType();
    this.portals = portals ? portals : [];
  }

  public get allowedPortals() {
    return this.client_type.allowedPortals;
  }

}
