import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
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

    let asist = {
      idAsist: '',
      idAsig: '',
      alumnos: [],
      fecClas: ''
    };

    var almnAsistTemp = [];

    const idAsistTemp = this.firestService.getId();

    // console.log(cod_asig)
    let alumnosAsig = [];
    this.firestService.getDoc<Asignaturas>('asignaturas', cod_asig).subscribe(
      (resp) => {
        resp.data().asistencia.forEach((aux) => {
          alumnosAsig.push(aux);
        })
      }
    )
    // console.log(alumnosAsig);

    alumnosAsig.forEach(
      (aux) => {
        var asistAlmn = {
          rut: '',
          asistencia: ''
        };
        asistAlmn.rut = aux;
        asistAlmn.asistencia = 'ausente';
        almnAsistTemp.push(asistAlmn);
      console.log(aux);
      console.log(asistAlmn);
      }
    )
    // console.log(alumnosAsig)

    var d = new Date();
    let day = d.toLocaleString();

    asist.idAsist = idAsistTemp;
    asist.idAsig = cod_asig;
    asist.alumnos = almnAsistTemp;
    asist.fecClas = day;

    let resp = this.firestService.addFire('asistencia_clase', asist);

    if(resp){
      this.cargandoPantalla('Iniciando clase...');
      if(this.value == ''){
        this.value = idAsistTemp;
      }
      console.log(resp);
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
