import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestService {

  constructor(private fire: AngularFirestore) { }

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
}
