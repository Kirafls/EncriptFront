import { Component } from '@angular/core';
import { TareaencriptService } from 'src/app/services/tareaencript.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css'],
})
export class TareaComponent {
  id: number =0;
  mensaje = '';
  llave = '';
  algoritmo: number = 0;
  cifrado = '';
  credito: number = 0;
  estado: number = 0;
  user : string = ' ';

  constructor(private tarea: TareaencriptService) {}

  ngOnInit() {
    this.solicitarTarea();
  }

  solicitarTarea(): void {
    this.tarea.getdata().subscribe(
      (data) => {
        // Accede al primer elemento del array
        if (data && data.length > 0) {
          const tarea = data[0];
          console.log(data[0]);
          // Asigna los valores desde el objeto de la API
          this.id=tarea.id;
          this.mensaje = tarea.mensaje;
          this.llave = tarea.llave;
          this.algoritmo = tarea.algoritmo;
          this.credito = tarea.credito;
          this.estado = tarea.estado;
          this.user=localStorage.getItem('username')||'';

        }
      },
      (error) => {
        console.error('Error al obtener la tarea:', error);
      }
    );
  }

  encriptarHMAC(mensaje: string, llave: string): string {
    if (!mensaje || !llave) {
      console.error('Mensaje o llave no proporcionados');
      return '';
    }
    try {
      const hmac = CryptoJS.HmacSHA256(mensaje, llave);
      return hmac.toString();  // Devuelve el HMAC como string
    } catch (error) {
      console.error('Error al generar HMAC:', error);
      return '';
    }
  }

  encriptarHash(mensaje: string): string {
    if (!mensaje) {
      console.error('Mensaje no proporcionado');
      return ''; // Retorna un valor vacío si falta mensaje
    }
    return CryptoJS.SHA256(mensaje).toString();
  }

  encriptacion(): void {
    if (!this.mensaje || !this.llave) {
      alert("No hay tareas para encriptar \nIntenta más tarde...");
      return;
    }
  
    this.tarea.cambioEstado(this.id).subscribe({
      next: () => {
        // Realizar encriptación
        this.realizarEncriptacion();
  
        // Registrar los resultados en el backend
        this.tarea.tareaCompleta(this.cifrado, this.credito, this.user, this.id).subscribe({
          next: (data) => console.log('Tarea completada:', data),
          error: (error) => console.error('Error al completar tarea:', error),
        });
      },
      error: (error) => console.error('Error al cambiar estado:', error),
    });
  }
  
  private realizarEncriptacion(): void {
    if (this.algoritmo === 1) {
      this.cifrado = this.encriptarHMAC(this.mensaje, this.llave);
      this.credito = 10;
    } else {
      this.cifrado = this.encriptarHash(this.mensaje);
      this.credito = 5;
    }
    this.estado = 1;
  
    // Logs
    console.log('Cifrado:', this.cifrado);
    console.log('Crédito:', this.credito);
    console.log('Estado:', this.estado);
    console.log('Usuario:', this.user);
  }
}
