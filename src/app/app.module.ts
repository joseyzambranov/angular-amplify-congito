import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { Amplify , Auth } from 'aws-amplify';
import awsconfig from './../aws-exports';
import { ConfirmSignUpComponent } from './confirm-sign-up/confirm-sign-up.component';
import { AuthGuard } from 'src/guards/auth.guard';
import { NewPasswordComponent } from './new-password/new-password.component';
import { AdminComponent } from './admin/admin.component';
Amplify.configure({
Auth:{
  /*
  mandatorySignIn:true,
  region:"us-east-1",
  userPoolId:"us-east-1_ftIepzPS9",
  userPoolWebClientId:"1d57e508-dfdd-416c-ab03-ddb6e60eff07",
  authenticationFlowType:"USER_PASSWORD_AUTH"
*/
identityPoolId: awsconfig.aws_cognito_identity_pool_id,
region: awsconfig.aws_cognito_region,
userPoolId: awsconfig.aws_user_pools_id,
userPoolWebClientId: awsconfig.aws_user_pools_web_client_id,
authenticationFlowType: 'USER_SRP_AUTH'

}
})

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    ConfirmSignUpComponent,
    NewPasswordComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
