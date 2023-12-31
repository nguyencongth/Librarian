import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface Manager {
  id: number;
  username: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LoggedIn = false;
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<boolean> {

    return this.http.get<Manager[]>(`${this.apiUrl}/manager`).pipe(
      map(managers => {
        console.log(managers);
        const account = managers.find(manager => {
          return manager.username === username && manager.password === password;
        });
        if (account) {
          this.LoggedIn = true;
          localStorage.setItem('loggedIn', 'true');
          return true;
        } else {
          return false;
        }
      })
    );

  }

  isLoggedIn(): boolean {
    return this.LoggedIn;
  }

}
