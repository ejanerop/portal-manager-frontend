import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  ip : string = '';

  constructor( public router: Router, private mainService : MainService ) { }

  ngOnInit(): void {
    this.setIp();
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  logout() {

  }

  isAuth(){
    //return this.clientService.isAuth();
  }

  setIp(){
    this.mainService.getIp().subscribe((ip :any) => this.ip = ip);
  }

}
