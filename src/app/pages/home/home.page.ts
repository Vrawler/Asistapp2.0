import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestService } from 'src/app/services/firest.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{ 

  //Variable que recibe los datos del usuario desde el login
  usuario: any;

  constructor(private router: Router, private firestService: FirestService) {}

  ngOnInit() {
    this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
    console.log(this.usuario);
  }

  //Método para cerrar sesión

  logout(){
    this.firestService.logOut();
  }
}