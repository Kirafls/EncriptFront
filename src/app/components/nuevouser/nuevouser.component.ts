import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { NuserService } from 'src/app/services/nuser.service'; 
@Component({
  selector: 'app-nuevouser',
  templateUrl: './nuevouser.component.html',
  styleUrls: ['./nuevouser.component.css']
})
export class NuevouserComponent {
  username: string = '';
  password: string = '';
  pass:string='';
  errorMessage: string = '';
  constructor(private router:Router,private nuser:NuserService){}
  createuser():void{
    if(this.pass===this.password){
      this.nuser.sendUser(this.username,this.password).subscribe({
        next:(response)=>{
          if(response){
            alert("Se ha creado el nuevo Usuario");
            this.router.navigate(['/login'])
          }
          else{
            alert("Error en el servidor");
          }
        }
      })
    }
    else{
      alert("Las contraseñas no coinciden");
    }
  }

  cancel():void{
    this.router.navigate(['/login']);
  }
}
