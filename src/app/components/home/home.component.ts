import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { Permission } from 'src/app/models/permission.model';
import { Portal } from 'src/app/models/portal.model';
import { AuthService } from 'src/app/services/auth.service';
import { ClientsService } from 'src/app/services/clients.service';
import { PortalsService } from 'src/app/services/portals.service';
import { Globals } from 'src/app/util/global';
import { SwalHelper } from 'src/app/util/swalHelper';
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
  clientsInPortal : Client[] = [];

  constructor(
    private clientService : ClientsService ,
    private portalService : PortalsService ,
    public global : Globals ,
    private swalHelper : SwalHelper ,
    private authService : AuthService
  ) { }

  ngOnInit(): void {

    this.initHome();

  }

  initHome() {
    this.global.setLoading(true);
    this.clientService.getInfoByIp().subscribe((resp : any) =>{
      let item = resp.body.client;
      let permissions : Permission[] = [];
      for (const permission of item.permissions) {
        permissions.push(new Permission(permission.id , permission.name , permission.desc));
      }
      this.client = new Client(item.id , item.nick , item.ip_address , item.desc , item.client_type , item.portals, permissions);
      this.client.client_type.allowedPortals = item.client_type.allowed_portals;
      this.global.setClient(this.client);
      this.currentPortal = resp.body.portal;
      this.global.setCurrentPortal(this.currentPortal);
      this.portalService.getClientsIn(this.currentPortal).subscribe((resp : any) => {
        this.clientsInPortal = []
        for (const item of resp.body) {
          this.clientsInPortal.push(item);
        }
        console.log(this.clientsInPortal);
        this.global.setLoading(false);
      });
    }, (error :any) => {
      Swal.fire('Ups! Hubo un problema.', 'Intenta refrescar la página en 15 segundos' , 'error');
      this.global.setLoading(false);
    });
  }

  isActive(portal : Portal) {

    return portal.id == this.currentPortal.id;

  }

  get disabled() {

    return this.global.busy || this.global.loading;

  }

  changeTo( portal : Portal ) {

    this.global.setLoading(true);
    this.swalHelper.showLoading( 'Espere' , 'Cambiando a portal ' + portal.name );

    this.portalService.change(portal).subscribe((resp : any) => {
      console.log(resp);
      Swal.fire('Correcto', 'Portal cambiado con éxito', 'success');
      this.timeout();
      setTimeout(() => {
        this.initHome();
      }, 8000);
    },(error : any) => {
      console.log(error);
      this.global.setLoading(false);
      Swal.fire('Ups!', 'Hubo un error', 'error');
    });
  }

  close( portal : Portal ) {

    Swal.fire({
      title: 'Estás seguro que quieres cerrar ' + portal.name + '?',
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
        this.portalService.close(portal).subscribe( (resp:any)=> {
          console.log(resp);
          Swal.fire('Correcto', 'Portal cerrado con éxito', 'success');
          this.timeout();
        },(error : any) => {
          console.log(error);
          Swal.fire('Ups!', 'Hubo un error', 'error');
        });
      }
    });

  }

  closeCurrent() {

    this.swalHelper.showLoading( 'Espere' , 'Cerrando portal' );

    this.clientService.close(this.global.client).subscribe((resp : any) => {
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

  isAuth(){

    return this.authService.isAuth();

  }

  clientCan( permission :string ) {

    return this.isAuth || this.global.clientCan(permission);

  }

}
