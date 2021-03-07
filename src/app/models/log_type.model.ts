

export class LogType {

  id : number;
  type : string;
  desc : string;

  constructor( id? : number , type? : string , desc? : string ) {

    this.id = id ? id : 0 ;
    this.type = type ? type : '' ;
    this.desc = desc ? desc : '' ;

  }

}
