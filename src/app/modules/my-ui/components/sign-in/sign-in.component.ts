import { Component, OnInit } from '@angular/core';
import { ValidatorFn, AbstractControl, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor() { }
  email = new FormControl('', [Validators.required, Validators.email]);
  password=new FormControl('',[Validators.required, Validators.minLength(8)]);
  retypedPassword = new FormControl('', [Validators.required, this.passwordDoesntMatch(this.password.value)]);
  
  

  getErrorEmail() {
    return this.email.hasError('required') ? 'You must enter an email' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  getErrorPassword() {
    return this.password.hasError('required') ? 'You must enter a password' :
        this.password.hasError('password') ? 'Your password need at least 8 characters' :
            '';
  }

  getErrorRetypedPassword() {
    return this.email.hasError('required') ? 'You must retype a password' :
        this.email.hasError('email') ? 'Retyped incorrect' :
            '';
  }

  passwordDoesntMatch(input: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = (input == control.value)
      return forbidden ? { 'passwordDoesntMatch': { value: control.value } } : null;
    };
  }
  ngOnInit() {
  }

}
