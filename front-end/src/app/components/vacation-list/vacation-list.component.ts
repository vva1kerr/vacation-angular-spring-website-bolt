import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VacationService } from '../../services/vacation.service';
import { CartService } from '../../services/cart.service';
import { Vacation, Excursion } from '../../models/vacation.model';

@Component({
  selector: 'app-vacation-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="vacation-list">
      <h2>Available Vacation Packages</h2>
      
      <div class="loading" *ngIf="loading">
        <div class="spinner"></div>
      </div>

      <div class="grid grid-2" *ngIf="!loading">
        <div class="card vacation-card" *ngFor="let vacation of vacations">
          <div class="vacation-image">
            <img [src]="vacation.image_url" [alt]="vacation.vacation_title" />
          </div>
          
          <div class="vacation-content">
            <h3>{{ vacation.vacation_title }}</h3>
            <p class="description">{{ vacation.description }}</p>
            <div class="price">\${{ vacation.travel_fare_price | number:'1.2-2' }}</div>
            
            <div class="excursions-section" *ngIf="vacation.excursions && vacation.excursions.length > 0">
              <h4>Available Excursions:</h4>
              <div class="excursions-list">
                <div class="excursion-item" *ngFor="let excursion of vacation.excursions">
                  <label class="excursion-checkbox">
                    <input 
                      type="checkbox" 
                      [value]="excursion.excursion_id"
                      (change)="onExcursionChange(vacation.vacation_id, excursion, $event)"
                    />
                    <span class="checkmark"></span>
                    <div class="excursion-details">
                      <span class="excursion-title">{{ excursion.excursion_title }}</span>
                      <span class="excursion-price">\${{ excursion.excursion_price | number:'1.2-2' }}</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            
            <button 
              class="btn btn-primary add-to-cart-btn"
              (click)="addToCart(vacation)"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .vacation-list {
      padding: 20px;
    }

    .vacation-list h2 {
      text-align: center;
      color: white;
      margin-bottom: 30px;
      font-size: 2.5rem;
      font-weight: 700;
    }

    .vacation-card {
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .vacation-image {
      width: 100%;
      height: 250px;
      overflow: hidden;
      margin-bottom: 20px;
    }

    .vacation-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .vacation-card:hover .vacation-image img {
      transform: scale(1.05);
    }

    .vacation-content h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 12px;
      color: #333;
    }

    .description {
      color: #666;
      margin-bottom: 16px;
      line-height: 1.6;
    }

    .price {
      font-size: 1.8rem;
      font-weight: 700;
      color: #667eea;
      margin-bottom: 20px;
    }

    .excursions-section {
      margin-bottom: 24px;
      padding: 16px;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .excursions-section h4 {
      margin-bottom: 12px;
      color: #333;
      font-size: 1.1rem;
    }

    .excursions-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .excursion-item {
      display: flex;
      align-items: center;
    }

    .excursion-checkbox {
      display: flex;
      align-items: center;
      cursor: pointer;
      width: 100%;
    }

    .excursion-checkbox input[type="checkbox"] {
      margin-right: 12px;
      transform: scale(1.2);
    }

    .excursion-details {
      display: flex;
      justify-content: space-between;
      width: 100%;
      align-items: center;
    }

    .excursion-title {
      font-weight: 500;
      color: #333;
    }

    .excursion-price {
      font-weight: 600;
      color: #667eea;
    }

    .add-to-cart-btn {
      width: 100%;
      margin-top: 16px;
    }

    @media (max-width: 768px) {
      .vacation-list h2 {
        font-size: 2rem;
      }
      
      .vacation-image {
        height: 200px;
      }
    }
  `]
})
export class VacationListComponent implements OnInit {
  vacations: Vacation[] = [];
  loading = true;
  selectedExcursions: { [vacationId: number]: Excursion[] } = {};

  constructor(
    private vacationService: VacationService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadVacations();
  }

  loadVacations() {
    this.vacationService.getVacations().subscribe({
      next: (vacations) => {
        this.vacations = vacations;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading vacations:', error);
        this.loading = false;
      }
    });
  }

  onExcursionChange(vacationId: number, excursion: Excursion, event: any) {
    if (!this.selectedExcursions[vacationId]) {
      this.selectedExcursions[vacationId] = [];
    }

    if (event.target.checked) {
      this.selectedExcursions[vacationId].push(excursion);
    } else {
      this.selectedExcursions[vacationId] = this.selectedExcursions[vacationId]
        .filter(exc => exc.excursion_id !== excursion.excursion_id);
    }
  }

  addToCart(vacation: Vacation) {
    const selectedExcursions = this.selectedExcursions[vacation.vacation_id] || [];
    this.cartService.addToCart(vacation, selectedExcursions);
    
    // Show success message or notification
    alert(`${vacation.vacation_title} added to cart with ${selectedExcursions.length} excursions!`);
  }
}