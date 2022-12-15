import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { environment } from "src/environments/environment";
import { LoginPage } from "./login.page";

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
         LoginPage
        ]
      }).compileComponents();
    });
  
    it('1. Levantar la pÃ¡gina login', ()=>{
        const fixture = TestBed.createComponent(LoginPage);
        const app = fixture.componentInstance;
        
        expect(app).toBeTruthy();
      });
    
    it('2. Ingreso a la pagina con credenciales de admin', ()=>{
        const fixture = TestBed.createComponent(LoginPage);
        const app = fixture.componentInstance;

        let validarCorreo = app.usuario.controls['validarCorreo'];
        let validarPassw = app.usuario.controls['validarPassw'];
        validarCorreo.setValue('mit.anzai@duoc.cl');
        validarPassw.setValue('blanco');

        expect(app.login).toBeTruthy();
    })

    it('3. Ingreso a la pagina con credenciales de profesor', ()=>{
        const fixture = TestBed.createComponent(LoginPage);
        const app = fixture.componentInstance;

        let validarCorreo = app.usuario.controls['validarCorreo'];
        let validarPassw = app.usuario.controls['validarPassw'];
        validarCorreo.setValue('ri.sanch@profesor.duoc.cl');
        validarPassw.setValue('szechuan');

        expect(app.login).toBeTruthy();
    })

    it('4. Ingreso a la pagina con credenciales de alumno', ()=>{
        const fixture = TestBed.createComponent(LoginPage);
        const app = fixture.componentInstance;

        let validarCorreo = app.usuario.controls['validarCorreo'];
        let validarPassw = app.usuario.controls['validarPassw'];
        validarCorreo.setValue('mar.macfly@duocuc.cl');
        validarPassw.setValue('delorean');

        expect(app.login).toBeTruthy();
    })

    it('5. Ingreso a la pagina con credenciales invalidas', ()=>{
        const fixture = TestBed.createComponent(LoginPage);
        const app = fixture.componentInstance;

        let validarCorreo = app.usuario.controls['validarCorreo'];
        let validarPassw = app.usuario.controls['validarPassw'];
        validarCorreo.setValue('pepetapia');
        validarPassw.setValue('quedograbao');

        expect(app.login).toBeFalse();
    })
    });
    