import { Component } from '@angular/core';
import { TareaencriptService } from 'src/app/services/tareaencript.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent {
  texto: string = '';
  textoEncriptado: string = '';
  claveSecreta: string = 'fls'; // Puedes cambiar esto
  mensaje: string = '';
  constructor(private tarea:TareaencriptService){}
  encriptar():void{
    this.tarea.getTarea().subscribe(
      (respuesta) => {
        this.texto = respuesta.texto; // Guardar el texto recibido
        this.encriptarTexto(); // Llamar al método para encriptar
        this.enviarTarea(); // Llamar al método para enviar al servidor
      },
      (error) => {
        console.error('Error al obtener la tarea', error);
      }
    );
  }
  
  ngOnInit(): void {
    // Obtener el texto desde el servidor
   
  }
    // Método para encriptar el texto
    encriptarTexto(): void {
      this.textoEncriptado = CryptoJS.AES.encrypt(this.texto, this.claveSecreta).toString();
    }
  
    // Método para enviar el texto encriptado al servidor
    enviarTarea(): void {
      this.tarea.sendTarea(this.textoEncriptado).subscribe(
        (response) => {
          this.mensaje = response.mensaje || 'Texto enviado correctamente';
        },
        (error) => {
          console.error('Error al enviar la tarea', error);
          this.mensaje = 'Error al enviar el texto al servidor';
        }
      );
    }
}
