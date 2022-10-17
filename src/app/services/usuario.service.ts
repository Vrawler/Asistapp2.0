import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

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

  constructor(private router: Router) { }

  //métodos del CRUD:
  agregarUsuario(usuario): boolean{
    if ( this.obtenerUsuario(usuario.rut) == undefined ) {
      this.usuarios.push(usuario);
      return true;
    }
    return false;
  }
  eliminarUsuario(rut){
    this.usuarios.forEach((usu, index) => {
      if (usu.rut == rut) {
        this.usuarios.splice(index, 1);
      }
    });
  }
  modificarUsuario(usuario){
    var index = this.usuarios.findIndex(usu => usu.rut == usuario.rut);
    this.usuarios[index] = usuario;
  }
  obtenerUsuario(rut){
    return this.usuarios.find(usuario => usuario.rut == rut);
  }
  obtenerUsuarios(){
    return this.usuarios;
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
