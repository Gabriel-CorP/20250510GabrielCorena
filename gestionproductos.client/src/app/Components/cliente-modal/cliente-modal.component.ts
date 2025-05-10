import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/app/Interfaces/Client';
import { ClientsService } from 'src/app/Services/clients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-modal',
  templateUrl: './cliente-modal.component.html',
  styleUrls: ['./cliente-modal.component.css']
})
export class ClienteModalComponent {

  title : string='New Client'
  clientForm: FormGroup;
  categories = [
    { value: 1, viewValue: 'Category 1' },
    { value: 2, viewValue: 'Category 2' },
    { value: 3, viewValue: 'Category 3' }
  ];
constructor(private fb: FormBuilder, 
            private clientService:ClientsService, 
            public dialogRef: MatDialogRef<ClienteModalComponent>,
           @Inject(MAT_DIALOG_DATA) public data: any) {

  this.clientForm = this.fb.group({
    id: ['', Validators.required],
    country: ['', Validators.required],
    name: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required]],
    category: ['', Validators.required]
  });

  if(data.client){
    this.title='Modify Client';
    this.clientForm.patchValue(data.client);
    this.clientForm.get('id')?.disable();
    this.clientForm.get('country')?.disable();
  }
}

onSubmit(): void {
  if (this.clientForm.valid) {
    const clientData: Client = this.clientForm.getRawValue();
    if(this.data.client){
      this.PutClient(clientData);
    }else{
      this.PostClient(clientData);
    }
    
  
  } else {
    this.clientForm.markAllAsTouched();
  }
}

  PostClient(cliente:Client){
    this.clientService.PostClient(cliente).subscribe(
      (result) => {
        Swal.fire({
          title: 'Exito!',
          text: 'Client has been saved',
          icon: 'success',
          confirmButtonText: 'Cool'
        });
        this.CloseModal();
      },
      (error) => {
         Swal.fire({
                  title: 'Error!',
                  text: 'An error has occurred '+ error.error,
                  icon: 'error',
                  confirmButtonText: 'Ok'
                });
        console.error(error);
      }
    );
  }
  PutClient(cliente:Client){
    this.clientService.PutClient(cliente).subscribe(
      (result) => {
        Swal.fire({
          title: 'Exito!',
          text: 'Client has been modified',
          icon: 'success',
          confirmButtonText: 'Cool'
        });
        this.CloseModal();
      },
      (error) => {
         Swal.fire({
                  title: 'Error!',
                  text: 'An error has occurred',
                  icon: 'error',
                  confirmButtonText: 'Ok'
                });
        console.error(error);
      }
    );
  }
  CloseModal(): void {
    this.dialogRef.close();
  }
}
