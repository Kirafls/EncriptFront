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
    
}
