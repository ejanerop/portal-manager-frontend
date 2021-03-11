import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { Portal } from 'src/app/models/portal.model';
import { PortalsService } from 'src/app/services/portals.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  id : string | null = '';
  portal : Portal = new Portal();
  loading : boolean = false;

  constructor(  private route : ActivatedRoute, private router : Router, private service : PortalsService ) { }

  ngOnInit(): void {
    this.loading = true;
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.service.getPortal(this.id).subscribe((resp : any) => {
        console.log(resp);
        this.portal = resp.body;
        this.portal.clients.sort((a, b) => Number(a.ip_address.split(".")[3]) - Number(b.ip_address.split(".")[3]));
        this.loading = false;
      });
    }

  }

  edit( client : Client ) {
    this.router.navigateByUrl(`/client/${client.id}`);
  }
}

