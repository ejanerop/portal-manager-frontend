import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ClientType } from 'src/app/models/client_type.model';
import { Portal } from 'src/app/models/portal.model';
import { ClientsService } from 'src/app/services/clients.service';
import { PortalsService } from 'src/app/services/portals.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  form : FormGroup = new FormGroup({});
  id : string | null = '2';
  new : boolean = true;
  loading : boolean = true;
  client : Client = new Client();
  clientTypes : ClientType[] = [];
  portals : Portal[] = [];
  selectedPortals : Portal[] = [];

  constructor( private route : ActivatedRoute,
    private router : Router,
    private fb : FormBuilder,
    private clientService : ClientsService ,
    private portalService : PortalsService ) {

      this.createForm();
    }

    ngOnInit(): void {
      this.initClientTypes();
      this.onTypeChange();
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id == 'new' || this.id == null ) {
        this.initPortals(true);
      } else if(Number(this.id) != null && Number(this.id) > 0) {
        this.clientService.getClient(this.id).subscribe((resp : any) => {
          console.log(resp);
          this.client.id = resp.body.id;
          this.client.nick = resp.body.nick;
          this.client.ip_address = resp.body.ip_address;
          this.client.client_type = new ClientType(resp.body.client_type.id);
          for (const portal of resp.body.portals) {
            this.client.portals.push(new Portal(portal.id, portal.name, portal.dhcp_client, portal.address_list));
          }
          this.new = false;
          this.initPortals(false);
          this.reset();
        });
      }else{
        this.router.navigateByUrl('/users');
      }
    }

    public invalid(control : string){
      return this.form.get(control)?.invalid && this.form.get(control)?.touched;
    }

    get portalControls(){
      return this.form.get('portals') as FormArray;
    }

    createForm() {
      this.form = this.fb.group({
        nick : [''],
        ip_address : ['192.168.20.', [Validators.required, Validators.pattern('192\.168\.20\.(25[0-4]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[1-9])')]],
        type : ['1', [Validators.required]],
        desc : [''],
        portals: this.fb.array([ ['1', Validators.required] ])
      });
    }

    reset() {
      this.selectedPortals = this.client.portals;
      console.log('Selected portals');
      console.log(this.selectedPortals);

      let portals : number[] = [];
      this.selectedPortals.forEach(portal => portals.push(portal.id));
      this.form.reset({
        'nick' : this.client.nick,
        'ip_address' : this.client.ip_address,
        'type' : this.client.client_type.id
      });
      this.portalControls.at(0).setValue(portals[0]);
      for (let index = 1; index < portals.length; index++) {
        this.portalControls.push( this.fb.control(portals[index] + '', Validators.required) );
      }
      console.log(portals);

    }

    initPortals( fresh : boolean ) {
      if (fresh) {
        this.portalService.getPortals().subscribe((data : any) => {
          for (const item of data) {
            this.portals.push(new Portal( item.id , item.name , item.dhcp_client , item.address_list ) );
          }
          this.selectedPortals.push(this.portals[0]);
          this.loading = false;
        });
      }else{
        this.portalService.getPortals().subscribe((data : any) => {
          for (const item of data) {
            this.portals.push(new Portal( item.id , item.name , item.dhcp_client , item.address_list ) );
          }
          this.loading = false;
        });
      }
    }

    initClientTypes() {
      this.clientService.getClientType().subscribe((data : any) => {
        for (const item of data) {
          this.clientTypes.push(new ClientType( item.id , item.type , item.desc, item.allowed_portals ) );
        }

        this.loading = false;
      });
    }

    addPortal() {
      let i = 0;
      let exists = this.selectedPortals.some(portal => portal.id == this.portals[i].id);
      while (exists) {
        i++;
        exists = this.selectedPortals.some(portal => portal.id == this.portals[i].id);
      }
      this.selectedPortals.push( this.portals[i] );
      this.portalControls.push( this.fb.control(this.portals[i].id + '', Validators.required) );
    }

    removePortal ( i : number ) {
      this.portalControls.removeAt( i );
      this.selectedPortals.splice( i , 1 );
    }

    onTypeChange() {
      this.form.get('type')?.valueChanges.subscribe( ( val : any ) => {
        let portal = this.clientTypes.find(type => type.id == val);
        let allowedPortals = portal ? portal.allowedPortals : 1;
        this.client.client_type.allowedPortals = allowedPortals;

        while (allowedPortals < this.selectedPortals.length) {
          this.selectedPortals.splice(-1);
          this.portalControls.removeAt( this.portalControls.length - 1 );
        }

      });
    }

    visible( id : number , i : number ) {
      let visible = true;

      this.selectedPortals.forEach((portal , index )=> {
        if(portal.id == id && index != i) { visible = false; }
      });

      return visible;
    }

    onPortalChange(i : number) {
      console.log(this.form);
      let id = this.portalControls.at(i).value ;
      let portal = this.portals.find(portal => portal.id == id);
      this.selectedPortals[i] = portal ? portal : this.portals[0];

    }

    save() {

      if (this.form.invalid) {
        this.form.get('nick')?.markAsTouched();
        this.form.get('ip_address')?.markAsTouched();
        this.form.get('desc')?.markAsTouched();
        return;
      }

      Swal.fire({
        icon : 'info',
        title : 'Espere',
        text : 'Guardando info',
        allowOutsideClick : false,
        timer : 10000
      });
      Swal.showLoading();

      let data = this.form.value;
      data.id = this.client.id;

      this.clientService.edit(data).subscribe(resp => {
        console.log(resp);
        this.router.navigateByUrl('/client');
        if (resp.status == 201) {
          this.fireToast(true, ' Usuario creado con éxito! ' )
        }
        if (resp.status == 204) {
          this.fireToast(true, ' Usuario modificado con éxito! ' )
        }
      }, error => {
        console.log(error);
        Swal.fire({
          icon : 'error',
          title : 'Espere',
          text : 'La dirección IP ya existe',
          allowOutsideClick : false,
          timer : 10000
        });
      });

    }

    fireToast(success : boolean, text : string){
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: success ? 'success' : 'error',
        title: text
      });
    }

  }
