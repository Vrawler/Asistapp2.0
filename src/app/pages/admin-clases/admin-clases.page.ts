import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { FirestService } from 'src/app/services/firest.service';
// import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-admin-clases',
  templateUrl: './admin-clases.page.html',
  styleUrls: ['./admin-clases.page.scss'],
})
export class AdminClasesPage implements OnInit {

  //Asignatura predefinida
  asigPredef: any;

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
    // cod_asig: new FormControl('',[Validators.required, Validators.pattern('[1-9]{8}')]),
    nom_asig: new FormControl('',[Validators.required, Validators.minLength(6)]),
    sigla_asig: new FormControl('',[Validators.required, Validators.pattern('[A-Z]{1,3}[0-9]{1,5}')]), 
    rutprof_asignatura: new FormControl('', [Validators.required]),
    clasif_esc: new FormControl('this.escuela'),
    id: new FormControl('')
  });

  asignaturas: any[] = [];

  usuarios: any[] = [];

  usrProf: any[] = [];

  //Variables validaciones
  valid_cod: string;
  updateIdAsig: any = '';
  

  constructor(
    // private usuarioService: UsuarioService, 
    private loadingController: LoadingController,
    private firestService: FirestService) { }

  ngOnInit() {
    this.cargarDatosProf();
    this.cargarAsignaturasFbst();
    
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
    await this.cargandoPantalla('Asignatura registrada!')
    this.firestService.addFire('asignaturas', this.asignatura.value)
    this.asignatura.reset();
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
    let asg = this.asignatura.valid;
    this.firestService.updateFire('asignaturas', this.updateIdAsig, asg);
    this.asignatura.reset();
    this.updateIdAsig = '';
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
      duration: 3000,
      spinner: 'lines-small'
    });

    cargando.present();
  }

}