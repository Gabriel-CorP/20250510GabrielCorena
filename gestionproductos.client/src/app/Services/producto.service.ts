import { Injectable } from '@angular/core';
import { Producto } from '../Interfaces/iproducto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../Interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

 api: string ='http://localhost:5101/api/Producto/'
  Productoes: Producto[]=[];
  constructor(private http: HttpClient) {}

  GetProductos():Observable<GenericResponse<Producto[]>> {
    return this.http.get<GenericResponse<Producto[]>>(this.api+'GetProductos');
  }
  GetProductoById( id : number):Observable<GenericResponse<Producto[]>> {
    return  this.http.get<GenericResponse<Producto[]>>(this.api+'GetProductoById/'+id)
    
  }
  PostProducto(Producto : Producto):Observable<GenericResponse<Producto>>{
  return  this.http.post<GenericResponse<Producto>>(this.api+'PostProducto', Producto)
  }
  PutProducto(Producto : Producto):Observable<GenericResponse<Producto>>{
    return  this.http.put<GenericResponse<Producto>>(this.api+'PutProducto', Producto)
  }
  DeleteProducto(Productoe:Producto):Observable<GenericResponse<Producto>>{
    console.log(Productoe);
    return  this.http.delete<GenericResponse<Producto>>(this.api+'DeleteProducto/'+Productoe.id)
  }
}
