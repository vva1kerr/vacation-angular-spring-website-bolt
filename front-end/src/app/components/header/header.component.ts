import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <h1>TravelAgency</h1>
          </div>
          
          <nav class="navigation">
            <button class="nav-btn" (click)="setActiveView('vacations')" [class.active]="activeView === 'vacations'">
              Vacations
            </button>
            <button class="nav-btn" (click)="setActiveView('cart')" [class.active]="activeView === 'cart'">
              Cart ({{ cartItemCount }})
            </button>
            <button class="nav-btn" (click)="setActiveView('checkout')" [class.active]="activeView === 'checkout'">
              Checkout
            </button>
          </nav>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding: 16px 0;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo h1 {
      color: white;
      font-size: 1.8rem;
      font-weight: 700;
      margin: 0;
    }

    .navigation {
      display: flex;
      gap: 16px;
    }

    .nav-btn {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.3);
      padding: 10px 20px;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .nav-btn:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-2px);
    }

    .nav-btn.active {
      background: white;
      color: #667eea;
      border-color: white;
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 16px;
      }
      
      .navigation {
        flex-wrap: wrap;
        justify-content: center;
      }
      
      .nav-btn {
        padding: 8px 16px;
        font-size: 0.9rem;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  cartItemCount = 0;
  activeView = 'vacations';

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItemCount = items.length;
    });
  }

  setActiveView(view: string) {
    this.activeView = view;
    // Emit event to parent component to change view
    // This would typically use a service or event emitter
  }
}