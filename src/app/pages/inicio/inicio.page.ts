import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  //Funciones para botones
  btnLogin = function(){
    this.router.navigate(['/login']);
  }

  btnRegistro = function(){
    this.router.navigate(['/registrar']);
  }

  btnFgtpass = function(){
    this.router.navigate(['/recuperar-pass']);
  }

}
