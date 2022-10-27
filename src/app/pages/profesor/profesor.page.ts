import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { v4  } from 'uuid';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  //Variables importantes
  rut: string;
  count: any;

  //Variables para trabajar profesores
  profesores: any[] = [];
  prof: any;
  KEY_PROFESORES = 'profesor';

  //Variables para trabajar clases
  asignaturas: any[] = [];
  asig: any;
  KEY_ASIGNATURAS: 'asistencias'

  //Variables para trabajar asistencia

  asistencias: any[] = [];
  asist: any;
  KEY_ASISTENCIAS = 'asistencias';

  //Variables para el cod. qr
  elementType = 'canvas';
  value = '';

  constructor(private activatedRoute: ActivatedRoute, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    this.cargarProfesores();
    this.cargarAsigProf();
  }

  //Métodos para ngOnInit

  async cargarProfesores(){
    this.profesores = await this.usuarioService.obtenerProfesores(this.KEY_PROFESORES);
  }

  async cargarAsigProf(){
    this.asignaturas = await this.usuarioService.asignaturaProf(this.KEY_ASIGNATURAS, this.rut);
  }

  //Código QR
  async generarQR(cod_asig){
    this.count = await this.usuarioService.idAsig(this.KEY_ASISTENCIAS);
    this.asist = {
      codAsist: this.count,
      cod_asig: cod_asig,
      alumnos: []
    }

    var resp: boolean = await this.usuarioService.agregarAsist(this.KEY_ASISTENCIAS, this.asist);
    if(resp){
      alert('Escanear código.')
      await this.cargarAsigProf();
      await this.cargarProfesores();
      if(this.value == ''){
        this.value = JSON.stringify(this.count);
      }
    }else{
      alert('Asistencia del día creada.')
    }
  }
}
