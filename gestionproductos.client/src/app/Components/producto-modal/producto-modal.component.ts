import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from 'src/app/Interfaces/iproducto';
import { ProductoService } from 'src/app/Services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-modal',
  templateUrl: './producto-modal.component.html',
  styleUrls: ['./producto-modal.component.css']
})
export class ProductoModalComponent {
title : string='New producto'
  productoForm: FormGroup;
  categories = [
    { value: 1, viewValue: 'Category 1' },
    { value: 2, viewValue: 'Category 2' },
    { value: 3, viewValue: 'Category 3' }
  ];
constructor(private fb: FormBuilder, 
            private productoService:ProductoService, 
            public dialogRef: MatDialogRef<ProductoModalComponent>,
           @Inject(MAT_DIALOG_DATA) public data: any) {

  this.productoForm = this.fb.group({
      id: [null],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: [''],
      precioBase: [0, [Validators.required, Validators.min(0)]],
      precioDescuento: [null, [Validators.min(0)]],
      imagen: ['', Validators.pattern(/https?:\/\/.+/)]
    });

  if(data.producto){
    this.title='Modificar producto';
    this.productoForm.patchValue(data.producto);
  }
}

onSubmit(): void {
  if (this.productoForm.valid) {
    const productoData: Producto = this.productoForm.getRawValue();
    if(this.data.producto){
      this.Putproducto(productoData);
    }else{
      this.Postproducto(productoData);
    }
    
  
  } else {
    this.productoForm.markAllAsTouched();
  }
}

  Postproducto(Producto:Producto){
    this.productoService.PostProducto(Producto).subscribe(
      (result) => {
        if(result.code==0){
           Swal.fire({
                  title: 'Error!',
                  text: result.message,
                  icon: 'error',
                  confirmButtonText: 'Ok'
                });
        }else{
      Swal.fire({
          title: 'Exito!',
          text: 'producto guardado con exito',
          icon: 'success',
          confirmButtonText: 'Cool'
        });
        this.CloseModal();
        }
       
      },
      (error) => {
         Swal.fire({
                  title: 'Error!',
                  text: 'Ha ocurrido un error '+ error.error,
                  icon: 'error',
                  confirmButtonText: 'Ok'
                });
        console.error(error);
      }
    );
  }
  Putproducto(Producto:Producto){
    this.productoService.PutProducto(Producto).subscribe(
      (result) => {
        if(result.code==0){
           Swal.fire({
                  title: 'Error!',
                  text: result.message,
                  icon: 'error',
                  confirmButtonText: 'Ok'
                });
        }else{
        Swal.fire({
          title: 'Exito!',
          text: 'producto modificado',
          icon: 'success',
          confirmButtonText: 'Cool'
        });
        this.CloseModal();
       }
      },
      (error) => {
         Swal.fire({
                  title: 'Error!',
                  text: 'Ha ocurrido un error',
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
