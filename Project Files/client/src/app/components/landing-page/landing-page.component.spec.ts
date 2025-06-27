import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingPageComponent } from './landing-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingPageComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should filter products by search input', () => {
    component.data = [
      { productname: 'Apple', category: 'fruits' },
      { productname: 'Banana', category: 'fruits' },
      { productname: 'Milk', category: 'dairy' }
    ];
    component.searchInput = 'milk';
    component.filterItems();

    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].productname).toBe('Milk');
  });

  it('should filter products by selected category', () => {
    component.data = [
      { productname: 'Apple', category: 'fruits' },
      { productname: 'Banana', category: 'fruits' },
      { productname: 'Milk', category: 'dairy' }
    ];
    component.selectedCategories = ['fruits'];
    component.filterItems();

    expect(component.filteredProducts.length).toBe(2);
    expect(component.filteredProducts.every(p => p.category === 'fruits')).toBeTrue();
  });

  it('should toggle category selection', () => {
    component.selectedCategories = [];
    component.onCategoryToggle('fruits');
    expect(component.selectedCategories).toContain('fruits');

    component.onCategoryToggle('fruits');
    expect(component.selectedCategories).not.toContain('fruits');
  });
});
