import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  rut: string;
  usuario: any;

  //Variable para trabajar el storage
  KEY_USUARIOS = 'usuarios';

  constructor(private activatedRoute: ActivatedRoute, private usuarioService: UsuarioService) { }

  async ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    this.usuario = await this.usuarioService.obtenerUsuario(this.KEY_USUARIOS, this.rut);
    console.table(this.usuario)
  }

}
