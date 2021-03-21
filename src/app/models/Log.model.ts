import { Client } from "./client.model";
import { LogType } from "./log_type.model";
import { Portal } from "./portal.model";

export class Log {

  id : number;
  client : Client;
  log_type : LogType;
  portal : Portal;
  created_at : string;

  constructor(
    id? : number ,
    client? : Client ,
    log_type? : LogType ,
    portal? : Portal,
    created_at? : string
  ) {

    this.id = id ? id : 0 ;
    this.client = client ? client : new Client() ;
    this.log_type = log_type ? log_type : new LogType() ;
    this.portal = portal ? portal : new Portal() ;
    this.created_at = created_at ? created_at : '' ;

  }

}
