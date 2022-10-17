import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  constructor() {
  }
  
  //Retornar edad

  calcEdadReturn(edadMin, fec_nac){
    var fn = new Date(fec_nac);
    var difFechas = Math.abs(Date.now() - fn.getTime());
    var edadEstudiante = Math.floor((difFechas / (1000*3600*24))/365.25);
    if(edadEstudiante >= edadMin){
      return true;
    }else{
      return false;
    }
  }

  //Validar run

  validarRut(rut):boolean{
    //Cambiar formato de rut
    var rutSimple = rut.replace('.','').replace('.','').replace('-','');
    
    //Eliminar dv
    rutSimple = rutSimple.substring(0, rutSimple.length-1);
    
    //Voltear dígitos del rut
    var arregloRut = rutSimple.split('').reverse();
    
    //Cálculo de operación de números de rut
    var acumulador: number = 0;
    var multiplo: number = 2;
    for(let digito of arregloRut){
      acumulador = acumulador + digito * multiplo;
      multiplo++;
      if(multiplo > 7){
        multiplo = 2;
      }
    }
    //Cálculo para obtener el dv
    var resto: number = acumulador%11;
    var dvCalc: any = 11 -resto;

    //Si es mayor que 11, se le asigna como valor 0
    if(dvCalc >= 11){
      dvCalc = 0;

    //Si es 10, se le asigna como valor K
    }else if(dvCalc == 10){
      dvCalc = 'K';
    }

    //Comparar resultados con el rut ingresado para confirmar
    var dvRut: string = rut.substring(rut.length-1).toUpperCase();
    if(dvRut == dvCalc.toString()){
      return true;
    }else{
      return false;
    }
  }
}
