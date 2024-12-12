import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: LoginService,private router:Router) {}

  login() {
    this.authService
      .login({ username: this.username, password: this.password })
      .subscribe({
        next: (response) => {
          // Asegúrate de manejar correctamente la respuesta
          if (response && response.token) {
            this.authService.saveToken(response.token);
            console.log('Inicio de sesión exitoso');
            this.router.navigate(['/protected']); // Redirige a la ruta protegida
          } else {
            console.error('Respuesta inesperada del servidor');
          }
        },
        error: (err) => {
          console.error('Error en el inicio de sesión:', err);
          this.errorMessage = 'Credenciales incorrectas o error en el servidor';
          alert(this.errorMessage);
        },
      });
  }
  createUser():void{
    this.router.navigate(['/createuser']);
  }
  
}
