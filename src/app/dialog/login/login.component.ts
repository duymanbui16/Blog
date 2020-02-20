import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators,ValidatorFn, FormsModule, AbstractControl} from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';
import { async } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginComponent>, 
    public afAuth: AngularFireAuth, public snackbar: MatSnackBar,
    public user: UsersService, public afs: AngularFirestore) { }
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

  signUp() {
    if (this.password.value != this.retypedPassword.value) {
      this.snackbar.open("Retyped password does not match", "OK", { duration: 2000 });
      return;
    }
    this.afAuth.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
      .then(() => {
        this.snackbar.open("Sign up sucessfully", "OK", { duration: 2000 });
        this.email.reset()
        this.password.reset();
        this.retypedPassword.reset();
      }).catch((err) => {
        this.snackbar.open(err, "OK", { duration: 2000 });
      });
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
      .then(async() => {
        await this.user.userRegister(this.afAuth.auth.currentUser.uid)
        this.snackbar.open("Login successful", "OK", { duration: 2000 });
        this.dialogRef.close();
      }).catch((err) => {
        this.snackbar.open(err, "OK", { duration: 2000 });
      });
  }


  // login() {
  //   this.afAuth.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
  //     .then(() => {
  //       this.snackbar.open("Login successful", "OK", { duration: 2000 });
  //       this.dialogRef.close();
  //     }).catch((err) => {
  //       this.snackbar.open(err, "OK", { duration: 2000 });
  //     });
  // }

  // async login() {
  //   const credetial = await this.afAuth.auth.signInWithEmailAndPassword(this.email.value, this.password.value);
  //     return this.user.userRegister(credetial.user.uid).then(() => {
  //       this.snackbar.open("Login successful", "OK", { duration: 2000 });
  //       this.dialogRef.close();
  //     }).catch((err) => {
  //       this.snackbar.open(err, "OK", { duration: 2000 });
  //     });
  // }

  loginWithGoogle(){
    const provider = new auth.GoogleAuthProvider
    this.afAuth.auth.signInWithPopup(provider)
    .then(async ()=>{
    await this.user.userRegister(this.afAuth.auth.currentUser.uid)
    this.snackbar.open("Login sucessfully", "OK", { duration: 2000 })}
    )
    .catch((err)=>{
      this.snackbar.open(err, "OK", { duration: 2000 });
    })
  }

  // loginWithGoogle(){
  //   const provider = new auth.GoogleAuthProvider
  //   this.afAuth.auth.signInWithPopup(provider).then(()=>
  //   this.snackbar.open("Login sucessfully", "OK", { duration: 2000 })).catch((err)=>{
  //     this.snackbar.open(err, "OK", { duration: 2000 });
  //   })
  // }


  ngOnInit() {
  }

}
