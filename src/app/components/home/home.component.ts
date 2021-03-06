import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { Portal } from 'src/app/models/portal.model';
import { ClientsService } from 'src/app/services/clients.service';

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
    this.clientService.currentPortal().subscribe((resp : any) =>{
      this.currentPortal = resp.body;
    });


  }

}
