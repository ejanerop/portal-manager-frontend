import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { interval } from 'rxjs';
import { Portal } from 'src/app/models/portal.model';
import { ClientsService } from 'src/app/services/clients.service';
import { AuthService } from 'src/app/services/auth.service';

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

  }

  isAuth(){
    return this.authService.isAuth();
  }

  setIp(){
    this.mainService.getIp().subscribe((data :any) => this.ip = data.body);
  }

}
