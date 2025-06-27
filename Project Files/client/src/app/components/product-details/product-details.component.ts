import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/services/cart.service'; // make sure it's imported

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public product: any;
  public isLoading = false

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router:Router,
    private cartService: CartService
  ) { 
    
    const token = localStorage.getItem("jwtToken")
    if (!token) {
      window.alert("You can't Access this! because your not an loggedin user!")
      this.router.navigate(['/login'])
    }
  }

  ngOnInit() {
    this.isLoading = true
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      this.http.get(`http://localhost:5100/products/${productId}`).subscribe(product => {
        this.product = product;
        this.isLoading = false
      });
    });
  }

  onAddToCart(productId: string): void {
  const userId = localStorage.getItem('userId');
  this.http.post('http://localhost:5100/add-to-cart', { userId, productId }).subscribe(
    (response) => {
      window.alert('Product added to cart!');
      this.cartService.updateCartCount(); // ✅ Refresh cart count
    },
    (error) => {
      console.error(error);
      window.alert('Error occurred while adding the product to cart!');
    }
  );
}
}
