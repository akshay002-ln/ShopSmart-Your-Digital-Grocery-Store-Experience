import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor(private http: HttpClient) {}

  setCartCount(count: number): void {
    this.cartCount.next(count);
  }

  increaseCartCount(): void {
    const current = this.cartCount.getValue();
    this.cartCount.next(current + 1);
  }

  decreaseCartCount(): void {
    const current = this.cartCount.getValue();
    this.cartCount.next(current > 0 ? current - 1 : 0);
  }

  // ✅ ADD THIS METHOD to fetch count from backend
  updateCartCount(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.http.get<any[]>(`http://localhost:5100/cart/${userId}`).subscribe({
        next: (data) => {
          this.setCartCount(data.length);
        },
        error: (err) => {
          console.error('Failed to update cart count:', err);
          this.setCartCount(0); // fallback to 0 on error
        }
      });
    }
  }
}
