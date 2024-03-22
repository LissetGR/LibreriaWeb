import { CanActivateFn } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Observable, map, tap } from 'rxjs';
import { inject } from '@angular/core';

export const rolesGuard: CanActivateFn = (route, state) => {
  const servicio= inject(AuthService)
   if(servicio.checkRole()==localStorage.getItem('user_role')){
      return true
   }else{
      return false
   }
};
