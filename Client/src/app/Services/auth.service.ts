import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../Interface/usuario';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url:string= "http://localhost:8000/api/"

  constructor( private http:HttpClient,private router: Router) { }

  register(user: Usuario) {
     return this.http.post<{token: string,role:string,user:Usuario}>(this.url+'auth/register', user);
  }

  login(user:Usuario){
    return this.http.post<{token: string,role:string}>(this.url+'auth/login', user)
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          localStorage.setItem('user_role', result.role);
           if(result.role=='Admin'){
              this.router.navigate(['/Admin']);
           }if(result.role=='Dependiente'){
              this.router.navigate(['/Dependiente']);
           }if(result.role=='Cliente'){
              this.router.navigate(['/Clientes']);
           }
        })
      );
  }

  logout() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.url+'logout', {}, { headers })
      .pipe(
        map(() => {
          localStorage.removeItem('access_token');
          localStorage.removeItem('user_role')
          this.router.navigate(['']);
          return true;
        })
      );
}

    // private isLoggedIn = new BehaviorSubject<boolean>(false);

    // get loggedIn() {
    //   return this.isLoggedIn.asObservable();
    // }

    // loginG() {
    //   this.isLoggedIn.next(true);
    // }

    // logoutG() {
    //   this.isLoggedIn.next(false);
    // }


    checkAuthentication():Observable<boolean> {
      if(!localStorage.getItem('access_token')){
        this.router.navigate([''])
        return of(false)
      }else{

        return of(true)
      }
    }

    checkRole():Observable<boolean>{
      const role =localStorage.getItem('user_role') ?? '{}';
      const token = localStorage.getItem('access_token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('rolFront',role);

      return this.http.get<boolean>(this.url+'verificarRole', {headers})
    }

    logUser():Observable<string>{
      const token = localStorage.getItem('access_token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      return this.http.get<string>(this.url+'getAuthUser', {headers})

    }

    delete(user:number){
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'id':user
      });

       return this.http.delete<Usuario>(this.url+ "destroyUser",  {headers})
    }

    public modificarUser(user:Usuario){
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      });

       return this.http.put<Usuario>(this.url+'modificarUser', user ,  {headers})
     }

     public getUser(){
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      });

      return this.http.get<Usuario[]>(this.url+"getUser", {headers})
    }

}
