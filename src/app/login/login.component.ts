import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showNewPasswordFields: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  email: string = '';
  password: string = '';
  newPassword: string = '';
  requiredAttributes: boolean = false;

  //async signIn() {
  //  try {
  //    const user = await Auth.signIn(this.email, this.password);
  //    console.log('Usuario inició sesión:', user);
  //   let token = user.signInUserSession;
  //   if(token != null){
  //    this.router.navigate(["home"])
  //    alert("Login exitos")
  //   }
  //  } catch (error) {
  //    console.log('Error al iniciar sesión:', error);
  //    alert('Error al iniciar sesión:')
  //  }
  //}
  async signIn() {
    try {
      const user = await Auth.signIn(this.email, this.password);
      console.log({user})
  
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        // Mostrar campos de nueva contraseña y atributos requeridos
        this.showNewPasswordFields = true;
        this.requiredAttributes = user.challengeParam.requiredAttributes;
        
        // Asegurarse de que la nueva contraseña no esté vacía
        if (!this.newPassword || this.newPassword.trim() === '') {
          console.log('La nueva contraseña no puede estar vacía.');
          return;
        }
  
        // Completar el proceso de nueva contraseña
        const loggedInUser = await Auth.completeNewPassword(
          user,
          this.newPassword,
          this.requiredAttributes
        );
  
        alert('Usuario inició sesión y cambió la contraseña:');
      } else {
        alert('Usuario inició sesión:');
      }
  
      // Resto del código de manejo del inicio de sesión
      let token = user.signInUserSession;
      if (token != null) {
        this.router.navigate(["admin"]);
        alert("Inicio de sesión exitoso");
      }
    } catch (error) {
      console.log('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión:');
    }
  }  
}




