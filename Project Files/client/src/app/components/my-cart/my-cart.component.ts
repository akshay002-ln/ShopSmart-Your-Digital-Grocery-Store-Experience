import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service'; // ✅ Import CartService

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent {
  public cartList: any[] = [];
  public isLoading = false;

  constructor(
    private http: HttpClient,
    private route: Router,
    private cartService: CartService // ✅ Inject CartService
  ) {
    this.isLoading = true;

    const jwtToken = localStorage.getItem('adminJwtToken');
    if (jwtToken) {
      this.route.navigate(['/admin/home']);
    }

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      window.alert("You can't access this because you're not a logged-in user!");
      this.route.navigate(['/login']);
      return;
    }

    const userId = localStorage.getItem('userId');
    this.fetchCart(userId!); // ✅ Load cart
  }

  fetchCart(userId: string): void {
    this.http.get<any[]>(`http://localhost:5100/cart/${userId}`).subscribe(data => {
      this.cartList = data;
      this.cartService.setCartCount(this.cartList.length); // ✅ Update global count
      this.isLoading = false;
    });
  }

  onRemove(id: string): void {
    this.isLoading = true;
    this.http.delete(`http://localhost:5100/remove-from-cart/${id}`).subscribe(() => {
      window.alert('Item removed from cart.');
      const userId = localStorage.getItem('userId');
      this.fetchCart(userId!); // ✅ Refresh cart and count
    });
  }
}
