import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Libro } from '../Interface/libros';
import { Usuario } from '../Interface/usuario';
import { venta } from '../Interface/venta';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioHttpService {

  private url:string= "http://localhost:8000/api/"


  constructor(private http: HttpClient) { }

  // Libro

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

   public getLibros(){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.http.get<Libro[]>(this.url+"getLibros", {headers})
  }

  //  Venta

  public getVenta(){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.http.get<venta[]>(this.url+"getVentas", {headers})
  }

   public deleteVenta(venta:number){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      'id':venta
    });

    return this.http.delete<venta>(this.url+ "destroyVenta",  {headers})
   }

   public modificarVenta(venta:venta){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    });

     return this.http.put<venta>(this.url+'modificarVenta', venta,  {headers})
   }

   public postVenta(venta: venta){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    });
     return this.http.post<venta>(this.url+"createVenta", venta ,  {headers})
  }

  public buscarVentas(cadena:string){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      'cadena': cadena
    });
     return this.http.get<venta[]>(this.url+"getVentasFilter",  {headers})
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
       // Error del lado del cliente o de la red
       errorMessage = `Error: ${error.error.message}`;
    } else {
       // El backend devolvió un código de estado que no está en el rango de 200-299
       errorMessage = `Error Código: ${error.status}, Mensaje: ${error.message}`;
    }
    return throwError(errorMessage);
   }
}
