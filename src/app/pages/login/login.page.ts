import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestService } from 'src/app/services/firest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //Variables para trabajar el storage
  usuarios: any [] = [];

  //Cambio en las variables para el nuevo método:
  usuario = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.pattern('[A-Za-z]{1,4}.[A-Za-z]{1,20}@duocuc.cl|[A-Za-z]{1,4}.[A-Za-z]{1,20}@duoc.cl|[A-Za-z]{1,4}.[A-Za-z]{1,20}@profesor.duoc.cl')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
  });

  constructor(
    private toastController: ToastController,
    private router: Router,
    private usuarioService: UsuarioService, 
    private fire: FirestService) { }

  ngOnInit() {

    this.cargarDatos();

  }

  //Métodos para poder usar storage
  cargarDatos(){
    this.fire.getDatosFire('usuarios').subscribe(
      registro =>{
        this.usuarios = [];
        for(let usuario of registro){
          // console.log( usuario.payload.doc.data() );
          let usu = usuario.payload.doc.data();
          usu['id'] = usuario.payload.doc.id;
          this.usuarios.push(usu);
        }
      }
    );
  }

  //método para ingresar a home, adaptado:
  login(){

    //Obtener valores en variables por separado
    var validarCorreo = this.usuario.controls.email.value;
    var validarPassw = this.usuario.controls.password.value;

    //Variables para validar login
    var valida: boolean = this.fire.loginFire(validarCorreo, validarPassw, this.usuarios)
    var usuarioLogin = this.usuarios.find(usu => usu.email == validarCorreo && usu.password == validarPassw);

    //validar si existe el usuario en la información traida de frbs
    if(valida != false){
      let navigationExtras: NavigationExtras = {
        state:{
          usuario: usuarioLogin
        }
      };
      //Según el tipo de usuario, se redirige al home respectivo
      this.router.navigate(['/home/perfil/'+usuarioLogin.rut], navigationExtras);
      this.fire.isAutenticated.next(true);
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
