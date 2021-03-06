import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Portal } from 'src/app/models/portal.model';
import { PortalsService } from 'src/app/services/portals.service';

@Component({
  selector: 'app-portals',
  templateUrl: './portals.component.html',
  styleUrls: ['./portals.component.css']
})
export class PortalsComponent implements OnInit {

  portals : Portal[] = [];

  constructor( private portalService : PortalsService , private router : Router ) { }

  ngOnInit(): void {
    this.initComponent();
  }

  initComponent(){
    this.portalService.getPortals().subscribe( (data : any) => {
      console.log(data);
      for (const item of data) {
        let portal = new Portal(item.id, item.name, item.dhcp_client, item.address_list);
        this.portals.push(portal);
      }
    });
  }

  show(portal : Portal){

  }

  new() {
    this.router.navigateByUrl('/portal/new');
  }

  edit( portal : Portal ) {
    this.router.navigateByUrl(`/portal/${portal.id}`);
  }

  delete( portal : Portal ) {

  }


}
