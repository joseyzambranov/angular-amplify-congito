import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-amplify-congito';

  constructor(private router: Router) {}

  async signOut() {
    try {
      await Auth.signOut();
      console.log('Usuario cerró sesión');
      this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
    } catch (error) {
      console.log('Error al cerrar sesión:', error);
    }
  }
}
