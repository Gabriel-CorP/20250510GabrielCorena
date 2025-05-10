import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Form, FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductoModalComponent } from './Components/producto-modal/producto-modal.component';
import { ProductosComponent } from './Components/productos/productos.component'; 


@NgModule({
  declarations: [
    AppComponent,
    ProductoModalComponent,
    ProductosComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, BrowserAnimationsModule,
    FormsModule, 
      MatButtonModule, MatInputModule,
       MatTableModule, MatFormFieldModule,
       MatDialogModule,MatSelectModule,MatCardModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
