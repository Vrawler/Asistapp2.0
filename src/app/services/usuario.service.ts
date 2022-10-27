import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //Variables para usuario}
  usuarios: any[] = [];
  usuario: any;

  //Variables asignaturas
  asignaturas: any[] = [];
  asig: any;

  //Variables asistencia
  asistencias: any [] = [];
  asist: any;


  //Variable que confirma si existe o no una sesión activa
  isAutenticated= new BehaviorSubject(false);

  constructor(private router: Router, private storage: Storage) {
    storage.create();
  }

  //métodos del CRUD de usuario (actualizado con storage, 17/10/22):
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

  //Método cerrar sesión
  logOut(){
    this.isAutenticated.next(false);
    this.router.navigate(['/login'])
  }

  /*-----------------------------------------------------------------------------------------------------------------
  -------------------------------------------------------------------------------------------------------------------
  -----------------------------------------------------------------------------------------------------------------*/

  //Método CRUD de las asignaturas

  async agregarAsignatura(key, asig){
    this.asignaturas = await this.storage.get(key) || [];

    var datoFind = await this.obtenerAsignatura(key, asig.cod_asig);
    if(datoFind == undefined){
      this.asignaturas.push(asig);
      await this.storage.set(key, this.asignaturas);
      return true;
    }
    return false;
  }

  //Obtener una asignatura
  async obtenerAsignatura(key, cod_asig){
    this.asignaturas = await this.storage.get(key) || [];
    this.asig = await this.asignaturas.find(asig => asig.cod_asig == cod_asig);
    return this.asig;
  }

  //Obtener todas las asignaturas

  async obtenerAsignaturas(key){
    this.asignaturas = await this.storage.get(key) || [];
    return this.asignaturas;
  }

  //Método eliminar asignatura
  async eliminarAsig(key, cod_asig){
    this.asignaturas = await this.storage.get(key) || [];

    this.asignaturas.forEach((value, index) => {
      if(value.cod_asig == cod_asig){
        this.asignaturas.splice(index, 1);
      }  
    });
    await this.storage.set(key, this.usuarios);
  }

  //Método modificar asignatura
  async modificarAsignatura(key, asig){
    this.asignaturas = await this.storage.get(key) || [];
    
    var index = this.asignaturas.findIndex(value => value.cod_asig == asig.cod_asig);
    this.asignaturas[index] = asig;

    await this.storage.set(key, this.asig);
  }

  //Método para llamar a un profesor para asignarlo a la clase
  async obtenerProfesor(key)
  {
    this.usuarios = await this.storage.get(key) || [];
    this.usuario = this.usuarios.find(usu => usu.tipo_usuario == 'profesor');
    return this.usuario;
  }

  async obtenerProfesores(key): Promise<any[]> {
    this.usuarios = await this.storage.get(key) || [];
    this.usuarios = await this.usuarios.filter(usu => usu.tipo_usuario == 'profesor');
    console.log(this.usuarios)
    return this.usuarios;
  }

  async asignaturaProf(key, rut){
    this.asignaturas = await this.storage.get(key) || [];
    this.asignaturas = this.asignaturas.find(asig => asig.prof_asignatura == rut);
    return this.asignaturas;
  }

  /*-----------------------------------------------------------------------------------------------------------------
  -------------------------------------------------------------------------------------------------------------------
  -----------------------------------------------------------------------------------------------------------------*/

  //Método para trabajar la asistencia
  async obtenerAsist(key, codAsist){
    this.asistencias = await this.storage.get(key) || [];
    this.asist = this.asistencias.find(as => as.codAsist = codAsist);
    return this.asist;
  }

  async obtenerAsistencias(key): Promise<any[]>{
    this.asistencias = await this.storage.get(key) || [];
    return this.asistencias;
  }

  async agregarAsist(key, asist){
    this.asistencias = await this.storage.get(key) || [];
    this.asist = await this.obtenerAsist(key, asist.codAsist);
    if(asist != undefined){
      this.asistencias.push(asist);
      await this.storage.set(key, this.asistencias);
      return true;
    }
    return false;
  }

  async guardarAsist(key, codAsist, rut){
    this.asistencias = await this.storage.get(key) || [];
    let index = this.asistencias.findIndex(as => as.codAsist == codAsist);
    console.log(this.asistencias[index].alumnos);
    this.asistencias[index].alumnos.push(rut);
    console.log(this.asistencias[index].alumnos);
    await this.storage.set(key, this.asistencias);
  }

  async idAsig(key){
    this.asistencias = await this.storage.get(key) || [];
    var id = 0;
    for(let index = 0; index < this.asistencias.length; index++){
      id = this.asistencias[index].codAsist;
    }
    return id + 1;
  }

}
