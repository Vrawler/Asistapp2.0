import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

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
  ];
  
  //CRUD para crear una asignatura

  asig = new FormGroup({
    cod_asig: new FormControl('',[Validators.required, Validators.pattern('[1-9]{8}')]),
    nom_asig: new FormControl('',[Validators.required, Validators.minLength(6)]),
    sigla_asig: new FormControl('',[Validators.required, Validators.pattern('[A-Z]{1,3}[0-9]{1,5}')]), 
    prof_asignatura: new FormControl('', [Validators.required]),
    clasif_esc: new FormControl('this.escuela')
  });

  asignaturas: any[] =[];
  KEY_ASIGNATURAS = 'asignaturas';

  constructor(private usuarioService: UsuarioService) { }

  async ngOnInit() {
    await this.cargarAsignaturas();
  }

  async cargarAsignaturas(){
    this.asignaturas = await this.usuarioService.obtenerAsignaturas(this.KEY_ASIGNATURAS);
  }

  async registrarAsignatura(){

  }

}
