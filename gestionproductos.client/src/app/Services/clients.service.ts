import { Injectable } from '@angular/core';
import { Client } from '../Interfaces/Client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClientsService {
api: string ='http://localhost:5186/api/Clients/'
  clientes: Client[]=[];
  constructor(private http: HttpClient) {}

  GetClientsOrderedByCategory():Observable<Client[]> {
    return this.http.get<Client[]>(this.api+'GetClientsOrderedByCategory');
  }
  GetClientsByNameOrderedByCategory( cliente:Client):Observable<Client[]> {
    return  this.http.post<any>(this.api+'GetClientsByNameOrderedByCategory', cliente)
    
  }
  PostClient(cliente : Client):Observable<any>{
  return  this.http.post<any>(this.api+'PostClient', cliente)
  }
  PutClient(cliente : Client):Observable<any>{
    return  this.http.put<any>(this.api+'PutClient', cliente)
  }
  DeleteClient(cliente:Client):Observable<any>{
    return  this.http.delete<any>(this.api+'DeleteClient/'+cliente.id+'/'+cliente.country)
  }
}
