import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SwalHelper } from 'src/app/util/swalHelper';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form : FormGroup;

  constructor( private service : AuthService,
               private fb : FormBuilder,
               private router : Router ,
               private swalHelper : SwalHelper) {
    this.form = new FormGroup({});
    this.createForm();
   }

  ngOnInit(): void {
  }

  public get invalidUsername() {

    return this.form.get('username')?.invalid && this.form.get('username')?.touched;

  }

  get invalidPassword(){

    return this.form.get('password')?.invalid && this.form.get('password')?.touched;

  }

  createForm(){

    this.form = this.fb.group({
      username : ['', Validators.required],
      password : ['', Validators.required],
    });

  }

  login(){

    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(ctrl => {
        ctrl.markAsTouched();
      });
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

    this.service.login(this.form.value).subscribe(
      ()=>{
        this.router.navigateByUrl('/home');
        this.swalHelper.fireToast(true , 'Inicio de sesión exitoso!');
      },error=>{
        if (error.status == 422){
          Swal.fire({
            icon : 'error',
            title : 'Datos incorrectos',
            text : 'Nombre de usuario y/o contraseña incorrectos',
            allowOutsideClick : false
          });
        }else{
          Swal.fire({
            icon : 'error',
            title : 'Ups!',
            text : 'Hubo un error con el servidor, pokeale a Andx o Eric',
            allowOutsideClick : false
          });
        }

    });
  }

}
