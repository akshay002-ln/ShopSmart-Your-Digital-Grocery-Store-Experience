import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // ✅ Check token on component load
    this.isLoggedIn = !!localStorage.getItem('jwtToken');
  }

  onShop() {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/shopping']);
    }
  }

  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    this.isLoggedIn = false; // ✅ update the flag
    window.alert('User logged out!');
    this.router.navigate(['/login']);
  }
}
