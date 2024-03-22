import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClienteComponent } from './cliente/cliente.component';
import { DependienteComponent } from './dependiente/dependiente.component';
import { AdminComponent } from './admin/admin.component';
import { loginGuard } from './Guards/login.guard';
import { clienteGuard } from './Guards/cliente.guard';
import { adminGuard } from './Guards/admin.guard';
import { dependienteGuard } from './Guards/dependiente.guard';

const routes: Routes = [
  {path: '' , component: LoginComponent},
  {path: 'Clientes' , component: ClienteComponent, canActivate: [loginGuard, clienteGuard]},
  {path: 'Dependiente' , component: DependienteComponent, canActivate: [loginGuard,dependienteGuard]},
  {path: 'Admin' , component: AdminComponent, canActivate: [loginGuard,adminGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
