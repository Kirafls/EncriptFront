import { Component } from '@angular/core';
import { TareaencriptService } from 'src/app/services/tareaencript.service';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent {
  user: string = ''; // Almacenará el nombre de usuario
  creditos: number = 0; // Almacenará los créditos totales
  colaboradores: any[] = []; // Almacenará los datos de colaboradores

  constructor(private tarea: TareaencriptService) {}

  ngOnInit() {
    this.user = localStorage.getItem('username') || ''; // Obtener el nombre de usuario desde localStorage

    // Obtener los créditos del usuario
    this.tarea.mostrarCreditos(this.user).subscribe(
      (data) => {
        console.log('Creditos:', data[0]); // Imprime los créditos de usuario
        this.creditos = data[0].Suma_total; // Asigna los créditos totales
      },
      (error) => {
        console.log(error);
      }
    );

    // Obtener la lista de colaboradores
    this.tarea.colaborador().subscribe(
      (data) => {
        console.log('Colaboradores:', data); // Imprime los datos de los colaboradores
        this.colaboradores = data; // Asigna los datos de colaboradores a la variable
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
