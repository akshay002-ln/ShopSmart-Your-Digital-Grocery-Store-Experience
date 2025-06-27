import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {
  regForm: FormGroup;
  public isLoading = false;

  constructor(private http: HttpClient, private route: Router) {
    // ✅ Add unit field here
    this.regForm = new FormGroup({
      productname: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      countInStock: new FormControl(null, Validators.required),
      rating: new FormControl(null, Validators.required),
      unit: new FormControl('Kg') // ✅ New field added with default value
    });

    const jwtToken = localStorage.getItem('adminJwtToken');
    if (!jwtToken) {
      window.alert("You can't access this!");
      this.route.navigate(['/login']);
    }
  }

  onSubmit(): void {
    if (this.regForm.invalid) return;
    this.isLoading = true;

    const details = this.regForm.value;

    this.http.post('http://localhost:5100/add-products', details).subscribe((response) => {
      window.alert("Product Added Successfully!");
      this.regForm.reset({ unit: 'Kg' }); // Reset form and set default unit
      this.isLoading = false;
    });
  }
}
