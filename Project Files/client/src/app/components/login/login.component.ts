import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; // ✅ Import AuthService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  regForm: FormGroup;

  constructor(
    private http: HttpClient,
    private route: Router,
    private authService: AuthService // ✅ Inject AuthService
  ) {
    this.regForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });

    // Auto-redirect if already logged in
    const adminToken = localStorage.getItem('adminJwtToken');
    const userToken = localStorage.getItem('jwtToken');

    if (adminToken) {
      this.route.navigate(['/admin/dashboard']);
    } else if (userToken) {
      this.route.navigate(['/home']);
    }
  }

  onSubmit(details = { email: String, password: String }): void {
    this.http.post('http://localhost:5100/login', details).subscribe(
      (response: any) => {
        if (response && response.user) {
          localStorage.setItem('userId', response.user._id);

          if (response.adminJwtToken) {
            localStorage.setItem('adminJwtToken', response.adminJwtToken);
            this.authService.login(); // ✅ Notify app of login
            window.alert('Admin Login Successfully!');
            this.route.navigate(['/admin/dashboard']);
          } else if (response.token) {
            localStorage.setItem('jwtToken', response.token);
            this.authService.login(); // ✅ Notify app of login
            window.alert('User Login Successfully!');
            this.route.navigate(['/home']);
          } else {
            window.alert('Login failed! Invalid token.');
          }
        } else {
          window.alert('Login failed! Invalid credentials.');
        }
      },
      (error) => {
        console.error(error);
        window.alert('Login failed! Email or Password is wrong');
      }
    );
  }
}
