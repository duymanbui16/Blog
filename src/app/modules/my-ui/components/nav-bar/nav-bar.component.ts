import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/dialog/login/login.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

clickLogin(){
  this.dialog.open(LoginComponent,{
    width: '25vw',
    height:'60vh'
   
  })
}

  ngOnInit() {
  }

}
