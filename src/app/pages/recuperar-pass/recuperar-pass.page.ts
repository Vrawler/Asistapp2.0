import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { FirestService } from 'src/app/services/firest.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.page.html',
  styleUrls: ['./recuperar-pass.page.scss'],
})
export class RecuperarPassPage implements OnInit {

  //Variables para trabajar los datos
  usuarios: any[] = [];
  email: string = '';
  buscarEmail: any = '';

  //Variables para trabajar el storage
  // KEY_USUARIOS = 'usuarios';

  constructor(
    private toastController: ToastController, 
    private router: Router,
    private usuarioService: UsuarioService, 
    private alertController: AlertController,
    private firestService: FirestService
    ) { }

  ngOnInit() {
    this.cargarDatos()  
  }

  cargarDatos(){
    this.firestService.getDatosFire('usuarios').subscribe(
      datosfb => {
        this.usuarios = [];
        for(let usuario of datosfb){
          // console.log(usuario.payload.doc.data());
          let usu = usuario.payload.doc.data();
          usu['id'] = usuario.payload.doc.id;
          this.usuarios.push(usu);
        }
      }
    );
  }

  async recuperarContra(){
    this.buscarEmail = this.usuarios.find(u => u.email == this.email);
    if(this.buscarEmail != undefined){
      this.presentAlert('Contraseña enviada al correo')
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