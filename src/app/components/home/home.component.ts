import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { Portal } from 'src/app/models/portal.model';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  client : Client = new Client();
  currentPortal : Portal = new Portal();

  constructor( private clientService : ClientsService , private router : Router ) { }

  ngOnInit(): void {
    this.clientService.getClientByIp().subscribe((resp : any) =>{
      this.client = resp.body;
    });
    this.clientService.currentPortal().subscribe((resp : any) => this.currentPortal = resp.body ,
                                                  (error :any) => console.log('Servicio inactivo.'));
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
    }, (error : any) => {
      console.log(error);
      Swal.fire('Ups!', error.error, 'error');

    });
  }

}
