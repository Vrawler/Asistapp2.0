import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { FirestService } from 'src/app/services/firest.service';
// import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-admin-clases',
  templateUrl: './admin-clases.page.html',
  styleUrls: ['./admin-clases.page.scss'],
})
export class AdminClasesPage implements OnInit {

  //Tipos de asignatura
  escuela: any[] = [{
    escDuoc:'Administración y negocios'
  },
  {
    escDuoc:'Comunicación'
  },
  {
    escDuoc:'Construcción'
  },
  {
    escDuoc:'Diseño'
  },
  {
    escDuoc:'Gastronomía'
  },
  {
    escDuoc:'Informática y telecomunicaciones'
  },
  {
    escDuoc:'Ingenieria y recursos naturales'
  },
  {
    escDuoc:'Salud'
  },
  {
    escDuoc:'Turismo y hotelería'
  },
  {
    escDuoc:'Formación cristiana'
  },
  ];
  
  //CRUD para crear una asignatura

  asignatura = new FormGroup({
    nom_asig: new FormControl('',[Validators.required, Validators.minLength(6)]),
    sigla_asig: new FormControl('',[Validators.required, Validators.pattern('[A-Z]{3}[0-9]{4,5}')]),
    secc_asig: new FormControl('',[Validators.required, Validators.pattern('[0-9]{3}[A-Z]{1}')]), 
    rutprof_asignatura: new FormControl('', [Validators.required]),
    clasif_esc: new FormControl('this.escuela'),
    asistencia: new FormControl([]),
    id: new FormControl('')
  });

  asignaturas: any[] = [];

  buscarAsig: any = '';

  usuarios: any[] = [];

  usrProf: any[] = [];

  usrAlumn: any[] = [];

  //Variables validaciones
  valid_cod: string;
  v_agregar: boolean = false;
  

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private firestService: FirestService) { }

  ngOnInit() {
    this.cargarDatosProf();
    this.cargarAsignaturasFbst();
    this.cargarDatosAlumn();
  }

  //Método para traer ususarios de tipo profesor
  cargarDatosProf(){
    this.firestService.getDatosFire('usuarios').subscribe(
      (datosfb: any) => {
        this.usuarios = [];
        for(let u of datosfb){
          // console.log(usuario.payload.doc.data());
          let usu = u.payload.doc.data();
          usu['id'] = u.payload.doc.id;
          this.usuarios.push(usu);
          this.usrProf = this.usuarios.filter(u => u.tipo_usuario == 'profesor');
        }
      }
    );
  }

  //Método para traer alumnos
  cargarDatosAlumn(){
    this.firestService.getDatosFire('usuarios').subscribe(
      (datosfb: any) => {
        this.usuarios = [];
        for(let u of datosfb){
          // console.log(u.payload.doc.data());
          let usu = u.payload.doc.data();
          usu['id'] = u.payload.doc.id;
          this.usuarios.push(usu);
          this.usrAlumn = this.usuarios.filter(u => u.tipo_usuario == 'alumno');
        }
      }
    );
  }

  cargarAsignaturasFbst(){
    this.firestService.getDatosFire('asignaturas').subscribe(
      (datosAsigfbst: any) => {
        this.asignaturas = [];
        for(let a of datosAsigfbst){
          // console.log(asignatura.payload.doc.data());
          let asig = a.payload.doc.data();
          asig['id'] = a.payload.doc.id;
          this.asignaturas.push(asig);
        }
      }
    );
  }

  //Método registrar asignatura
  async registrarAsignatura(){
    //verificar registro
    this.buscarAsig = this.asignaturas.find(a => a.secc_asig == this.asignatura.value.secc_asig);
    if(this.buscarAsig == undefined){
      this.firestService.addFire('asignaturas', this.asignatura.value);
      this.presentAlert('Asignatura registrada!');
      this.asignatura.reset();
    }else{
      this.presentAlert('Asignatura ya se encuentra creada.')
    }
    
    
    this.v_agregar = false;
    
  }

  //Método eliminar asignatura
  async eliminarAsignatura(id){
    this.firestService.deleteFire('asignaturas', id);
    await this.cargandoPantalla('Eliminando...')
    this.cargarAsignaturasFbst();
    this.cargarDatosProf();
  }

  //Método para buscar una asignatura
  buscarAsignatura(id){
    var buscarAsig = this.firestService.getDatoFire('asignaturas', id);
    buscarAsig.subscribe(
      (resp: any) =>{
        let asg = resp.data();
        asg['id'] = resp.id;
        this.asignatura.setValue( asg )
      }
    )
  }

  //Método para modificar asignatura
  async modificarAsig(){
    await this.cargandoPantalla('Modificando...')
    let asg = this.asignatura.value;
    this.firestService.updateFire('asignaturas', this.asignatura.value.id, asg);
    this.asignatura.reset();
  }

  //Método para limpiar campos
  async limpiarAsig(){
    await this.cargandoPantalla('Limpiando datos...')
    this.asignatura.reset();
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

  async presentAlert(mensaje:string) {
    const alert = await this.alertController.create({
      header: mensaje,
      message: '',
      buttons: ['OK'],
    });

    await alert.present();
  }

}