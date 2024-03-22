import { CanActivateFn } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';

export const dependienteGuard: CanActivateFn = (route, state) => {
  const servicio= inject(AuthService)
  if(servicio.checkRole()&& localStorage.getItem('user_role')=='Dependiente'){
     return true
  }else{
     return false
  }
};
