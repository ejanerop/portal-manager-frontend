

export class Permission {

  id : number;
  name : string;
  desc : string;

  constructor( id? : number , name? : string , desc? : string ) {

    this.id = id ? id : 0 ;
    this.name = name ? name : '' ;
    this.desc = desc ? desc : '' ;

  }

}
