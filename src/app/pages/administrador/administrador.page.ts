import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { FirestService } from 'src/app/services/firest.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ValidacionesService } from 'src/app/services/validaciones.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  //Tipos de usuario
  jerUsuario: any[] = [{
    t_user:'alumno'
  },
  {
    t_user:'profesor'
  },
  {
    t_user:'administrador'
  }];

  //VAMOS A CREAR EL GRUPO DEL FORMULARIO:
  usuario = new FormGroup({
    rut : new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nom_com: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('',[Validators.required,Validators.pattern('[A-Za-z]{1,4}.[A-Za-z]{1,20}@duocuc.cl|[A-Za-z]{1,4}.[A-Za-z]{1,20}@duoc.cl|[A-Za-z]{1,4}.[A-Za-z]{1,20}@profesor.duoc.cl')]),
    fec_nac: new FormControl('', Validators.required),
    direccion: new FormControl('',[Validators.required]),
    semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    tipo_usuario: new FormControl('this.jerUsuario'),
    nro_cel: new FormControl('', [Validators.required, Validators.pattern('[0-9]{9}')])
  });

  //Variable para verificar password
  verificar_password: string;

  //Variables para trabajar el storage
  usuarios: any[] = [];
  KEY_USUARIOS = 'usuarios';

  constructor(
    private usuarioService: UsuarioService,
    private validacionesService: ValidacionesService,
    private loadingController: LoadingController,
    private firest: FirestService) {}

  ngOnInit() {
    this.cargarDatos();
  }

  //Métodos para poder usar storage
  cargarDatos(){
    this.firest.getDatosFire('usuarios').subscribe(
      datosfb => {
        this.usuarios = [];
        for(let usuario of datosfb){
          console.log(usuario.payload.doc.data());
          let usu = usuario.payload.doc.data();
          usu['id'] = usuario.payload.doc.id;
          this.usuarios.push(usu);
        }
      }
    );
  }

  //método del formulario
  registrar(){
    
    //Verificar password
    if(this.usuario.controls.password.value != this.verificar_password) {
      alert('Contraseñas no coinciden!');
      return;
    }

    //Verificar rut
    if(!this.validacionesService.validarRut(this.usuario.controls.rut.value)){
      alert('Rut inválido.')
      return;
    }

    //Verificar edad
    if(!this.validacionesService.calcEdadReturn(17, this.usuario.controls.fec_nac.value)){
      alert('Edad mínima 17 años.');
      return
    }

    //verificar registro
    var resp = this.firest.addFire('usuarios', this.usuario.value);
    if(resp){
      this.cargarDatos();
    }
    alert('Usuario registrado!');
    this.usuario.reset();
    this.verificar_password = '';
  }

  //Método eliminar
  async eliminar(rut){
    await this.usuarioService.eliminarUsuario(this.KEY_USUARIOS, rut);
    await this.cargandoPantalla('Eliminando...')
    await this.cargarDatos();
  }

  //Método para traer un usuario
  async buscar(rut){
    var buscarUsu = await this.usuarioService.obtenerUsuario(this.KEY_USUARIOS, rut);
    this.usuario.setValue(buscarUsu);
  }

  //Método para modificar usuario
  async modificar(){
    this.usuarioService.modificarUsuario(this.KEY_USUARIOS, this.usuarios);
    await this.cargarDatos();
  }

  //Método para limpiar campos
  limpiar(){
    this.usuario.reset();
    this.verificar_password = '';
  }

  //Método para mostrar "cargando pantalla"
  async cargandoPantalla(message){
    const cargando = await this.loadingController.create({
      message,
      duration: 3000,
      spinner: 'lines-small'
    });

    cargando.present();
  }

}