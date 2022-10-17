import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  //Variables para recibir el dato que se quiere mostrar en la página perfil
  rut: string;
  usuario: any;

  constructor(private activatedRoute: ActivatedRoute, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    this.usuario = this.usuarioService.obtenerUsuario(this.rut);
    console.table(this.usuario);
  }

}
