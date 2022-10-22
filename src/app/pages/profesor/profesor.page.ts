import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { v4  } from 'uuid';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  //Variables que reciben los datos de ingreso
  rut: string;
  usuario: any;

  //Variables para trabajar el storage
  KEY_USUARIOS = 'usuarios';

  //Variables para el cod. qr
  elementType = 'canvas';
  value = '';

  constructor(private activatedRoute: ActivatedRoute, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    this.usuario = this.usuarioService.obtenerUsuario(this.KEY_USUARIOS, this.rut);
    console.table(this.usuario)
  }

  generarQR(){
    if(this.value == ''){
      this.value = v4();
    }
  }

}
