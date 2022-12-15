import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
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
  asignaturas: any [] = [];
  asignatura: any [] = [];
  asig: any;

  //Variables para trabajar asistencia

  asistencias: any[] = [];
  asist: any;

  //Variables para el cod. qr
  elementType = 'canvas';
  value = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestService: FirestService,
    private loadingController: LoadingController,
    private toastController: ToastController
    ) { }

  ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    this.cargarAsignaturasFbst();
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
          console.log(this.rut)
          console.log(this.asignaturas)
          this.asignatura = this.asignaturas.filter(a => a.rutprof_asignatura == this.rut)
          console.log(this.asignatura)
        }
      }
    );
  }

  //Código QR
  async generarQR(cod_asig){
    this.asist = {
      codAsist: '',
      cod_asig: cod_asig,
      alumnos: []
    }

    var resp = await this.firestService.addAsistFire('asistencia_clase', this.asist);
    this.asist.codAsist = resp;
    this.asig.asist = resp;
    this.firestService.updateFire('asignaturas', cod_asig, this.asig);
    this.firestService.updateFire('asistencia_clase', resp, this.asist);
    if(resp){
      this.cargandoPantalla('Iniciando clase...');
      this.cargarAsignaturasFbst();
      if(this.value == ''){
        this.value = cod_asig;
      }
      console.log(resp);
    }else{

    }
  }

  async cargandoPantalla(message){
    const cargando = await this.loadingController.create({
      message,
      duration: 1500,
      spinner: 'lines-small'
    });

    cargando.present();
  }

  async tostadaError() {
    const toast = await this.toastController.create({
      message: 'No se puede volver a crear asistencia hoy.',
      duration: 3000
    });
    toast.present();
  }
}
