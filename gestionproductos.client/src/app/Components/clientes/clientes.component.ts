import { Component } from '@angular/core';
import { Client } from 'src/app/Interfaces/Client';
import { ClientsService } from 'src/app/Services/clients.service';
import Swal from 'sweetalert2';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { ClienteModalComponent } from '../cliente-modal/cliente-modal.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
 public clientes: Client[] = [];

 displayedColumns: string[] = ['Id', 'Country', 'Name', 'Phone', 'Category', 'Actions'];
  dataSource = this.clientes;
  title = 'Evaluacion';
  name : string='';
  api: string ='http://localhost:5186/api';
  cliente! : Client;


  constructor(private clientService:ClientsService, public dialog: MatDialog ) {}

  ngOnInit() {
    this.GetClientsOrderedByCategory();
  }
  ngAfterOnInit(){
    this.dataSource=this.clientes;
  }

  GetClientsOrderedByCategory() {
    this.clientService.GetClientsOrderedByCategory().subscribe(
      (result) => {
        this.clientes=[];
        this.clientes = result.sort(x=>x.category!);;
       
      },
      (error) => {
        console.error(error);
      }
    );
  }
  GetClientsByNameOrderedByCategory() {
    const cliente:Client = {
      id:'0',
      country:'0',
      name: this.name
    }
    this.clientService.GetClientsByNameOrderedByCategory(cliente).subscribe(
      (result) => {
        this.clientes=[];
        this.clientes = result.sort(x=>x.category!);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  confirm (cliente:Client){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
       this.DeleteClient(cliente);
      }
    });
  }
  DeleteClient(cliente:Client){


    this.clientService.DeleteClient(cliente).subscribe(
      (result) => {
        Swal.fire({
          title: 'Exito!',
          text: 'Client Deleted',
          icon: 'success',
          confirmButtonText: 'Cool'
        });
        this.GetClientsOrderedByCategory();
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

  NewClient() {
    const dialogRef =  this.dialog.open(ClienteModalComponent, {
      data: {
        client: null ,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.GetClientsOrderedByCategory();
     });
  }
  UpdateClient(cliente:Client) {
    const dialogRef =  this.dialog.open(ClienteModalComponent, {
      data: {
        client: cliente ,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
     this.GetClientsOrderedByCategory();
    });
  }


  


}
