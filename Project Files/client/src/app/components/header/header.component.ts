import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isAdmin = false;
  public token = false;
  public cartCount = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // 🔁 Subscribe to auth state changes
    this.authService.loginStatus$.subscribe(() => {
      this.checkUserRole(); // Update visibility
    });

    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    // Initial load
    this.checkUserRole();
    this.cartService.updateCartCount();
  }

  checkUserRole(): void {
    const userToken = localStorage.getItem('jwtToken');
    const adminToken = localStorage.getItem('adminJwtToken');

    if (adminToken) {
      this.isAdmin = true;
      this.token = true;
    } else if (userToken) {
      this.isAdmin = false;
      this.token = true;
    } else {
      this.isAdmin = false;
      this.token = false;
    }
  }

  onLogout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('adminJwtToken');
    localStorage.removeItem('userId');
    this.cartService.setCartCount(0);
    this.authService.logout(); // 🔁 Notify
    this.token = false;
    this.isAdmin = false;
    this.router.navigate(['/home']);
    window.alert('Logout Successful!');
  }
}
