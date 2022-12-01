import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { environment } from "src/environments/environment";
import { RegistrarPage } from './registrar.page';

describe('PRUEBA UNITARIAS: Registrar', ()=>{
  
    //configurar nuestro ambiente de pruebas:
    beforeEach( async ()=>{
      await TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          FormsModule,
          AngularFireModule.initializeApp(environment.firebaseConfig)
        ],
        declarations: [
          RegistrarPage
        ]
      }).compileComponents();
    });
  
  
    it('1. Levantar la página Registrar', ()=>{
      const fixture = TestBed.createComponent(RegistrarPage);
      const app = fixture.componentInstance;
      
      expect(app).toBeTruthy();
    });
    
    it('2. Formulario inválido', ()=> {
      const fixture = TestBed.createComponent(RegistrarPage);
      const app = fixture.componentInstance;
  
      let rut = app.usuario.controls['rut'];
      let email = app.usuario.controls['email'];
      rut.setValue('15.345.786-8');
      email.setValue('juju@alumnos.duocuc.cl');
  
      expect(app.usuario.valid).toBeFalse();
    });
  
    it('3. Formulario válido', ()=> {
      const fixture = TestBed.createComponent(RegistrarPage);
      const app = fixture.componentInstance;
      
      let rut = app.usuario.controls['rut'];
      let email = app.usuario.controls['email'];
      rut.setValue('20.614.672-9');
      email.setValue('javiera@duocuc.cl');
      
      expect(app.usuario.valid).toBeFalse();
    });
    
  
    it('4. Ejecutar el boton agregar sin datos', ()=>{
      const fixture = TestBed.createComponent(RegistrarPage);
      const app = fixture.componentInstance;
      
      let rut = app.usuario.controls['rut'];
      let email = app.usuario.controls['email'];
      rut.setValue('');
      email.setValue('')
    
      app.registrar();
  
      expect(app.usuarios).toBeFalse();
    });
  
  
    /* it('5. Tener usuarios en firebase', ()=>{
      const fixture = TestBed.createComponent(HomePage);
      const app = fixture.componentInstance;
  
      app.listar();
  
      expect(app.usuarios.length).toBeGreaterThanOrEqual(0);
    }); */
  
  
  });