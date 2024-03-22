import { CanActivateFn } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';

export const clienteGuard: CanActivateFn = (route, state) => {
  const servicio= inject(AuthService)
  if(servicio.checkRole()&& localStorage.getItem('user_role')=='Cliente'){
     return true
  }else{
     return false
  }
};
