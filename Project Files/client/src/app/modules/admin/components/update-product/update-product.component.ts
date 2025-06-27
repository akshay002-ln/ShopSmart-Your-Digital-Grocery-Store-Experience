import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  public data: any[] = [];
  public productDetails2 = {};
  public isLoading = false;

  regForm: FormGroup;

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {
    // ✅ Create form with 'unit' field included
    this.regForm = new FormGroup({
      productname: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      countInStock: new FormControl(null, Validators.required),
      rating: new FormControl(null, Validators.required),
      unit: new FormControl('Kg') // ✅ new optional field
    });

    // ✅ Fetch product details and prefill form
    const productId = this.route.snapshot.paramMap.get('id');
    this.http.get<any>(`http://localhost:5100/products/${productId}`)
      .subscribe((res) => {
        this.productDetails2 = res;
        this.regForm.patchValue({
          productname: res.productname,
          description: res.description,
          price: res.price,
          image: res.image,
          category: res.category,
          countInStock: res.countInStock,
          rating: res.rating,
          unit: res.unit || 'Kg' // ✅ fallback if not set
        });
      });

    // ✅ Access protection for admin
    const jwtToken = localStorage.getItem('adminJwtToken');
    if (!jwtToken) {
      window.alert("You can't access this!");
      this.router.navigate(['/login']);
    }
  }

  // ✅ Update product
  onUpdate(): void {
    if (this.regForm.invalid) return;
    this.isLoading = true;

    const productId = this.route.snapshot.paramMap.get('id');
    const updatedProduct = this.regForm.value;

    this.http.put(`http://localhost:5100/products/${productId}`, updatedProduct)
      .subscribe((res) => {
        if (res) {
          window.alert('Product Updated Successfully!');
          this.router.navigate(['/admin/dashboard']);
          this.http.get<any[]>('http://localhost:5100/products')
            .subscribe((data) => {
              this.data = data;
              this.isLoading = false;
            });
        }
      });
  }
}
