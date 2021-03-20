import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Portal } from 'src/app/models/portal.model';
import { PortalsService } from 'src/app/services/portals.service';
import { Globals } from 'src/app/util/global';
import { SwalHelper } from 'src/app/util/swalHelper';
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  form : FormGroup;
  id : string | null = '2';
  new : boolean = true;
  portal : Portal = new Portal();

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private fb : FormBuilder,
    private service : PortalsService,
    private swalHelper : SwalHelper,
    public global : Globals
  ) {
      this.form = this.fb.group({
        'name' : ['', Validators.required],
        'address_list' : ['', [Validators.required]],
        'dhcp_client' : ['', Validators.required],
      });
    }

    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id == 'new' || this.id == null ) {
        this.global.setLoading(false);
      } else if(Number(this.id) != null && Number(this.id) > 0) {
        this.service.getPortal(this.id).subscribe((resp : any) => {
          console.log(resp);
          this.portal.id = resp.body.id;
          this.portal.name = resp.body.name;
          this.portal.address_list = resp.body.address_list;
          this.portal.dhcp_client = resp.body.dhcp_client;
          this.new = false;
          this.global.setLoading(false);
          this.reset();
        });
      }else{
        this.router.navigateByUrl('/portal');
      }
    }

    invalid(control : string) {
      return this.form.get(control)?.invalid && this.form.get(control)?.touched;
    }

    reset() {
      this.form.reset({
        name : this.portal.name,
        address_list : this.portal.address_list,
        dhcp_client : this.portal.dhcp_client
      });
    }

    save() {

      if(this.form.invalid) {
        this.form.get('name')?.markAsTouched();
        this.form.get('address_list')?.markAsTouched();
        this.form.get('dhcp_client')?.markAsTouched();
        return;
      }

      this.swalHelper.showLoading('Espere' , 'Guardando info');

      let data = this.form.value;
      data.id = this.portal.id;

      this.service.edit(data).subscribe(resp => {
        console.log(resp);
        this.router.navigateByUrl('/portal');
        if (resp.status == 201) {
          this.swalHelper.fireToast(true, ' Portal creado con éxito! ' )
        }
        if (resp.status == 204) {
          this.swalHelper.fireToast(true, ' Portal modificado con éxito! ' )
        }
      }, error => {
        console.log(error);
        Swal.fire({
          icon : 'error',
          title : 'Espere',
          text : 'Hubo un error',
          allowOutsideClick : false,
          timer : 10000
        });
      });

    }


  }
