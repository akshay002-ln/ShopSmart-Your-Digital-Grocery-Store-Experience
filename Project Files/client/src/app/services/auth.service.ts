import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Observable to track login status
  private loginStatusSubject = new BehaviorSubject<boolean>(this.checkLogin());
  public loginStatus$ = this.loginStatusSubject.asObservable();

  // 🧠 Check if either user or admin token exists
  private checkLogin(): boolean {
    return !!localStorage.getItem('jwtToken') || !!localStorage.getItem('adminJwtToken');
  }

  // ✅ Call this after login
  login(): void {
    this.loginStatusSubject.next(true);
  }

  // 🔓 Call this after logout
  logout(): void {
    this.loginStatusSubject.next(false);
  }

  // 🕵️‍♂️ Optional: can be used to check current login status manually
  isLoggedIn(): boolean {
    return this.loginStatusSubject.getValue();
  }
}
