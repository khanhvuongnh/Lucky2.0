import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }
  success(title?: string, text?: string) {
    Swal.fire({
      title,
      text,
      icon: 'success',
      // showConfirmButton: false
    });
  }

  error(title?: string, text?: string) {
    Swal.fire({
      title,
      text,
      icon: 'error',
      // showConfirmButton: false
    });
  }

  warning(title?: string, text?: string) {
    Swal.fire({
      title,
      text,
      icon: 'warning',
      // showConfirmButton: false
    });
  }

  message(title?: string, text?: string) {
    Swal.fire({
      title,
      text,
      icon: 'info',
      // showConfirmButton: false
    });
  }

  confirm(title: string, text: string, okCallback: () => any) {
    Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        okCallback();
      } else if (result.dismiss === Swal.DismissReason.cancel) { }
    });
  }

  update(title: string, text: string) {
    Swal.fire({
      showConfirmButton: false,
      title,
      text,
      icon: 'info',
      timer: 2000,
      timerProgressBar: true,
    });
  }
}
