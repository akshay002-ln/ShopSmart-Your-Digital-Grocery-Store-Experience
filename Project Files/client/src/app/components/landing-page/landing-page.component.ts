import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service'; // ✅ Imported

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  public data: any[] = [];
  public filteredProducts: any[] = [];
  public categories: string[] = [];
  public selectedCategories: string[] = [];
  public searchInput: string = '';
  public itemId: string = '';
  public product: any = {};
  public isLoading = false;
  public showCategories: boolean = false;

  regForm: FormGroup;

  constructor(
    private http: HttpClient,
    private route: Router,
    private cartService: CartService // ✅ Injected
  ) {
    this.isLoading = true;

    this.regForm = new FormGroup({
      user: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      paymentMethod: new FormControl(null, Validators.required)
    });

    // Fetch products
    this.http.get<any[]>('http://localhost:5100/products').subscribe(data => {
      this.data = data;
      this.filteredProducts = data;
      this.isLoading = false;
    });

    // Fetch categories
    this.http.get<any[]>('http://localhost:5100/api/categories').subscribe(res => {
      this.categories = res.map(c => c.category.toLowerCase());
    });

    // Admin check
    const jwtToken = localStorage.getItem('adminJwtToken');
    if (jwtToken) {
      window.alert("You can't access this page as Admin!");
      this.route.navigate(['/admin/home']);
    }
  }

  filterItems(): void {
    this.filteredProducts = this.data.filter(product => {
      const searchMatch =
        !this.searchInput || product.productname.toLowerCase().includes(this.searchInput.toLowerCase());

      const categoryMatch =
        this.selectedCategories.length === 0 ||
        this.selectedCategories.includes(product.category.toLowerCase());

      return searchMatch && categoryMatch;
    });
  }

  onCategoryToggle(category: string): void {
    const index = this.selectedCategories.indexOf(category);
    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }
    this.filterItems();
  }

  onAddToCart(productId: string): void {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      window.alert('Please log in to add items to your cart.');
      this.route.navigate(['/login']);
      return;
    }

    const body = { userId, productId };

    this.http.post('http://localhost:5100/add-to-cart', body).subscribe(
      () => {
        window.alert('Product added to cart!');
        this.cartService.updateCartCount(); // ✅ Update cart count immediately
      },
      (error) => {
        console.error('Add to cart failed:', error);
        window.alert('An error occurred while adding the product to cart.');
      }
    );
  }
}
