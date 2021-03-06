import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ClientType } from 'src/app/models/client_type.model';
import { Portal } from 'src/app/models/portal.model';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients : Client[] = [];
  allClients : Client[] = [];
  termino : string = '';

  constructor( private clientService : ClientsService , private router : Router ) { }

  ngOnInit(): void {
    this.initComponent();
  }

  initComponent() {
    this.clientService.getClients().subscribe( (data : any) => {
      for (const item of data.body) {
        let type = item.client_type;
        let portals : Portal[] = [];
        for (const portal of item.portals) {
          portals.push(new Portal(portal.id, portal.name, portal.dhcp_client, portal.address_list));
        }
        let client = new Client(item.id, item.nick, item.ip_address, new ClientType(type.id, type.type, type.desc), portals);
        this.clients.push(client);
      }
      this.allClients = this.clients
    });
  }

  new() {
    this.router.navigateByUrl('/client/new');
  }

  edit( client : Client ) {
    this.router.navigateByUrl(`/client/${client.id}`);
  }

  delete( client : Client ) {

  }

  find(termino : string) {
    if (termino == '') {
      this.clients = this.allClients;
    } else {
      this.clients = this.clients.filter(item => {
        if (item.nick.toLowerCase().includes(termino.toLowerCase()) || item.ip_address.toLowerCase().includes(termino.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      });
    }

  }


}
