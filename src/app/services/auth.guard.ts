import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestService } from './firest.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService, private router: Router, private firestService: FirestService){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    //Lógica
    var auth = this.firestService.getAuthFire();
    if(!auth){
      this.router.navigate(['/login'])
    }else{
      return true;
    }
  }
}

