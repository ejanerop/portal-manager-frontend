import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/services/clients.service';
import { Globals } from 'src/app/util/global';
import { SwalHelper } from 'src/app/util/swalHelper';
import Swal from "sweetalert2";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  allClients : Client[] = [];
  clients : Client[] = [];
  termino : string = '';

  constructor (
    private clientService : ClientsService ,
    private router : Router ,
    public global : Globals ,
    public swalHelper : SwalHelper
  ) { }

  ngOnInit(): void {

    this.initComponent();

  }

  initComponent() {
    this.clients = [];
    this.allClients = [];
    this.clientService.getClients().subscribe( (data : any) => {

      for (const item of data.body) {
        this.clients.push(item);
      }
      this.clients.sort((a, b) => Number(a.ip_address.split(".")[3]) - Number(b.ip_address.split(".")[3]));
      this.allClients = this.clients;

    });
  }

  new() {

    this.router.navigateByUrl('/client/new');

  }

  edit( client : Client ) {

    this.router.navigateByUrl(`/client/${client.id}`);

  }

  delete( client : Client ) {
    Swal.fire({
      title: 'Estás seguro que quieres eliminar el usuario ' + client.ip_address + '?',
      text: "Ten en cuenta que esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bajanda!',
      cancelButtonText : 'No!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.swalHelper.showLoading('Espere.' , 'Se esta procesando su solicitud.');
        this.clientService.delete(client).subscribe((resp : any) => {
          if (resp.status == 204) {
            this.initComponent();
            this.swalHelper.fireToast( true , 'Usuario eliminado con éxito' );
          }
        }, (error : any) => {
          let text : string = 'Hubo un problema.';
          if (error.status == 500) text = 'Hubo un problema con el servidor.';
          if (error.status == 401) text = 'Intentalo en unos segundos.';
          if (error.status == 404) text = 'Usuario no encontrado.';
          Swal.fire('Ups!', text ,'error');
        });
      }
    });
  }

  close( client : Client ) {
    Swal.fire({
      title: 'Estás seguro que quieres cerrar la sesión de la ' + client.ip_address + '?',
      text: "Le vas a tumbar el internet al berro!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, túmbasela!',
      cancelButtonText : 'No!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Espere.' , 'Se esta procesando su solicitud.' , 'info' );
        Swal.showLoading();
        this.clientService.close(client).subscribe((resp : any) => {
          if (resp.status == 200) {
            Swal.fire('Correcto!','Portal cerrado con éxito.','success');
          }
        }, (error : any) => {
          let text : string = 'Hubo un problema.';
          if (error.status == 500) text = 'Hubo un problema con el servidor.';
          if (error.status == 401) text = 'Intentalo en unos segundos.';
          Swal.fire('Ups!', text ,'error');
        });
      }
    });
  }

  find(termino : string) {
    if (termino == '') {
      this.clients = this.allClients;
    } else {
      this.clients = this.clients.filter(item => {
        if (item.nick?.toLowerCase().includes(termino.toLowerCase()) || item.ip_address.toLowerCase().includes(termino.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      });
    }
  }


}
