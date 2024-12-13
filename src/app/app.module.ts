import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginInterceptor } from './interceptors/login.interceptor';
import { LoginComponent } from './components/login/login.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './components/inicio/inicio.component';
import { TareaComponent } from './components/tarea/tarea.component';
import { NuevouserComponent } from './components/nuevouser/nuevouser.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EstadisticaComponent } from './components/estadistica/estadistica.component'; 


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProtectedComponent,
    InicioComponent,
    TareaComponent,
    NuevouserComponent,
    SolicitudComponent,
    EstadisticaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
