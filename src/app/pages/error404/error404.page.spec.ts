import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { environment } from "src/environments/environment";
import { Error404Page } from "./error404.page";

describe('PRUEBA UNITARIAS: error404', ()=>{
  
    //configurar ambiente de pruebas:
    beforeEach( async ()=>{
      await TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          FormsModule,
          AngularFireModule.initializeApp(environment.firebaseConfig)
        ],
        declarations: [
         Error404Page
        ]
      }).compileComponents();
    });
  
    it('1. Levantar la pÃ¡gina error404', ()=>{
        const fixture = TestBed.createComponent(Error404Page);
        const app = fixture.componentInstance;
        
        expect(app).toBeTruthy();
      });

      it('2. Vuelta a la pagina de inicio', ()=>{
        const fixture = TestBed.createComponent(Error404Page);
        const app = fixture.componentInstance;
        
        
        expect(app).toBeTruthy();
      });

    });