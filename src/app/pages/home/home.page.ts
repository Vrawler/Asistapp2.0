import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{ 

  //Variable que recibe los datos del usuario desde el login
  usuario: any;

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
    console.log(this.usuario);
  }

  //Método para cerrar sesión

  logout(){
    this.usuarioService.logOut();
  }
}