import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-confirm-sign-up',
  templateUrl: './confirm-sign-up.component.html',
  styleUrls: ['./confirm-sign-up.component.css']
})
export class ConfirmSignUpComponent implements OnInit {

  constructor(private  router : Router) { }

  username: string = '';
  confirmationCode: string = '';


  async confirmSignUp() {
    try {
     let result = await Auth.confirmSignUp(this.username, this.confirmationCode);
     if(result != null){
      this.router.navigate(["login"])
      alert("Usuario confirmado")
     }
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }

  ngOnInit(): void {
  }

}
