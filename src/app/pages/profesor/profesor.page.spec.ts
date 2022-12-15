import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { environment } from "src/environments/environment";
import { ProfesorPage } from "./profesor.page";

describe('PRUEBA UNITARIAS: profesor', ()=>{
  
    //configurar ambiente de pruebas:
    beforeEach( async ()=>{
      await TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          FormsModule,
          AngularFireModule.initializeApp(environment.firebaseConfig)
        ],
        declarations: [
         ProfesorPage
        ]
      }).compileComponents();
    });
  
    it('1. Levantar la pÃ¡gina profesor', ()=>{
        const fixture = TestBed.createComponent(ProfesorPage);
        const app = fixture.componentInstance;
        
        expect(app).toBeTruthy();
      });

    
    });