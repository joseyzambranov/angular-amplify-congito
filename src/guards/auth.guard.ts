import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    try {
      const user = await Auth.currentAuthenticatedUser();

      // Verificar los roles o grupos del usuario
      const userGroups = user.signInUserSession.accessToken.payload['cognito:groups'];

      if (userGroups.includes('admin')) {
        // El usuario pertenece al grupo 'admin', permitir el acceso a rutas 'admin' y 'home'
        return true;
      } else if (userGroups.includes('asesor')) {
        if (next.routeConfig?.path === 'admin') {
          // Si el usuario es un 'asesor', no permitir acceso a la ruta 'admin'
          this.router.navigate(['/home']);
          return false;
        } else {
          // El usuario pertenece al grupo 'asesor', permitir el acceso solo a la ruta 'home'
          return true;
        }
      } else {
        // El usuario no tiene los roles requeridos, redirigir
        this.router.navigate(['/login']);
        return false;
      }
    } catch (error) {
      this.router.navigate(['/login']);
      return false;
    }
  }
}