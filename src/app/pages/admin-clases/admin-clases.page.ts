import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

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

  asig = new FormGroup({
    cod_asig: new FormControl('',[Validators.required, Validators.pattern('[1-9]{8}')]),
    nom_asig: new FormControl('',[Validators.required, Validators.minLength(6)]),
    sigla_asig: new FormControl('',[Validators.required, Validators.pattern('[A-Z]{1,3}[0-9]{1,5}')]), 
    prof_asignatura: new FormControl('', [Validators.required]),
    clasif_esc: new FormControl('this.escuela')
  });

  asignaturas: any[] = [];
  KEY_ASIGNATURAS = 'asignaturas';
  usuarios: any[] = [];
  KEY_USUARIOS = 'usuarios';

  //Variables validaciones
  valid_cod: string;
  

  constructor(private usuarioService: UsuarioService, private loadingController: LoadingController) { }

  async ngOnInit() {
    await this.cargarAsignaturas();
    await this.asignarProfesor();

    this.asigPredef = {
      cod_asig: '15483569',
      nom_asig: 'Programación de algoritmos cuánticos',
      sigla_asig: 'PGY5050',
      prof_asignatura: 'Rick Sánchez',
      clasif_esc: 'Informática y telecomunicaciones'
    };

    await this.usuarioService.agregarAsignatura(this.KEY_ASIGNATURAS, this.asigPredef);
  }

  //Método para poder usar storage
  async cargarAsignaturas(){
    this.asignaturas = await this.usuarioService.obtenerAsignaturas(this.KEY_ASIGNATURAS);
  }

  //Método para traer ususarios de tipo profesor
  async asignarProfesor(){
    this.usuarios = await this.usuarioService.obtenerProfesores(this.KEY_USUARIOS);
  }

  //Método registrar asignatura
  async registrarAsignatura(){
    //verificar registro
    var resp = await this.usuarioService.agregarAsignatura(this.KEY_ASIGNATURAS, this.asig.value);
    if(resp){
      this.cargarAsignaturas();
    }
    alert('Asignatura registrada.');
    this.asig.reset();
  }

  //Método eliminar asignatura
  async eliminarAsignatura(cod_asig){
    await this.usuarioService.eliminarAsig(this.KEY_ASIGNATURAS, cod_asig);
    await this.cargandoPantalla('Eliminando...')
    await this.cargarAsignaturas();
  }

  //Método para buscar una asignatura
  async buscarAsignatura(cod_asig){
    var buscarAsig = await this.usuarioService.obtenerAsignatura(this.KEY_ASIGNATURAS, cod_asig);
    this.asig.setValue(buscarAsig);
  }

  //Método para modificar asignatura
  async modificarAsig(){
    this.usuarioService.modificarAsignatura(this.KEY_ASIGNATURAS, this.asignaturas);
    await this.cargarAsignaturas();
  }

  //Método para limpiar campos
  limpiarAsig(){
    this.asig.reset();
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
