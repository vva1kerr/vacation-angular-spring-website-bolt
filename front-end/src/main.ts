import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './app/components/header/header.component';
import { VacationListComponent } from './app/components/vacation-list/vacation-list.component';
import { CartComponent } from './app/components/cart/cart.component';
import { CheckoutComponent } from './app/components/checkout/checkout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    VacationListComponent,
    CartComponent,
    CheckoutComponent
  ],
  template: `
    <div class="app">
      <app-header></app-header>
      
      <main class="main-content">
        <div class="container">
          <app-vacation-list *ngIf="activeView === 'vacations'"></app-vacation-list>
          <app-cart *ngIf="activeView === 'cart'"></app-cart>
          <app-checkout *ngIf="activeView === 'checkout'"></app-checkout>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .app {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .main-content {
      flex: 1;
      padding: 40px 0;
    }

    @media (max-width: 768px) {
      .main-content {
        padding: 20px 0;
      }
    }
  `]
})
export class App implements OnInit {
  activeView = 'vacations';

  ngOnInit() {
    // Listen for navigation events
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('nav-btn')) {
        const view = target.textContent?.toLowerCase().split(' ')[0] || 'vacations';
        this.activeView = view;
      }
    });
  }
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient()
  ]
});