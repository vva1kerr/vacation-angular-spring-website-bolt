import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/vacation.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cart-container">
      <h2>Shopping Cart</h2>
      
      <div class="empty-cart" *ngIf="cartItems.length === 0">
        <p>Your cart is empty</p>
        <p>Add some vacation packages to get started!</p>
      </div>

      <div class="cart-items" *ngIf="cartItems.length > 0">
        <div class="cart-item card" *ngFor="let item of cartItems">
          <div class="item-image">
            <img [src]="item.vacation.image_url" [alt]="item.vacation.vacation_title" />
          </div>
          
          <div class="item-details">
            <h3>{{ item.vacation.vacation_title }}</h3>
            <p class="item-price">Base Price: \${{ item.vacation.travel_fare_price | number:'1.2-2' }}</p>
            
            <div class="excursions" *ngIf="item.excursions.length > 0">
              <h4>Selected Excursions:</h4>
              <ul>
                <li *ngFor="let excursion of item.excursions">
                  {{ excursion.excursion_title }} - \${{ excursion.excursion_price | number:'1.2-2' }}
                </li>
              </ul>
            </div>
            
            <div class="item-total">
              <strong>Total: \${{ getItemTotal(item) | number:'1.2-2' }}</strong>
            </div>
          </div>
          
          <button 
            class="btn btn-secondary remove-btn"
            (click)="removeFromCart(item.vacation.vacation_id)"
          >
            Remove
          </button>
        </div>
        
        <div class="cart-summary card">
          <h3>Order Summary</h3>
          <div class="summary-line">
            <span>Items ({{ cartItems.length }}):</span>
            <span>\${{ totalPrice | number:'1.2-2' }}</span>
          </div>
          <div class="summary-total">
            <strong>Total: \${{ totalPrice | number:'1.2-2' }}</strong>
          </div>
          <button class="btn btn-primary checkout-btn">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cart-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    .cart-container h2 {
      text-align: center;
      color: white;
      margin-bottom: 30px;
      font-size: 2.5rem;
      font-weight: 700;
    }

    .empty-cart {
      text-align: center;
      color: white;
      padding: 40px;
    }

    .empty-cart p {
      font-size: 1.2rem;
      margin-bottom: 10px;
    }

    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .cart-item {
      display: flex;
      gap: 20px;
      align-items: flex-start;
      position: relative;
    }

    .item-image {
      width: 150px;
      height: 100px;
      flex-shrink: 0;
      overflow: hidden;
      border-radius: 8px;
    }

    .item-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .item-details {
      flex: 1;
    }

    .item-details h3 {
      margin-bottom: 8px;
      color: #333;
    }

    .item-price {
      color: #666;
      margin-bottom: 12px;
    }

    .excursions {
      margin-bottom: 12px;
    }

    .excursions h4 {
      font-size: 0.9rem;
      margin-bottom: 6px;
      color: #333;
    }

    .excursions ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .excursions li {
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 4px;
    }

    .item-total {
      font-size: 1.1rem;
      color: #667eea;
    }

    .remove-btn {
      position: absolute;
      top: 16px;
      right: 16px;
      padding: 8px 16px;
      font-size: 0.9rem;
    }

    .cart-summary {
      margin-top: 30px;
      padding: 24px;
    }

    .cart-summary h3 {
      margin-bottom: 16px;
      color: #333;
    }

    .summary-line {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      color: #666;
    }

    .summary-total {
      display: flex;
      justify-content: space-between;
      font-size: 1.2rem;
      margin-bottom: 20px;
      padding-top: 12px;
      border-top: 2px solid #e9ecef;
      color: #333;
    }

    .checkout-btn {
      width: 100%;
      padding: 16px;
      font-size: 1.1rem;
    }

    @media (max-width: 768px) {
      .cart-item {
        flex-direction: column;
      }
      
      .item-image {
        width: 100%;
        height: 200px;
      }
      
      .remove-btn {
        position: static;
        margin-top: 12px;
        width: 100%;
      }
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  removeFromCart(vacationId: number) {
    this.cartService.removeFromCart(vacationId);
  }

  getItemTotal(item: CartItem): number {
    const vacationPrice = item.vacation.travel_fare_price;
    const excursionsPrice = item.excursions.reduce((sum, exc) => sum + exc.excursion_price, 0);
    return vacationPrice + excursionsPrice;
  }
}