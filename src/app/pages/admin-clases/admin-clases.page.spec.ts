import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { environment } from "src/environments/environment";
import { AdminClasesPage } from './admin-clases.page';

describe('PRUEBA UNITARIAS: Admin-clases', ()=>{
  
  //configurar nuestro ambiente de pruebas:
  beforeEach( async ()=>{
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      declarations: [
        AdminClasesPage
      ]
    }).compileComponents();
  });


  it('1. Levantar la página admin-clases', ()=>{
    const fixture = TestBed.createComponent(AdminClasesPage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });
  
  it('2. Formulario inválido', ()=> {
    const fixture = TestBed.createComponent(AdminClasesPage);
    const app = fixture.componentInstance;

    let rut = app.asignatura.controls['sigla_asig'];
    rut.setValue('PRUEBAMAL1');

    expect(app.asignatura.valid).toBeFalse();
  });

  it('3. Formulario válido', ()=> {
    const fixture = TestBed.createComponent(AdminClasesPage);
    const app = fixture.componentInstance;
    
    let sigla_asig = app.asignatura.controls['sigla_asig'];
    let nombre = app.asignatura.controls['nom_asig'];
    sigla_asig.setValue('PBN0010');
    nombre.setValue('Prueba crear asig');
    
    expect(app.asignatura.valid).toBeFalse();
  });
  

  it('4. Ejecutar el boton agregar sin datos', ()=>{
    const fixture = TestBed.createComponent(AdminClasesPage);
    const app = fixture.componentInstance;
    
    let sigla_asig = app.asignatura.controls['sigla_asig'];
    let nombre = app.asignatura.controls['nom_asig'];
    sigla_asig.setValue('');
    nombre.setValue('');
  
    app.registrarAsignatura();

    expect(app.v_agregar).toBeFalse();
  });


  /* it('5. Tener usuarios en firebase', ()=>{
    const fixture = TestBed.createComponent(HomePage);
    const app = fixture.componentInstance;

    app.listar();

    expect(app.usuarios.length).toBeGreaterThanOrEqual(0);
  }); */


});