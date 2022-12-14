//Librería para realizar peticiones http

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //método para realizar la petición
  async get (){
    let id = Math.floor(Math.random() * 1150) + 1;
    return await this.http.get('https://pokeapi.co/api/v2/pokemon/'+id)
  }
}
