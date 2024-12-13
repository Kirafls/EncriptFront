import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent {
  constructor(private login:LoginService,private router:Router){}
  isAuthenticated(): boolean {
    return this.login.isAuthenticated();
    
  }
  logout(): void {
    this.login.removeToken();
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
