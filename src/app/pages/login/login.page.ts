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

  //Variables para trabajar el storage
  usuarios: any[] = [];
  KEY_USUARIOS = 'usuarios';

  //Cambio en las variables para el nuevo método:
  usuario = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.pattern('[A-Za-z]{1,4}.[A-Za-z]{1,20}@duocuc.cl|[A-Za-z]{1,4}.[A-Za-z]{1,20}@duoc.cl|[A-Za-z]{1,4}.[A-Za-z]{1,20}@profesor.duoc.cl')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
  });

  constructor(private toastController: ToastController, private router: Router, private usuarioService: UsuarioService) { }

  async ngOnInit() {
    await this.cargarDatos();
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

    //Con el método loginUsuario del usuario.service, rescatamos al usuario
    var usuarioLogin = await this.usuarioService.loginUsuario(validarCorreo, validarPassw);

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
