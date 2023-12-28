import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LoggedIn = false;

  constructor(private http: HttpClient) { }
  login(username: string, password: string): Promise<boolean> {
    return this.http.get<any>("http://localhost:3000/manager", {
      params: {username, password},
    })
    .toPromise()
    .then((managers: any[]) => {
      const foundManager = managers.find(m => m.username === username && m.password === password);
      if(foundManager) {
        this.LoggedIn = true;
        localStorage.setItem('LoggedIn', 'true');
        return true;
      }
      return false;
    })
  }

  isLoggedIn(): boolean {
    return this.LoggedIn;
  }
}
