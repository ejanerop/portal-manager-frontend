

export class Portal {

  id : number;
  name : string;
  dhcp_client : string;
  address_list : string;

  constructor( id? : number , name? : string , dhcp_client? : string , address_list? : string ) {

    this.id = id ? id : 0 ;
    this.name = name ? name : '' ;
    this.dhcp_client = dhcp_client ? dhcp_client : '' ;
    this.address_list = address_list ? address_list : '' ;

  }

}
