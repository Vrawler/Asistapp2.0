import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { environment } from "src/environments/environment";
import { InicioPage } from "./inicio.page";

describe('PRUEBA UNITARIAS: inicio', ()=>{
  
    //configurar ambiente de pruebas:
    beforeEach( async ()=>{
      await TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          FormsModule,
          AngularFireModule.initializeApp(environment.firebaseConfig)
        ],
        declarations: [
         InicioPage
        ]
      }).compileComponents();
    });
  
    it('1. Levantar la pÃ¡gina inicio', ()=>{
        const fixture = TestBed.createComponent(InicioPage);
        const app = fixture.componentInstance;
        
        expect(app).toBeTruthy();
      });
    });