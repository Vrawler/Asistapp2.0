import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //Usuarios de prueba
  userAdmin: any;
  userProf: any;
  userAlumno: any;

  //Variables para trabajar el storage
  usuarios: any [] = [];
  KEY_USUARIOS = 'usuarios';

  //Cambio en las variables para el nuevo método:
  usuario = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.pattern('[A-Za-z]{1,4}.[A-Za-z]{1,20}@duocuc.cl|[A-Za-z]{1,4}.[A-Za-z]{1,20}@duoc.cl|[A-Za-z]{1,4}.[A-Za-z]{1,20}@profesor.duoc.cl')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
  });

  constructor(private toastController: ToastController, private router: Router, private usuarioService: UsuarioService, ) { }

  async ngOnInit() {

    await this.cargarDatos();

    this.userAdmin = {
      rut: '1.111.111-1',
      nom_com: 'Mitsuoyoshi Anzai',
      email:'mit.anzai@duoc.cl',
      fec_nac: '1950-08-03',
      semestre: 'No aplica',
      password: 'blanco',
      tipo_usuario: 'administrador',
      nro_cel: 987981512
    };
    this.userProf = {
      rut: '10.123.456-7',
      nom_com: 'Rick Sánchez',
      email:'ri.sanch@profesor.duoc.cl',
      fec_nac: '1975-07-19',
      semestre: 'No aplica',
      password: 'szechuan',
      tipo_usuario: 'profesor',
      nro_cel: 9692123123
    };
    this.userAlumno = {
      rut: '90.563.153-k',
      nom_com: 'Marty McFly',
      email:'mar.mcfly@duocuc.cl',
      fec_nac: '2022-01-27',
      semestre: '1',
      password: 'delorean',
      tipo_usuario: 'alumno',
      nro_cel: 935678419
    };
    
    await this.usuarioService.agregarUsuario(this.KEY_USUARIOS, this.userAdmin);
    await this.usuarioService.agregarUsuario(this.KEY_USUARIOS, this.userProf);
    await this.usuarioService.agregarUsuario(this.KEY_USUARIOS, this.userAlumno);
  }

  //Métodos para poder usar storage
  async cargarDatos(){
    this.usuarios = await this.usuarioService.obtenerUsuarios(this.KEY_USUARIOS);
  }

  //método para ingresar a home, adaptado:
  async login(){

    //Obtener valores en variables por separado
    var validarCorreo = this.usuario.controls.email.value;
    var validarPassw = this.usuario.controls.password.value;
    var usuarioLogin: any;

    //Con el método loginUsuario del usuario.service, rescatamos al usuario
    usuarioLogin = await this.usuarioService.loginUsuario(this.KEY_USUARIOS, validarCorreo, validarPassw);

    //Verificamos si existe el usuario
    if (usuarioLogin != undefined) {
      //Diferencia con el método anterior: antes de redireccionar, preparamos los datos que enviaremos para validar
      var navigationExtras: NavigationExtras = {
        state:{
          usuario: usuarioLogin
        }
      };

      //Según el tipo de usuario, se redirige al home respectivo
      this.router.navigate(['/home'], navigationExtras);
      this.usuario.reset();

    }else{
      this.tostadaError();
    }
  }

  //toast
  async tostadaError() {
    const toast = await this.toastController.create({
      message: 'Usuario o contraseña incorrectos.',
      duration: 3000
    });
    toast.present();
  }

  //Función para botón
  btnInicio = function(){
    this.router.navigate(['/inicio']);
  }




}
