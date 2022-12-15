import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { FirestService } from 'src/app/services/firest.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  rut: string = '';
  usuario: any;

  asignaturas: any [] = [];
  asign: any;

  asistencias:any [] = [];
  asistClase: any [] = [];
  asist:any;
  KEY_ASISTENCIAS = 'asistencias'

  codigoQr: any;


  //Variable para trabajar el storage
  // KEY_USUARIOS = 'usuarios';

  constructor(
    private activatedRoute: ActivatedRoute, 
    private firestService: FirestService,
    private loadingController: LoadingController,
    private toastController: ToastController
    ) { }

  ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    // this.usuario = await this.usuarioService.obtenerUsuario(this.KEY_USUARIOS, this.rut);
    this.cargarAsignaturasFbst();
    this.cargarAsistFbst();
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
  };

  cargarAsistFbst(){
    this.firestService.getAsists('asistencia_clase').subscribe(
     (data:any) => {
       this.asistencias = [];
       for(let a of data){
         let asistCls = a.payload.doc.data();
         this.asistencias.push(asistCls);
         this.asistClase = this.asistencias.find(a  => a.cod_clase == this.codigoQr)
       }
     }
   );
  };

  async addAsistFrbs(id){
    (await this.firestService.getAsig('asignaturas', id)).subscribe(
      (data:any)=>{
        this.asign = data.data()
        this.firestService.getAsist('asistencia_clase', this.asign.asist).subscribe(
          (data:any)=>{
            this.asist = data.data()
            this.asist.alumnos.push(this.rut)
            this.firestService.addAlmn('asistencia_clase', id ,this.asist);
            this.cargandoPantalla('Ingresando asistencia...');
            this.codigoQr.reset();
          }
        );
      }
    );
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
