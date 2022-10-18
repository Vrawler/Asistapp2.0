import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ValidacionesService } from 'src/app/services/validaciones.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  //VAMOS A CREAR EL GRUPO DEL FORMULARIO:
  usuarios = new FormGroup({
    rut : new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nom_completo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('',[Validators.required,Validators.pattern('[A-Za-z]{1,4}.[A-Za-z]{1,20}@duocuc.cl|[A-Za-z]{1,4}.[A-Za-z]{1,20}@duoc.cl|[A-Za-z]{1,4}.[A-Za-z]{1,20}@profesor.duoc.cl')]),
    fecha_nac: new FormControl('', Validators.required),
    semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    tipo_usuario: new FormControl('alumno')
  });

  //VAMOS A CREAR UNA VARIABLE PARA OBTENER LA LISTA DE USUARIOS DEL SERVICIO DE USUARIOS:
  
  verificar_password: string;

  constructor(private usuarioService: UsuarioService, private router: Router, private validacionesService: ValidacionesService) { }

  ngOnInit() {
  }

  //método del formulario
  registrar(){

    //Verificar password
    if (this.usuarios.controls.password.value != this.verificar_password) {
      alert('CONTRASEÑAS NO COINCIDEN!');
      return;
    }

    //Verificar rut
    if(!this.validacionesService.validarRut(this.usuarios.controls.rut.value)){
      alert('Rut inválido.');
      return;
    }

    //Verificar edad
    if(!this.validacionesService.calcEdadReturn(17, this.usuarios.controls.fecha_nac.value)){
      alert('Edad mínima 17 años.');
      return;
    }

    this.usuarioService.agregarUsuario(this.usuarios.value);
    alert('ALUMNO REGISTRADO!');
    this.router.navigate(['/login']);
  }

}
