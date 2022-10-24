import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //Json usuarios y crud
  
  usuarios: any[] = [];
  usuario: any;

  //Variable que confirma si existe o no una sesión activa
  isAutenticated= new BehaviorSubject(false);

  constructor(private router: Router, private storage: Storage) {
    storage.create();
  }

  //métodos del CRUD (actualizado con storage, 17/10/22):
  async agregarUsuario(key, usuario){
    this.usuarios = await this.storage.get(key) || [];

    var datoFind = await this.obtenerUsuario(key, usuario.rut);
    if(datoFind == undefined){
      this.usuarios.push(usuario);
      await this.storage.set(key, this.usuarios);
      return true;
    }
    return false;
  }

  async obtenerUsuario(key, rut){
    this.usuarios = await this.storage.get(key) || [];
    this.usuario = await this.usuarios.find(usuario => usuario.rut == rut);
    return this.usuario;
  }

  async obtenerUsuarios(key){
    this.usuarios = await this.storage.get(key) || [];
    return this.usuarios;

    /* this.storage.get(key).then(       -----otra forma, pero da errores al ser async---
      datosStorage => {
        if(datosStorage.edad > 17){
          this.datos.push(datosStorage)
        }
      }
    ) */
  }

  async eliminarUsuario(key, rut){
    this.usuarios = await this.storage.get(key) || [];

    this.usuarios.forEach((value, index) => {
      if(value.rut == rut){
        this.usuarios.splice(index, 1);
      }  
    });

    await this.storage.set(key, this.usuarios);
  }

  async modificarUsuario(key, usuario){
    this.usuarios = await this.storage.get(key) || [];
    
    var index = this.usuarios.findIndex(value => value.rut == usuario.rut);
    this.usuarios[index] = usuario;

    await this.storage.set(key, this.usuario);
  }


  //MÉTODOS CUSTOMER:
  validarRutPassword(rut, pass){
    return this.usuarios.find(u => u.rut == rut && u.password == pass);
  }

  validarCorreorpw(email){
    return this.usuarios.find(u => u.email == email)
  }

  //Métodos customer para login, logout y revisar si está conectado
  async loginUsuario(key, email, password){
    this.usuarios = await this.storage.get(key) || [];
    var usuarioLogin = this.usuarios.find(usu => usu.email == email && usu.password == password);
    if(usuarioLogin != undefined){
      this.isAutenticated.next(true);
      return usuarioLogin;
    }
  }

  //Método para el guard (dentro de lo anterior)
  getAuth(){
    return this.isAutenticated.value;
  }

  logOut(){
    this.isAutenticated.next(false);
    this.router.navigate(['/login'])
  }
}
