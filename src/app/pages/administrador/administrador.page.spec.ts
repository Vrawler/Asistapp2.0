import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { environment } from "src/environments/environment";
import { AdministradorPage } from "./administrador.page";

describe('PRUEBA UNITARIAS: administrador', ()=>{
  
    //configurar ambiente de pruebas:
    beforeEach( async ()=>{
      await TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          FormsModule,
          AngularFireModule.initializeApp(environment.firebaseConfig)
        ],
        declarations: [
          AdministradorPage
        ]
      }).compileComponents();
    });
  
  
    it('1. Levantar la página administrador', ()=>{
      const fixture = TestBed.createComponent(AdministradorPage);
      const app = fixture.componentInstance;
      
      expect(app).toBeTruthy();
    });
    
    it('2. Formulario inválido', ()=> {
      const fixture = TestBed.createComponent(AdministradorPage);
      const app = fixture.componentInstance;
  
      let rut = app.usuario.controls['rut'];
      let email = app.usuario.controls['email'];
      rut.setValue('11.111.111-1');
      email.setValue('correofalso@muyfalso.falso');
  
      expect(app.usuario.valid).toBeFalse();
    });
  
    it('3. Formulario válido', ()=> {
      const fixture = TestBed.createComponent(AdministradorPage);
      const app = fixture.componentInstance;
      
      let rut = app.usuario.controls['rut'];
      let email = app.usuario.controls['email'];
      rut.setValue('12.6741.860-8');
      email.setValue('correo.real@duocuc.falso');
      
      expect(app.usuario.valid).toBeFalse();
    });
    
  
    it('4. Ejecutar el boton agregar sin datos', ()=>{
      const fixture = TestBed.createComponent(AdministradorPage);
      const app = fixture.componentInstance;
      
      let rut = app.usuario.controls['rut'];
      let email = app.usuario.controls['email'];
      rut.setValue('');
      email.setValue('')
    
      app.registrar();
  
      expect(app.v_agregar).toBeFalse();
    });
  
  
    /* it('5. Tener usuarios en firebase', ()=>{
      const fixture = TestBed.createComponent(HomePage);
      const app = fixture.componentInstance;
  
      app.listar();
  
      expect(app.usuarios.length).toBeGreaterThanOrEqual(0);
    }); */
  
  
  });