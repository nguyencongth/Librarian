import { Component, Input } from '@angular/core';
import { AuthService } from '../../core/Services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) { }

  username: string;
  password: string;

  login(): void {
    if (!this.username || !this.password) {
      window.alert('The username or password cant be blank');
      return;
    }
    this.authService.login(this.username, this.password)
      .subscribe((loggedIn: boolean) => {
        if (loggedIn) {
          this.router.navigate(['/dashboard'])
        }
        else {
          this.router.navigate(['/login']);
          window.alert("The username or password incorrect");
          this.username = '';
          this.password = '';
        }
      });
  }
}
