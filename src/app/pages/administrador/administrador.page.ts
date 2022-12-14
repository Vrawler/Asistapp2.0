import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Address } from 'cluster';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { FirestService } from 'src/app/services/firest.service';
import { ValidacionesService } from 'src/app/services/validaciones.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  @ViewChild("placesRef") placesRef : GooglePlaceDirective;

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
    nro_cel: new FormControl('', [Validators.required, Validators.pattern('[0-9]{9}')]),
    id: new FormControl('')
  });

  //Variable para validar
  verificar_password: string;
  buscarUsu: any = '';
  buscarEmail: any = '';

  //Variables para trabajar el storage
  usuarios: any[] = [];
  // updateId: any = '';
  v_agregar: boolean = false;

  constructor(
    private validacionesService: ValidacionesService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private firestService: FirestService) {}

  ngOnInit() {
    this.cargarDatos();
  }
  
  //m??todo para autocompletar direcci??n con maps
  public handleAddressChange(address: Address) {
    console.log(address);
  }

  //M??todos para poder usar fire
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

  //m??todo del formulario
  async registrar(){
    
    //Verificar password
      if (this.usuario.controls.password.value != this.verificar_password) {
        return this.presentAlert('CONTRASE??AS NO COINCIDEN!');
      }

    //Verificar rut
    if(!this.validacionesService.validarRut(this.usuario.controls.rut.value)){
      return this.presentAlert('RUT INVALIDO, VUELVA A INTENTAR')
    }

    //Verificar edad
    if(!this.validacionesService.calcEdadReturn(17, this.usuario.controls.fec_nac.value)){
      return this.presentAlert('La edad debe ser mayor a 17 a??os!'); 
    }

    this.buscarUsu = this.usuarios.find(u => u.rut == this.usuario.value.rut);
    this.buscarEmail = this.usuarios.find(u => u.email == this.usuario.value.email);
    if(this.buscarUsu == undefined && this.buscarEmail == undefined){
      this.firestService.addFire('usuarios', this.usuario.value);
      this.presentAlert('Usuario registrado!')
    }else if(this.buscarUsu != undefined){
      this.presentAlert('El rut ya est?? registrado.');
    }else if(this.buscarEmail != undefined){
      this.presentAlert('El email ya est?? registrado.')
    };

    //verificar registro
    this.cargarDatos();
    this.usuario.reset();
    this.verificar_password = '';
    this.v_agregar = false;
  }

  //M??todo eliminar
  async eliminar(id){
    this.firestService.deleteFire('usuarios', id);
    await this.cargandoPantalla('Eliminando...')
    this.cargarDatos();
  }

  //M??todo para traer un usuario
  async buscar(id){
    await this.cargandoPantalla('Buscando...')
    var buscarUsu = this.firestService.getDatoFire('usuarios', id);
    buscarUsu.subscribe(
      (resp: any) =>{
        let usr = resp.data();
        usr['id'] = resp.id;
        this.usuario.setValue( usr )
      }
    )
  }



  //M??todo para modificar usuario
  async modificar(){
    //Verificar password
    if (this.usuario.controls.password.value != this.verificar_password) {
      return this.presentAlert('CONTRASE??AS NO COINCIDEN!');
    }

    //Verificar rut
    if(!this.validacionesService.validarRut(this.usuario.controls.rut.value)){
    return this.presentAlert('RUT INVALIDO, VUELVA A INTENTAR')
    }

    //Verificar edad
    if(!this.validacionesService.calcEdadReturn(17, this.usuario.controls.fec_nac.value)){
    return this.presentAlert('La edad debe ser mayor a 17 a??os!');  
    }

    await this.cargandoPantalla('Modificando...')

    let usr = this.usuario.value;
    this.firestService.updateFire('usuarios', this.usuario.value.id, usr);
    this.usuario.reset();
    // this.updateId = '';
  }

  handleChange(e) {
    if(e.detail.value == 'alumno'){
      
      let domEmail = '@duocuc.cl';
      console.log(domEmail);
      this.usuario.patchValue({
        email: domEmail
      });
      return this.usuario.value.email = domEmail;

    }else if(e.detail.value == 'profesor'){
      
      let domEmail = '@profesor.duoc.cl';
      console.log(domEmail);
      this.usuario.patchValue({
        email: domEmail
      });
      return this.usuario.value.email = domEmail;
    
    }else{
      
      let domEmail = '@duoc.cl';
      console.log(domEmail);
      this.usuario.patchValue({
        email: domEmail
      });
      return this.usuario.value.email = domEmail;
    
    }
  };

  //M??todo para limpiar campos
  async limpiar(){
    await this.cargandoPantalla('Limpiando datos...')
    this.usuario.reset();
    this.verificar_password = '';
  }

  //M??todo para mostrar "cargando pantalla"
  async cargandoPantalla(message){
    const cargando = await this.loadingController.create({
      message,
      duration: 1500,
      spinner: 'lines-small'
    });

    cargando.present();
  }

  async presentAlert(mensaje:string) {
    const alert = await this.alertController.create({
      header: mensaje,
      message: '',
      buttons: ['OK'],
    });

    await alert.present();
  }

}