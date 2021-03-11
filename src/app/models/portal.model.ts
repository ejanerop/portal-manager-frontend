import { Client } from "./client.model";


export class Portal {

  id : number;
  name : string;
  dhcp_client : string;
  address_list : string;
  clients : Client[];

  constructor( id? : number , name? : string , dhcp_client? : string , address_list? : string , clients? : Client[]) {

    this.id = id ? id : 0 ;
    this.name = name ? name : '' ;
    this.dhcp_client = dhcp_client ? dhcp_client : '' ;
    this.address_list = address_list ? address_list : '' ;
    this.clients = clients ? clients : [] ;

  }

}
