import { Client } from "./client.model";
import { LogType } from "./log_type.model";
import { Portal } from "./portal.model";

export class Log {

  id : number;
  client : Client;
  logType : LogType;
  portal : Portal;
  created_at : string;

  constructor( id? : number , client? : Client , logType? : LogType , portal? : Portal, created_at? : string ) {

    this.id = id ? id : 0 ;
    this.client = client ? client : new Client() ;
    this.logType = logType ? logType : new LogType() ;
    this.portal = portal ? portal : new Portal() ;
    this.created_at = created_at ? created_at : '' ;

  }

}
