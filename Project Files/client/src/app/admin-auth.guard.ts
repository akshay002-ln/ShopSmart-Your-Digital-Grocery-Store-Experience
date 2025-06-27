import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('adminJwtToken');

    if (token) {
      // ✅ Admin is logged in
      return true;
    }

    // ⛔ Not logged in as admin – redirect to login
    this.router.navigate(['/login']);
    return false;
  }
}
