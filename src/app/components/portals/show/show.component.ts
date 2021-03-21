import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { Portal } from 'src/app/models/portal.model';
import { PortalsService } from 'src/app/services/portals.service';
import { Globals } from 'src/app/util/global';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  clientsInPortal : Client[] = [];
  id : string | null = '';
  portal : Portal = new Portal();

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private service : PortalsService ,
    public global : Globals
  ) { }

  ngOnInit(): void {

    this.global.setLoading(true);
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.service.getPortal(this.id).subscribe((resp : any) => {
        console.log(resp);
        this.portal = resp.body;
        this.portal.clients.sort((a, b) => Number(a.ip_address.split(".")[3]) - Number(b.ip_address.split(".")[3]));
        this.service.getClientsIn(this.portal).subscribe((resp : any) => {
          this.clientsInPortal = [];
          for (const item of resp.body) {
            this.clientsInPortal.push(item);
          }
          console.log(this.clientsInPortal);
          this.global.setLoading(false);
        });
      });
    }

  }

  edit( client : Client ) {

    this.router.navigateByUrl(`/client/${client.id}`);

  }
}

