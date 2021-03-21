import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { Globals } from 'src/app/util/global';
import { SwalHelper } from 'src/app/util/swalHelper';
import Swal from "sweetalert2";

@Component({
  selector: 'app-close-banner',
  templateUrl: './close-banner.component.html',
  styleUrls: ['./close-banner.component.css']
})
export class CloseBannerComponent implements OnInit {

  constructor(
    public global : Globals ,
    public service : ClientsService ,
    private swalHelper : SwalHelper
  ) { }

  ngOnInit(): void {
  }

  get disabled() {

    return this.global.busy || this.global.loading;

  }

  closeCurrent() {

    this.swalHelper.showLoading( 'Espere' , 'Cerrando portal' );

    this.service.close(this.global.client).subscribe((resp : any) => {
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

}
