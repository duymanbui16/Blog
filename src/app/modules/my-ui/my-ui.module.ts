import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { SignInComponent } from './components/sign-in/sign-in.component';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';




@NgModule({
  declarations: [NavBarComponent, SignInComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports:[
    NavBarComponent,
    SignInComponent
  ]
})
export class MyUiModule { }
