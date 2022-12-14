import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.page.html',
  styleUrls: ['./error404.page.scss'],
})
export class Error404Page implements OnInit {

  //Variables para trabajar api
  pkmn_img: any;
  pkmn_nm: string;
  pkmn_type: any;

  constructor(private apiService: ApiService) { }

  async ngOnInit(){
    //Método que trae a los pokémon
    let respuesta = await this.apiService.get();
    respuesta.subscribe( (data: any) => {
      console.log(data);
      this.pkmn_img = data.sprites.front_default;
      this.pkmn_nm = data.name;
      this.pkmn_type = data.types;
    });
  }

}
