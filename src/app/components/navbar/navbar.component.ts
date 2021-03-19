import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { interval } from 'rxjs';
import { Portal } from 'src/app/models/portal.model';
import { ClientsService } from 'src/app/services/clients.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { SwalHelper } from 'src/app/util/swalHelper';
import { Globals } from 'src/app/util/global';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  ip : string = '';
  isConnected = false;
  loading = this.global.loading;
  asked :boolean = false;

  constructor( public router: Router, private mainService : MainService, private authService : AuthService , private swalHelper : SwalHelper , public global : Globals){

  }

  get disabled() {
    return this.global.busy || this.global.loading
  }

  ngOnInit(): void {
    this.setIp();
    const secondsCounter = interval(5000);
    let that = this;
    secondsCounter.subscribe( n => {
      this.mainService.pingInternet().subscribe((resp: any) => {
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
            this.swalHelper.fireToast( true , 'Sesión cerrado con éxito');
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

  userCan( permission : string ) {

    return this.global.clientCan(permission);

  }

}
