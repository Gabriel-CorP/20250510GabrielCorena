import { Component } from '@angular/core';
import { Producto } from 'src/app/Interfaces/iproducto';
import { ProductoService } from 'src/app/Services/producto.service';
import Swal from 'sweetalert2';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { ProductoModalComponent } from '../producto-modal/producto-modal.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
public productos: Producto[] = [];

  title = 'Evaluacion';
  name : string='';
  producto! : Producto;


  constructor(private ProductoService:ProductoService, public dialog: MatDialog ) {}

  ngOnInit() {
    this.GetAll();
  }


  GetAll() {
    this.ProductoService.GetProductos().subscribe(
      (result) => {
        this.productos=[];
        this.productos = result.model;
       
      },
      (error) => {
        console.error(error);
      }
    );
  }
  GetbyId(id : number) {
   
    this.ProductoService.GetProductoById(id).subscribe(
      (result) => {
      
        this.producto = result.model.find(x=> x.id==id)! ;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  confirm (Productoe:Producto){
    Swal.fire({
      title: "Advertencia",
      text: "Estas seguro que quieres eliminar este registro!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminalo",
      cancelButtonText:"Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
       this.DeleteProducto(Productoe);
      }
    });
  }
  DeleteProducto(Productoe:Producto){


    this.ProductoService.DeleteProducto(Productoe).subscribe(
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
          text: 'Producto Eliminado',
          icon: 'success',
          confirmButtonText: 'Cool'
        });
        this.GetAll();
      }
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

  NewProducto() {
    const dialogRef =  this.dialog.open(ProductoModalComponent, {
      data: {
        producto: null ,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.GetAll();
     });
  }
  UpdateProducto(Productoe:Producto) {
    const dialogRef =  this.dialog.open(ProductoModalComponent, {
      data: {
        producto: Productoe ,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
     this.GetAll();
    });
  }

}
