import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formGroup = new FormGroup({
    inputEmail: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    
    inputPassword: new FormControl('', [
      Validators.required,
     // Validators.minLength(),
      // Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
    ])
    

   });
  

  constructor(private loginService: LoginService) { }

  loginSubmittedResponse = '';

  loginSubmittedResponse$ = this.loginService.loginSubmittedResponse$;

  onSubmit(){
    const { inputEmail, inputPassword } = this.formGroup.value;
    this.loginService.dispatch({
      email: inputEmail!,
      password: inputPassword!,
    })
   console.log('logado')
  }




    
 
}
