import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

formGroup = new FormGroup({
  inputName: new FormGroup('', Validators.required),
  inputPassword: new FormGroup('', Validators.required)

})




  
}
