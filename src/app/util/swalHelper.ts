import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable()
export class SwalHelper {


  fireToast(success : boolean, text : string){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
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

  showLoading( title : string , text : string ) {
    Swal.fire({
      icon : 'info',
      title : title,
      text : text,
      allowOutsideClick : false,
      timer : 10000
    });
    Swal.showLoading();
  }

}
