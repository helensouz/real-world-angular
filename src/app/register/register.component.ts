import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { RegisterService } from '../services/register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(
    
     private router : Router,
     private formBuilder: FormBuilder,
     private registerService: RegisterService
     ) { }


      formGroup = new FormGroup({
      emailRegister: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      username: new FormControl('', [
        Validators.required,
        ]),

      
      passwordRegister: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ])     
     });


     registerSubmittedResponse = '';

     registerSubmittedResponse$ = this.registerService.registerSubmittedResponse$


     onSubmitRegister(){
      const {emailRegister, passwordRegister, username} = this.formGroup.value;
      this.registerService.dispatch({
        email: emailRegister!,
        password: passwordRegister!,
        username: username!
      })
      this.router.navigate(['homeLogado'])
     }


    
  ngOnInit(): void {
  }



}
