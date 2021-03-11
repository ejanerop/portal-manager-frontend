import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { Portal } from 'src/app/models/portal.model';
import { ClientsService } from 'src/app/services/clients.service';
import { PortalsService } from 'src/app/services/portals.service';
import { Globals } from 'src/app/util/global';
import Swal from "sweetalert2";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  loading : boolean = false;

  client : Client = new Client();
  currentPortal : Portal = new Portal();

  constructor( private clientService : ClientsService , private portalService : PortalsService , private router : Router, public global : Globals ) { }

  ngOnInit(): void {
    this.loading = true;

    this.clientService.getClientByIp().subscribe((resp : any) =>{
      this.client = resp.body.client;
      this.currentPortal = resp.body.portal;
      this.loading = false;
      console.log(this.loading);

    }, (error :any) => console.log(error));

  }

  isActive(portal : Portal) {
    return portal.id == this.currentPortal.id;
  }

  changeTo( portal : Portal ) {
    Swal.fire({
      icon : 'info',
      title : 'Espere',
      text : 'Cambiando a portal ' + portal.name,
      allowOutsideClick : false,
      timer : 10000
    });
    Swal.showLoading();

    this.portalService.change(portal).subscribe((resp : any) => {
      console.log(resp);
      Swal.fire('Correcto', 'Portal cerrado con éxito', 'success');
      this.timeout();
    },(error : any) => {
      Swal.fire('Ups!', error.error, 'error');
    });
  }

  close( portal : Portal ) {
    Swal.fire({
      icon : 'info',
      title : 'Espere',
      text : 'Cerrando portal ' + portal.name,
      allowOutsideClick : false,
      timer : 10000
    });
    Swal.showLoading();

    this.portalService.close(portal).subscribe( (resp:any)=> {
      console.log(resp);
      Swal.fire('Correcto', 'Portal cerrado con éxito', 'success');
      this.timeout();
    },(error : any) => {
      Swal.fire('Ups!', error.error, 'error');
    });

  }

  closeCurrent() {
    Swal.fire({
      icon : 'info',
      title : 'Espere',
      text : 'Cerrando portal',
      allowOutsideClick : false,
      timer : 10000
    });
    Swal.showLoading();

    this.clientService.close(this.client).subscribe((resp : any) => {
      console.log(resp);
      Swal.fire('Correcto', 'Portal cerrado con éxito', 'success');
      this.timeout();
    }, (error : any) => {
      console.log(error);
      Swal.fire('Ups!', error.error, 'error');
      this.timeout();
    });
  }

  timeout() {
    this.global.triggerTimeout();
  }


}
