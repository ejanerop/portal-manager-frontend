import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/models/Log.model';
import { AuthService } from 'src/app/services/auth.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logs : Log[] = [];

  constructor( private mainService : MainService ) { }

  ngOnInit(): void {

    this.mainService.logs().subscribe( ( resp : any ) => {
      let data = resp.body;
      for (const log of data) {
        this.logs.push(log);
      }
    });

  }

}
