import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VacationService } from '../../services/vacation.service';
import { CartService } from '../../services/cart.service';
import { Customer, Country, Division, Cart, StatusType, PurchaseData } from '../../models/vacation.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="checkout-container">
      <h2>Checkout</h2>
      
      <form (ngSubmit)="onSubmit()" #checkoutForm="ngForm" class="checkout-form">
        <div class="card">
          <h3>Customer Information</h3>
          
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">First Name *</label>
              <input 
                type="text" 
                class="form-control"
                [(ngModel)]="customer.customer_first_name"
                name="firstName"
                required
                #firstName="ngModel"
              />
              <div class="error-message" *ngIf="firstName.invalid && firstName.touched">
                First name is required
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label">Last Name *</label>
              <input 
                type="text" 
                class="form-control"
                [(ngModel)]="customer.customer_last_name"
                name="lastName"
                required
                #lastName="ngModel"
              />
              <div class="error-message" *ngIf="lastName.invalid && lastName.touched">
                Last name is required
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Address *</label>
            <input 
              type="text" 
              class="form-control"
              [(ngModel)]="customer.address"
              name="address"
              required
              #address="ngModel"
            />
            <div class="error-message" *ngIf="address.invalid && address.touched">
              Address is required
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Country *</label>
              <select 
                class="form-control"
                [(ngModel)]="selectedCountryId"
                name="country"
                required
                (change)="onCountryChange()"
                #country="ngModel"
              >
                <option value="">Select Country</option>
                <option *ngFor="let country of countries" [value]="country.country_id">
                  {{ country.country }}
                </option>
              </select>
              <div class="error-message" *ngIf="country.invalid && country.touched">
                Country is required
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label">State/Province *</label>
              <select 
                class="form-control"
                [(ngModel)]="customer.division_id"
                name="division"
                required
                #division="ngModel"
                [disabled]="!selectedCountryId"
              >
                <option value="">Select State/Province</option>
                <option *ngFor="let div of divisions" [value]="div.division_id">
                  {{ div.division }}
                </option>
              </select>
              <div class="error-message" *ngIf="division.invalid && division.touched">
                State/Province is required
              </div>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Postal Code *</label>
              <input 
                type="text" 
                class="form-control"
                [(ngModel)]="customer.postal_code"
                name="postalCode"
                required
                #postalCode="ngModel"
              />
              <div class="error-message" *ngIf="postalCode.invalid && postalCode.touched">
                Postal code is required
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label">Phone *</label>
              <input 
                type="tel" 
                class="form-control"
                [(ngModel)]="customer.phone"
                name="phone"
                required
                #phone="ngModel"
              />
              <div class="error-message" *ngIf="phone.invalid && phone.touched">
                Phone number is required
              </div>
            </div>
          </div>
        </div>
        
        <div class="card">
          <h3>Order Summary</h3>
          <div class="order-items">
            <div class="order-item" *ngFor="let item of cartItems">
              <div class="item-info">
                <h4>{{ item.vacation.vacation_title }}</h4>
                <p>Base Price: \${{ item.vacation.travel_fare_price | number:'1.2-2' }}</p>
                <div *ngIf="item.excursions.length > 0">
                  <p><strong>Excursions:</strong></p>
                  <ul>
                    <li *ngFor="let excursion of item.excursions">
                      {{ excursion.excursion_title }} - \${{ excursion.excursion_price | number:'1.2-2' }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="item-total">
                \${{ getItemTotal(item) | number:'1.2-2' }}
              </div>
            </div>
          </div>
          
          <div class="order-total">
            <strong>Total: \${{ totalPrice | number:'1.2-2' }}</strong>
          </div>
        </div>
        
        <div class="form-actions">
          <button 
            type="submit" 
            class="btn btn-primary"
            [disabled]="checkoutForm.invalid || isProcessing"
          >
            {{ isProcessing ? 'Processing...' : 'Place Order' }}
          </button>
        </div>
      </form>
      
      <div class="success-message" *ngIf="orderSuccess">
        <div class="card success-card">
          <h3>Order Placed Successfully!</h3>
          <p>Your order tracking number is: <strong>{{ orderTrackingNumber }}</strong></p>
          <p>Thank you for your purchase!</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .checkout-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    .checkout-container h2 {
      text-align: center;
      color: white;
      margin-bottom: 30px;
      font-size: 2.5rem;
      font-weight: 700;
    }

    .checkout-form {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .card h3 {
      margin-bottom: 20px;
      color: #333;
      border-bottom: 2px solid #e9ecef;
      padding-bottom: 10px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .order-items {
      margin-bottom: 20px;
    }

    .order-item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 16px 0;
      border-bottom: 1px solid #e9ecef;
    }

    .order-item:last-child {
      border-bottom: none;
    }

    .item-info h4 {
      margin-bottom: 8px;
      color: #333;
    }

    .item-info p {
      margin-bottom: 4px;
      color: #666;
    }

    .item-info ul {
      margin: 8px 0 0 20px;
      color: #666;
    }

    .item-total {
      font-size: 1.1rem;
      font-weight: 600;
      color: #667eea;
    }

    .order-total {
      text-align: right;
      font-size: 1.3rem;
      padding-top: 16px;
      border-top: 2px solid #e9ecef;
      color: #333;
    }

    .form-actions {
      text-align: center;
    }

    .form-actions .btn {
      padding: 16px 48px;
      font-size: 1.1rem;
    }

    .success-card {
      text-align: center;
      background: linear-gradient(135deg, #28a745, #20c997);
      color: white;
    }

    .success-card h3 {
      color: white;
      border-bottom-color: rgba(255, 255, 255, 0.3);
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .order-item {
        flex-direction: column;
        gap: 12px;
      }
      
      .item-total {
        align-self: flex-end;
      }
    }
  `]
})
export class CheckoutComponent implements OnInit {
  customer: Customer = {
    customer_first_name: '',
    customer_last_name: '',
    address: '',
    postal_code: '',
    phone: '',
    division_id: 0
  };

  countries: Country[] = [];
  divisions: Division[] = [];
  selectedCountryId: number = 0;
  cartItems: any[] = [];
  totalPrice = 0;
  isProcessing = false;
  orderSuccess = false;
  orderTrackingNumber = '';

  constructor(
    private vacationService: VacationService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadCountries();
    this.loadCartItems();
  }

  loadCountries() {
    this.vacationService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

  onCountryChange() {
    if (this.selectedCountryId) {
      this.vacationService.getDivisionsByCountry(this.selectedCountryId).subscribe(divisions => {
        this.divisions = divisions;
      });
    } else {
      this.divisions = [];
    }
    this.customer.division_id = 0;
  }

  loadCartItems() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  getItemTotal(item: any): number {
    const vacationPrice = item.vacation.travel_fare_price;
    const excursionsPrice = item.excursions.reduce((sum: number, exc: any) => sum + exc.excursion_price, 0);
    return vacationPrice + excursionsPrice;
  }

  onSubmit() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    this.isProcessing = true;

    const cart: Cart = {
      package_price: this.totalPrice,
      party_size: 1,
      status: StatusType.PENDING,
      customer: this.customer,
      cartItems: this.cartItems
    };

    const purchaseData: PurchaseData = {
      customer: this.customer,
      cart: cart
    };

    this.vacationService.checkout(purchaseData).subscribe({
      next: (response) => {
        this.orderTrackingNumber = response.orderTrackingNumber;
        this.orderSuccess = true;
        this.isProcessing = false;
        this.cartService.clearCart();
      },
      error: (error) => {
        console.error('Checkout error:', error);
        alert('There was an error processing your order. Please try again.');
        this.isProcessing = false;
      }
    });
  }
}