import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { interval } from 'rxjs';
import { Portal } from 'src/app/models/portal.model';
import { ClientsService } from 'src/app/services/clients.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  ip : string = '';
  isConnected = false;
  asked :boolean = false;
  currentPortal : Portal = new Portal();

  constructor( public router: Router,
               private mainService : MainService,
               private clientsService : ClientsService ,
               private authService : AuthService) { }

  ngOnInit(): void {
    this.setIp();
    this.clientsService.currentPortal().subscribe((resp : any) => this.currentPortal = resp.body ,
                                                  (error :any) => console.log('Servicio inactivo.'));
    const secondsCounter = interval(5000);
    let that = this;
    secondsCounter.subscribe( n => {
      this.mainService.pingInternet().subscribe((resp: any) => {
        console.log(resp);
        if(resp.status == 200){
          that.isConnected = true;
        }else{
          that.isConnected = false;
        }
      },(error : any) => {
        that.isConnected = false;
      });
    });
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  logout() {
    Swal.fire({
      icon : 'question',
      title : 'Está seguro que desea cerrar sesión?',
      allowOutsideClick : false,
      showCancelButton : true,
      confirmButtonColor : 'primary',
      confirmButtonText : 'Sí',
      cancelButtonText : 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout().subscribe( (resp:any) => {
          if (resp.status == 204) {
            this.router.navigateByUrl('/home');
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true
            })
            Toast.fire({
              icon: 'info',
              title: 'Sesión cerrado con éxito'
            });
          }
        });
      }
    });
  }

  isAuth(){
    return this.authService.isAuth();
  }

  setIp(){
    this.mainService.getIp().subscribe((data :any) => this.ip = data.body);
  }

}
