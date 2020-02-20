import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public db: AngularFirestore) { }

  user;

userRegister(uid){
    try{    
      //Check if this uid exist
    this.db.collection("users").snapshotChanges().subscribe(async snapshot => {
      let result = snapshot.map(snap => snap.payload.doc).filter(doc => doc.id == uid) //array
      if(result.length==0){
        //chua co nguoi dung
        this.user = {role:"normal"};
        await this.db.collection("users").doc(uid).set(this.user);
      }
      else{
        //da co user
        this.user = result[0].data;
      }
    })
  }
    catch(err){
        console.log(err);
    }

  }
}
