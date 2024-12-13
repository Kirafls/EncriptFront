import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaencriptService {
  private apiUrl = 'http://localhost:3000/api/tarea'; // URL del servidor Express
  
  constructor(private http: HttpClient) { }
    // Método para obtener la tarea del servidor
    getTarea(): Observable<{ texto: string }> {
      return this.http.get<{ texto: string }>(this.apiUrl);
    }
    public getdata():Observable<any>{
      return this.http.get<any>(this.apiUrl);
    }

    private sol= 'http://localhost:3000/bd/sol';
      
    nuevaSol(mensaje:string,llave:string,algoritmo:string):Observable<any>{
      return this.http.post(this.sol,{mensaje,llave,algoritmo});
    }

    private state='http://localhost:3000/bd/cambio';

    cambioEstado(id:number):Observable<any>{
      return this.http.post(this.state,{id});
    }
    
    private registro='http://localhost:3000/bd/completo';

    tareaCompleta(cifrado:string,credito:number,user:string,id:number):Observable<any>{
      return this.http.post(this.registro,{cifrado,credito,user,id});
    }

    private credito='http://localhost:3000/mostrar/creditos'

    mostrarCreditos(user:string):Observable<any>{
      return this.http.post(this.credito,{user});
    }

    private top='http://localhost:3000/mostrar/colaborador'

    colaborador():Observable<any>{
      return this.http.get(this.top);
    }

}
