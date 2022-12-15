import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { environment } from "src/environments/environment";
import { AlumnoPage } from "./alumno.page";

describe('PRUEBA UNITARIAS: Alumno', ()=>{
  
    //configurar ambiente de pruebas:
    beforeEach( async ()=>{
      await TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          FormsModule,
          AngularFireModule.initializeApp(environment.firebaseConfig)
        ],
        declarations: [
         AlumnoPage
        ]
      }).compileComponents();
    });
  
    it('1. Levantar la pÃ¡gina alumno', ()=>{
        const fixture = TestBed.createComponent(AlumnoPage);
        const app = fixture.componentInstance;
        
        expect(app).toBeTruthy();
      });
    });