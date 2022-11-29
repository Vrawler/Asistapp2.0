import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FirestService } from 'src/app/services/firest.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ValidacionesService } from 'src/app/services/validaciones.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  //VAMOS A CREAR EL GRUPO DEL FORMULARIO:
  usuario = new FormGroup({
    rut : new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nom_com: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('',[Validators.required,Validators.pattern('[A-Za-z]{1,4}.[A-Za-z]{1,20}@duocuc.cl|[A-Za-z]{1,4}.[A-Za-z]{1,20}@duoc.cl|[A-Za-z]{1,4}.[A-Za-z]{1,20}@profesor.duoc.cl')]),
    fec_nac: new FormControl('', Validators.required),
    semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
    direccion: new FormControl('',[Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    tipo_usuario: new FormControl('alumno'),
    nro_cel: new FormControl('', [Validators.required, Validators.pattern('[0-9]{0,9}')])
  });

  //Variable para verificar pass
  verificar_password: string;

  //Variables para trabajar el storage
  usuarios: any[] = [];
  //KEY_USUARIOS = 'usuarios';

  constructor(private usuarioService: UsuarioService, private router: Router, private validacionesService: ValidacionesService, private firestService: FirestService, private loadingController: LoadingController) { }

  ngOnInit() {
  }

  //método del formulario
  async registrar(){
    //Verificar password
    if (this.usuario.controls.password.value != this.verificar_password) {
      await this.cargandoPantalla('CONTRASEÑAS NO COINCIDEN')
      return;
    }

    //Verificar rut
    if(!this.validacionesService.validarRut(this.usuario.controls.rut.value)){
      await this.cargandoPantalla('RUT INVALIDO, VUELVA A INTENTAR')
      return;
    }

    //Verificar edad
    if(!this.validacionesService.calcEdadReturn(17, this.usuario.controls.fec_nac.value)){
      alert('Edad mínima 17 años.');
      return;
    }

    this.firestService.addFire('usuarios', this.usuario.value);
    await this.cargandoPantalla('Usuario registrado!')
    this.router.navigate(['/login']);
  }

  //Función para botón
  btnInicio = function(){
    this.router.navigate(['/inicio']);
  }

    //Método para mostrar "cargando pantalla"
    async cargandoPantalla(message){
      const cargando = await this.loadingController.create({
        message,
        duration: 1500,
        spinner: 'lines-small'
      });
  
      cargando.present();
    }

}