import { Component } from '@angular/core';
import { TareaencriptService } from 'src/app/services/tareaencript.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css'],
})
export class TareaComponent {
  mensaje = '';
  llave = '';
  algoritmo: number = 0;
  cifrado = '';
  credito: number = 0;
  estado: number = 0;
  user : string | null = '';

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
          this.mensaje = tarea.mensaje;
          this.llave = tarea.llave;
          this.algoritmo = tarea.algoritmo;
          this.credito = tarea.credito;
          this.estado = tarea.estado;
          this.user=localStorage.getItem('username');
          // Imprimir los valores para depuración
          //console.log('Mensaje:', this.mensaje);
          //console.log('Llave:', this.llave);
          //console.log('Algoritmo:', this.algoritmo);
          //console.log('Credito:', this.credito);
          //console.log('Estado:', this.estado);

          // Realizar encriptación una vez que los datos están listos
          this.encriptacion();
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
    if (this.algoritmo === 1) {
      this.cifrado = this.encriptarHMAC(this.mensaje, this.llave);
      this.credito = 10; // Asignar crédito si se usa encriptación AES
    } else {
      this.cifrado = this.encriptarHash(this.mensaje);
      this.credito = 5; // Asignar crédito si se usa encriptación SHA256
    }    // Actualiza el estado a 1 después de la encriptación
    this.estado = 1;
    // Imprimir los resultados después de la encriptación
    console.log('Cifrado:', this.cifrado);
    console.log('Credito:', this.credito);
    console.log('Estado:', this.estado);
    console.log('User:',this.user);
  }
}
