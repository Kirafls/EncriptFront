import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TareaencriptService } from 'src/app/services/tareaencript.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent {
  solicitudForm: FormGroup;
  success: boolean = false;

  constructor(private fb: FormBuilder,private solicitud:TareaencriptService) {
    // Inicialización del formulario
    this.solicitudForm = this.fb.group({
      //id: ['', Validators.required],
      //estado: ['', Validators.required],
      mensaje: ['', Validators.required],
      //cifrado: [''],
      llave: ['',Validators.required],
      algoritmo: ['',Validators.required],
      //credito: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.solicitudForm.valid) {
      const datos=this.solicitudForm.value;
      console.log('Datos enviados:', this.solicitudForm.value);
      this.solicitud.nuevaSol(datos.mensaje,datos.llave,datos.algoritmo).subscribe({
        next:(response)=>{
          if(response){
            alert("Se ha almacenado la solicitud");
          }
          else{
            alert("Error en el servidor");
          }
        }
      });
      this.success = true;
      this.solicitudForm.reset(); // Opcional: limpiar el formulario después de enviarlo
    }
  }
}
