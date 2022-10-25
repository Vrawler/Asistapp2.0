import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  //Variables para recibir el dato que se quiere mostrar en la página perfil
  rut: string = '';
  usuario: any = {};

  /*El error que había se producía por no inicializar las variables. 
  Para este caso, si la variable no se declara, como el html carga primero, no sabe que mostrar*/

  //Variable para trabajar el storage
  KEY_USUARIOS = 'usuarios';

  constructor(private activatedRoute: ActivatedRoute, private usuarioService: UsuarioService) { }

  async ngOnInit() {

    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    this.usuario = await this.usuarioService.obtenerUsuario(this.KEY_USUARIOS, this.rut);
    console.table(this.usuario);
  }

}