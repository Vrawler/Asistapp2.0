import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { environment } from "src/environments/environment";
import { PerfilPage } from "./perfil.page";

describe('PRUEBA UNITARIAS: home', ()=>{
  
    //configurar ambiente de pruebas:
    beforeEach( async ()=>{
      await TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          FormsModule,
          AngularFireModule.initializeApp(environment.firebaseConfig)
        ],
        declarations: [
         PerfilPage
        ]
      }).compileComponents();
    });
  
    it('1. Levantar la pÃ¡gina perfil', ()=>{
        const fixture = TestBed.createComponent(PerfilPage);
        const app = fixture.componentInstance;
        
        expect(app).toBeTruthy();
      });

    it('2. Rescate de datos', ()=>{
        const fixture = TestBed.createComponent(PerfilPage);
        const app = fixture.componentInstance;
        
        expect(app.rut).toBeDefined();
      });
    });