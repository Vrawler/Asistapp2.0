import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.page.html',
  styleUrls: ['./recuperar-pass.page.scss'],
})
export class RecuperarPassPage implements OnInit {

  //Variables para trabajar los datos
  usuarios: any[] = [];
  email: string;

  //Variables para trabajar el storage
  KEY_USUARIOS = 'usuarios';



  constructor(private toastController: ToastController, private router:Router,private usuarioService: UsuarioService, private alertController: AlertController) { }

  async ngOnInit() {
    this.usuarios = await this.usuarioService.obtenerUsuarios(this.KEY_USUARIOS);
  }

async recuperarContra(){
  var validarEmail = await this.usuarioService.validarCorreorpw(this.email)
    if (validarEmail != undefined) {
      if (validarEmail.email == this.email) {
        //alert('Se envió un correo electrónico de recuperación');
        this.presentAlert('Se envió un correo electrónico de recuperación')
      }
    }else{
      this.tstError();
    }
}

  async tstError() {
    const toast = await this.toastController.create({
      message: 'Correo no registrado',
      duration: 3000
    });
    toast.present();
  }

  async presentAlert(mensaje:string) {
    const alert = await this.alertController.create({
      header: mensaje,
      message: '',
      buttons: ['OK'],
    });

    await alert.present();
  }

  //Función para botón
  btnInicio = function(){
    this.router.navigate(['/inicio']);
  }
}