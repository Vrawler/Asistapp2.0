import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //Usuarios predeterminados para el C.R.U.D
  
  usuarios: any[] = [
    {
      rut: '1.111.111-1',
      nom_com: 'Mitsuoyoshi Anzai',
      email:'mit.anzai@duoc.cl',
      fec_nac: '1950-08-03',
      semestre: 'No aplica',
      password: 'blanco',
      tipo_usuario: 'administrador'
    },
    {
      rut: '10.123.456-7',
      nom_com: 'Rick Sánchez',
      email:'ri.sanch@profesor.duoc.cl',
      fec_nac: '1975-07-19',
      semestre: 'No aplica',
      password: 'szechuan',
      tipo_usuario: 'profesor'
    },
    {
      rut: '90.563.153-k',
      nom_com: 'Marty McFly',
      email:'mar.mcfly@duocuc.cl',
      fec_nac: '2022-01-27',
      semestre: '1',
      password: 'delorean',
      tipo_usuario: 'alumno'
    }
  ];

  //Variable que confirma si existe o no una sesión activa
  isAutenticated= new BehaviorSubject(false);

  constructor(private router: Router, private storage: Storage) {
    storage.create();
  }

  //métodos del CRUD (actualizado con storage, 17/10/22):
  async agregarUsuario(usuario, key){
    this.usuarios = await this.storage.get(key) || [];

    var datoFind = await this.obtenerUsuario(key, usuario.rut);
    if(datoFind == undefined){
      this.usuarios.push(usuario);
      await this.storage.set(key, this.usuarios);
      return true;
    }
    return false;
  }

  async obtenerUsuario(rut, key){
    this.usuarios = await this.storage.get(key) || [];
    return this.usuarios.find(usuario => usuario.rut == rut);
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

  async eliminarUsuario(rut, key){
    this.usuarios = await this.storage.get(key) || [];

    this.usuarios.forEach((value, index) => {
      if(value.rut == rut){
        this.usuarios.splice(index, 1);
      }  
    });

    await this.storage.set(key, this.usuarios);
  }

  async modificarUsuario(usuario, key){
    this.usuarios = await this.storage.get(key) || [];
    
    var index = this.usuarios.findIndex(value => value.rut == usuario.rut);
    this.usuarios[index] = usuario;

    await this.storage.set(key, this.usuarios);
  }


  //MÉTODOS CUSTOMER:
  validarRutPassword(rut, pass){
    return this.usuarios.find(u => u.rut == rut && u.password == pass);
  }

  validarCorreorpw(email){
    return this.usuarios.find(u => u.email == email)
  }

  //Métodos customer para login, logout y revisar si está conectado
  loginUsuario(email, password){
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
