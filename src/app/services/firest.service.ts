import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class FirestService {

  isAutenticated = new BehaviorSubject(false);

  constructor(private fire: AngularFirestore, private router: Router) { }

  //Métodos para firebase 
  addFire(coleccion, value){
    try {
      this.fire.collection(coleccion).add(value);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getDatosFire(coleccion){
    try {
      return this.fire.collection(coleccion).snapshotChanges();
    } catch (error) {
      console.log(error);
    }
  }

  getDatoFire(coleccion, id){
    try {
      return this.fire.collection(coleccion).doc(id).get();
    } catch (error) {
      console.log(error);
    }
  }

  deleteFire(coleccion, id){
    try {
      this.fire.collection(coleccion).doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  }

  updateFire(coleccion, id, value){
    try {
      this.fire.collection(coleccion).doc(id).set(value);
    } catch (error) {
      console.log(error);
    }
  }

  getAuthFire(){
    return this.isAutenticated.value;
  }

  logOut(){
    this.isAutenticated.next(false);
    this.router.navigate(['/login'])
  }

  loginFire(email, password, coleccion): boolean{
    for(let u of coleccion){
      if(u.email == email && u.password== password){
        return true;
      }
    }
    return false;
  }

  async addAsignatura(coleccion, value){
    try {
      var asig = this.fire.collection(coleccion).add(value);
      return asig
    } catch (error) {
      console.log(error);
    }
  }
}