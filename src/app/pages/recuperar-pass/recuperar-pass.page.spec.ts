import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { environment } from "src/environments/environment";
import { RecuperarPassPage } from "./recuperar-pass.page";

describe('PRUEBA UNITARIAS: recuperarpass', ()=>{
  
    //configurar ambiente de pruebas:
    beforeEach( async ()=>{
      await TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          FormsModule,
          AngularFireModule.initializeApp(environment.firebaseConfig)
        ],
        declarations: [
         RecuperarPassPage
        ]
      }).compileComponents();
    });
  
    it('1. Levantar la pÃ¡gina recuperar pass', ()=>{
        const fixture = TestBed.createComponent(RecuperarPassPage);
        const app = fixture.componentInstance;
        
        expect(app).toBeTruthy();
      });
    });