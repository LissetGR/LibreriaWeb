import { Component } from '@angular/core';
import { Usuario } from '../Interface/usuario';
import { AuthService } from '../Services/auth.service';
import { MessageService } from 'primeng/api';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription, filter, of } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  name:string=' '


  constructor(private servicio: AuthService,private  messageService: MessageService,private router:Router ){

    this.servicio.logUser().subscribe(
      (response)=>{
        this.name=response
      },
      (error)=>{
        this.show('error', 'Error', 'Ha ocurrido un error al mostrar su informacion')
      }
    )

  }


  public logout(){
     this.servicio.logout().subscribe(
      (response)=>{
         this.show('success', 'Éxito', 'Usted ha cerrado sesión correctamente')
      },
      (error)=>{
        this.show('error', 'Error', 'Ha ocurrido un error al cerrar su sesión')
      }
     )
  }

  show(severityP: string, summaryP:string, contenido:string) {
    this.messageService.add({ severity: severityP, summary: summaryP, detail: contenido });
  }


}
