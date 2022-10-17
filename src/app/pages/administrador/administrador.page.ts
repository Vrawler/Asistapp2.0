import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ValidacionesService } from 'src/app/services/validaciones.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  //Variable cálculo de edad
  edadMin: number = 17;

  //Tipos de usuario
  jerUsuario: any[]=[{
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
    semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    tipo_usuario: new FormControl('this.jerUsuario'),
    nro_cel: new FormControl('', [Validators.required, Validators.pattern('[0-9]{0,8}')])
  });

  //VAMOS A CREAR UNA VARIABLE PARA OBTENER LA LISTA DE USUARIOS DEL SERVICIO DE USUARIOS:
  usuarios: any[] = [];
  verificar_password: string;

  constructor(private usuarioService: UsuarioService, private validacionesService: ValidacionesService) {}

  ngOnInit() {
    this.usuarios = this.usuarioService.obtenerUsuarios();
  }

  //método del formulario
  registrar(){

    //Verificar password
    if (this.usuario.controls.password.value != this.verificar_password) {
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
    
    var registrado: boolean = this.usuarioService.agregarUsuario(this.usuario.value);
    if (!registrado) {
      alert('Usuario ya existe!');
      return;
    }

    alert('Usuario registrado!');
    this.usuario.reset();
    this.verificar_password = '';
  }

  eliminar(rutEliminar){
    this.usuarioService.eliminarUsuario(rutEliminar);
  }

  buscar(rutBuscar){
    var alumnoEncontrado = this.usuarioService.obtenerUsuario(rutBuscar);
    this.usuario.setValue(alumnoEncontrado);
    this.verificar_password = alumnoEncontrado.password;
  }

  modificar(){
    //console.log(this.alumno.value);
    this.usuarioService.modificarUsuario(this.usuario.value);
    this.limpiar();
  }

  limpiar(){
    this.usuario.reset();
    this.verificar_password = '';
  }

}