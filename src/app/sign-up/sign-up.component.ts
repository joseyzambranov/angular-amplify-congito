import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  username: string = '';
  email: string = '';
  password: string = '';

  async signUp() {
    try {
      const user = await Auth.signUp({
        username: this.email,
        password: this.password,
        attributes: {
          email: this.email
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });
      alert("Usuario registrado correctamente")
      this.router.navigate(["confirm-sign-up"])
    } catch (error) {
      console.log('Error al registrarse:', error);
    }
  }

}
