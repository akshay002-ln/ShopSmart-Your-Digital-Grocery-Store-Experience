import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  constructor(private router: Router) {}

logout(): void {
  const isAdmin = localStorage.getItem('adminJwtToken');

  if (isAdmin) {
    localStorage.removeItem('adminJwtToken');
    window.alert('Admin logged out!');
  } else {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    window.alert('User logged out!');
  }

  this.router.navigate(['/login']);
}
}
