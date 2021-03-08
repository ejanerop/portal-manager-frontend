import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Portal } from 'src/app/models/portal.model';
import { PortalsService } from 'src/app/services/portals.service';
import { Globals } from 'src/app/util/global';
import Swal from "sweetalert2";

@Component({
  selector: 'app-portals',
  templateUrl: './portals.component.html',
  styleUrls: ['./portals.component.css']
})
export class PortalsComponent implements OnInit {

  portals : Portal[] = [];

  constructor( private portalService : PortalsService , private router : Router, public global : Globals ) { }

  ngOnInit(): void {
    this.initComponent();
  }

  initComponent(){
    this.portals = [];
    this.portalService.getPortals().subscribe( (data : any) => {
      for (const item of data) {
        this.portals.push(item);
      }
      this.portals.sort((a, b) => Number(a.dhcp_client.slice(1)) - Number(b.dhcp_client.slice(1)));
    });
  }

  new() {
    this.router.navigateByUrl('/portal/new');
  }

  show(portal : Portal){

  }

  edit( portal : Portal ) {
    this.router.navigateByUrl(`/portal/${portal.id}`);
  }

  delete( portal : Portal ) {
    Swal.fire({
      title: 'Estás seguro que quieres eliminar ' + portal.name + '?',
      text: "Ten en cuenta que esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bajanda!',
      cancelButtonText : 'No!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire( 'Espere.' , 'Se esta procesando su solicitud.' , 'info' );
        Swal.showLoading();
        this.portalService.delete(portal).subscribe((resp : any) => {
          if (resp.status == 204) {
            this.initComponent();
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true
            })
            Toast.fire({
              icon: 'success',
              title: 'Portal eliminado con éxito'
            });
          }
        }, (error : any) => {
          let text : string = 'Hubo un problema.';
          if (error.status == 500) text = 'Hubo un problema con el servidor.';
          if (error.status == 401) text = 'Intentalo en unos segundos.';
          if (error.status == 404) text = 'Portal no encontrado.';
          if (error.status == 422) text = 'El portal tiene usuarios asociados.';
          Swal.fire('Ups!', text ,'error');
        });
      }
    });
  }

  close( portal : Portal ) {
    Swal.fire({
      title: 'Estás seguro que quieres cerrar la sesión de ' + portal.name + '?',
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
        this.portalService.close(portal).subscribe((resp : any) => {
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


}
