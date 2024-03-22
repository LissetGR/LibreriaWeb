import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Libro } from '../Interface/libros';
import { Usuario } from '../Interface/usuario';
import { venta } from '../Interface/venta';

@Injectable({
  providedIn: 'root'
})
export class ServicioHttpService {

  private url:string= "http://localhost:8000/api/"


  constructor(private http: HttpClient) { }

  // Gets
  public getLibros(){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.http.get<Libro[]>(this.url+"getLibros", {headers})
  }

  public getUser(){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.http.get<Usuario[]>(this.url+"getUser", {headers})
  }

  public getVenta(){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.http.get<venta[]>(this.url+"getVentas", {headers})
  }

  public getRecomendados(){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.http.get<Libro[]>(this.url+"getRecomendados", {headers})
  }

  public getBusqueda(cadena:string){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      'cadena': cadena
    });

    return this.http.get<Libro[]>(this.url+"getBusqueda", {headers})
  }


  // Post

  public postLibro(libro: Libro){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    });
     return this.http.post<Libro>(this.url+"createLibro", libro ,  {headers})
  }

  public modificarLibro(libro:Libro){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    });

     return this.http.put<Libro>(this.url+'modificarLibro', libro ,  {headers})
   }

   public deleteLibro(libro:number){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      'id':libro
    });

     return this.http.delete<Libro>(this.url+ "destroyLibro",  {headers})
   }
}
