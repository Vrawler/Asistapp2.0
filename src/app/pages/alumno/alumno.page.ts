import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  KEY_ASIGNATURAS: 'asignaturas';

  asistencias:any[]=[];
  asist:any;
  KEY_ASISTENCIAS = 'asistencias'

  codigoQr: any;


  //Variable para trabajar el storage
  // KEY_USUARIOS = 'usuarios';

  constructor(private activatedRoute: ActivatedRoute, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    // this.usuario = await this.usuarioService.obtenerUsuario(this.KEY_USUARIOS, this.rut);
    this.cargarAsignaturas();
    this.cargarAsistencias();
  }

  async cargarAsignaturas(){
    this.asignaturas = await this.usuarioService.obtenerAsignaturas(this.KEY_ASIGNATURAS);
  }

  async cargarAsistencias(){
    this.asistencias = await this.usuarioService.obtenerAsistencias(this.KEY_ASISTENCIAS);
  }
  
  // async guardarAsist(){
  //     await this.usuarioService.guardarAsist(this.KEY_ASISTENCIAS, this.codigoQr,this.rut);
  // }

}
