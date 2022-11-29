import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestService } from 'src/app/services/firest.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { v4  } from 'uuid';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  //Variables importantes
  rut: string = '';
  count: any;

  //Variables para trabajar clases
  asignaturas: any[] = [];
  asig: any;

  //Variables para trabajar asistencia

  asistencias: any[] = [];
  asist: any;
  KEY_ASISTENCIAS = 'asistencias';

  //Variables para el cod. qr
  elementType = 'canvas';
  value = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private firestService: FirestService,
    private router: Router
    ) { }

  ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    // this.cargarAsigProf();
    this.cargarAsignaturasFbst();
    console.log(this.asignaturas);
  }

  //Métodos para ngOnInit

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

  // async cargarAsigProf(){
  //   this.asignaturas = await this.usuarioService.asignaturaProf(this.KEY_ASIGNATURAS, this.rut);
  // }

  //Código QR
  async generarQR(cod_asig){
    this.count = await this.usuarioService.idAsig(this.KEY_ASISTENCIAS);
    this.asist = {
      codAsist: this.count,
      cod_asig: cod_asig,
      alumnos: []
    }

  //   var resp: boolean = await this.usuarioService.agregarAsist(this.KEY_ASISTENCIAS, this.asist);
  //   if(resp){
  //     alert('Escanear código.')
  //     await this.cargarAsigProf();
  //     await this.cargarProfesores();
  //     if(this.value == ''){
  //       this.value = JSON.stringify(this.count);
  //     }
  //   }else{
  //     alert('Asistencia del día creada.')
  //   }
   }
}
