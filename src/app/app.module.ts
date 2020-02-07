import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './dialog/login/login.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MyUiModule } from './modules/my-ui/my-ui.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {AngularFireModule} from '@angular/fire'
import {AngularFireAuthModule} from '@angular/fire/auth'
import { environment } from '../environments/environment';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MyUiModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent]
})
export class AppModule { }
