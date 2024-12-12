import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { AuthGuard } from './guards/auth.guard';
import { InicioComponent } from './components/inicio/inicio.component';
import { TareaComponent } from './components/tarea/tarea.component';
import { NuevouserComponent } from './components/nuevouser/nuevouser.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'createuser', component: NuevouserComponent},
  {
    path: 'protected',
    component: ProtectedComponent, // Se carga el ProtectedComponent
    canActivate: [AuthGuard],
    children: [
      {
        path: 'inicio',
        component: InicioComponent // Aquí definimos que 'inicio' se cargue dentro de ProtectedComponent
      },
      {
        path: 'tarea',
        component: TareaComponent
      }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige a /login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}