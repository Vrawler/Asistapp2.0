import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { element } from 'protractor';
import { Asignaturas } from 'src/app/interfaces/esquemas';
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

  //Variables para trabajar clases
  asignaturas: any [] = [];
  asignatura: any [] = [];
  asig: any;

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
          this.asignatura = this.asignaturas.find(a => a.rutprof_asignatura == this.rut)
        }
      }
    );
  }

  //Código QR
  async generarQR(cod_asig){    

    let asist = {
      idAsist: '',
      idAsig: '',
      alumnos: [],
      fecClas: ''
    };

    var almnAsistTemp = [];
    var alumnosAsig = [];

    const idAsistTemp = this.firestService.getId();
    
    this.firestService.getDoc<Asignaturas>('asignaturas', cod_asig).subscribe(
      (resp) => {
        resp.data().asistencia.forEach((aux) => {
          alumnosAsig.push(aux);
        });
      }
    );
    // console.log(alumnosAsig);

    alumnosAsig.forEach(element => {
        var asistAlmn = {
          rut: '',
          asistencia: ''
        };
        console.log(element);
        asistAlmn.rut = element;
        asistAlmn.asistencia = 'ausente';
        almnAsistTemp.push(asistAlmn);
      }
    );

    var d = new Date();
    let day = d.toLocaleString();

    asist.idAsist = idAsistTemp;
    asist.idAsig = cod_asig;
    asist.alumnos = almnAsistTemp;
    asist.fecClas = day;

    let resp = this.firestService.addFire('asistencia_clase', asist);

    if(resp){
      if(this.value == ''){
        this.value = idAsistTemp;
      }
      this.cargandoPantalla('Iniciando clase...');
    }else{
      this.tostadaError();
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
