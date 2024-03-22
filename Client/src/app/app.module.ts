import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MessagesModule } from "primeng/messages";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DependienteComponent } from './dependiente/dependiente.component';
import { ClienteComponent } from './cliente/cliente.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ModuloModule } from './Module/modulo.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServicioHttpService } from './Services/servicio-http.service';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
    DependienteComponent,
    ClienteComponent,
    AdminComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModuloModule,
    HttpClientModule,
    MessagesModule,
  ],
  providers: [ServicioHttpService,MessageService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
