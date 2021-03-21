import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/services/clients.service';
import { ClientType } from 'src/app/models/client_type.model';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Globals } from 'src/app/util/global';
import { Permission } from 'src/app/models/permission.model';
import { Portal } from 'src/app/models/portal.model';
import { PortalsService } from 'src/app/services/portals.service';
import { SwalHelper } from 'src/app/util/swalHelper';
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  client : Client = new Client();
  clientTypes : ClientType[] = [];
  form : FormGroup = new FormGroup({});
  id : string | null = '2';
  new : boolean = true;
  permissions : Permission[] = [];
  portals : Portal[] = [];
  selectedPortals : Portal[] = [];

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private fb : FormBuilder,
    private clientService : ClientsService ,
    private portalService : PortalsService ,
    private swalHelper : SwalHelper,
    public global :Globals
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.global.setLoading(true);
    this.initClientTypes();
    this.initPermissions();
    this.onTypeChange();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id == 'new' || this.id == null ) {
      this.initPortals(true);
      this.global.setLoading(false);
    } else if(Number(this.id) != null && Number(this.id) > 0) {
      this.clientService.getClient(this.id).subscribe((resp : any) => {
        console.log(resp);
        this.client = resp.body;
        this.new = false;
        this.initPortals(false);
        this.reset();
        this.global.setLoading(false);
      });
    }else{
      this.global.setLoading(false);
      this.router.navigateByUrl('/users');
    }
  }

  public invalid(control : string){
    return this.form.get(control)?.invalid && this.form.get(control)?.touched;
  }

  get portalControls(){
    return this.form.get('portals') as FormArray;
  }
  get permissionsControls(){
    return this.form.get('permissions') as FormArray;
  }

  createForm() {
    this.form = this.fb.group({
      nick : [''],
      ip_address : ['192.168.20.', [Validators.required, Validators.pattern('192\.168\.2[0-1]\.(25[0-4]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[1-9])')]],
      type : ['1', [Validators.required]],
      desc : [''],
      portals: this.fb.array([ ['1', Validators.required] ]),
      permissions: this.fb.array([]),
    });
  }

  reset() {
    this.selectedPortals = this.client.portals;
    let portals : number[] = [];
    this.selectedPortals.forEach(portal => portals.push(portal.id));
    this.form.reset({
      'nick' : this.client.nick,
      'ip_address' : this.client.ip_address,
      'desc' : this.client.desc,
      'type' : this.client.client_type.id
    });
    this.portalControls.at(0).setValue(portals[0]);
    for (let index = 1; index < portals.length; index++) {
      this.portalControls.push( this.fb.control(portals[index] + '', Validators.required) );
    }
    for (const permission of this.client.permissions) {
      this.permissionsControls.push( this.fb.control(permission.id) );
    }
  }

  initPortals( fresh : boolean ) {
    if (fresh) {
      this.portalService.getPortals().subscribe((data : any) => {
        for (const item of data) {
          this.portals.push(new Portal( item.id , item.name , item.dhcp_client , item.address_list ) );
        }
        this.selectedPortals.push(this.portals[0]);
      });
    }else{
      this.portalService.getPortals().subscribe((data : any) => {
        for (const item of data) {
          this.portals.push(new Portal( item.id , item.name , item.dhcp_client , item.address_list ) );
        }
      });
    }
  }

  initClientTypes() {
    this.clientService.getClientType().subscribe((data : any) => {
      for (const item of data) {
        this.clientTypes.push(new ClientType( item.id , item.type , item.desc, item.allowed_portals ) );
      }
    });
  }
  initPermissions() {
    this.clientService.getPermissions().subscribe((data : any) => {
      for (const item of data) {
        this.permissions.push(new Permission( item.id , item.name , item.desc ) );
      }
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

  onPortalChange( i : number ) {

    let id = this.portalControls.at(i).value ;
    let portal = this.portals.find(portal => portal.id == id);
    this.selectedPortals[i] = portal ? portal : this.portals[0];

  }

  updatePermissions( event : any , id : number ) {
    if(event.target.checked) {
      this.permissionsControls.push(this.fb.control(id));
    }else{
      for (let control of this.permissionsControls.controls) {
        if(control.value == id) { this.permissionsControls.removeAt(this.permissionsControls.controls.indexOf(control))}
      }
    }
  }

  checked( id : number ) {

    return this.permissionsControls.controls.some(control => control.value == id);

  }

  save() {

    if (this.form.invalid) {
      this.form.get('nick')?.markAsTouched();
      this.form.get('ip_address')?.markAsTouched();
      this.form.get('desc')?.markAsTouched();
      return;
    }

    this.swalHelper.showLoading( 'Espere', 'Guardando info' );

    let data = this.form.value;
    data.id = this.client.id;

    this.clientService.edit(data).subscribe(resp => {
      console.log(resp);
      this.router.navigateByUrl('/client');
      if (resp.status == 201) {
        this.swalHelper.fireToast(true, ' Usuario creado con éxito! ' )
      }
      if (resp.status == 204) {

        this.swalHelper.fireToast(true, ' Usuario modificado con éxito! ' )
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

}
