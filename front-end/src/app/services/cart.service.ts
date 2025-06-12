import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Vacation, Excursion } from '../models/vacation.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  
  cart$ = this.cartSubject.asObservable();

  addToCart(vacation: Vacation, selectedExcursions: Excursion[] = []) {
    const existingItem = this.cartItems.find(item => item.vacation.vacation_id === vacation.vacation_id);
    
    if (existingItem) {
      // Update excursions for existing vacation
      existingItem.excursions = selectedExcursions;
    } else {
      // Add new vacation to cart
      this.cartItems.push({
        vacation,
        excursions: selectedExcursions
      });
    }
    
    this.cartSubject.next([...this.cartItems]);
  }

  removeFromCart(vacationId: number) {
    this.cartItems = this.cartItems.filter(item => item.vacation.vacation_id !== vacationId);
    this.cartSubject.next([...this.cartItems]);
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next([]);
  }

  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      const vacationPrice = item.vacation.travel_fare_price;
      const excursionsPrice = item.excursions.reduce((sum, exc) => sum + exc.excursion_price, 0);
      return total + vacationPrice + excursionsPrice;
    }, 0);
  }

  getItemCount(): number {
    return this.cartItems.length;
  }
}