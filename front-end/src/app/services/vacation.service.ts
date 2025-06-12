import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Vacation, Excursion, PurchaseData, PurchaseResponse, Country, Division } from '../models/vacation.model';

@Injectable({
  providedIn: 'root'
})
export class VacationService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getVacations(): Observable<Vacation[]> {
    // Mock data for development - replace with actual API call when backend is ready
    const mockVacations: Vacation[] = [
      {
        vacation_id: 1,
        vacation_title: 'Tropical Paradise Getaway',
        description: 'Experience the ultimate tropical paradise with pristine beaches, crystal-clear waters, and luxurious accommodations.',
        travel_fare_price: 1299.99,
        image_url: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800',
        create_date: new Date(),
        last_update: new Date(),
        excursions: [
          {
            excursion_id: 1,
            excursion_title: 'Snorkeling Adventure',
            excursion_price: 89.99,
            image_url: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400',
            create_date: new Date(),
            last_update: new Date(),
            vacation_id: 1
          },
          {
            excursion_id: 2,
            excursion_title: 'Sunset Cruise',
            excursion_price: 129.99,
            image_url: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400',
            create_date: new Date(),
            last_update: new Date(),
            vacation_id: 1
          }
        ]
      },
      {
        vacation_id: 2,
        vacation_title: 'Mountain Adventure Retreat',
        description: 'Discover breathtaking mountain landscapes, hiking trails, and cozy lodges in this unforgettable adventure.',
        travel_fare_price: 899.99,
        image_url: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
        create_date: new Date(),
        last_update: new Date(),
        excursions: [
          {
            excursion_id: 3,
            excursion_title: 'Guided Hiking Tour',
            excursion_price: 79.99,
            image_url: 'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=400',
            create_date: new Date(),
            last_update: new Date(),
            vacation_id: 2
          },
          {
            excursion_id: 4,
            excursion_title: 'Rock Climbing Experience',
            excursion_price: 149.99,
            image_url: 'https://images.pexels.com/photos/449609/pexels-photo-449609.jpeg?auto=compress&cs=tinysrgb&w=400',
            create_date: new Date(),
            last_update: new Date(),
            vacation_id: 2
          }
        ]
      },
      {
        vacation_id: 3,
        vacation_title: 'European City Explorer',
        description: 'Immerse yourself in rich history, stunning architecture, and vibrant culture across multiple European cities.',
        travel_fare_price: 2199.99,
        image_url: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=800',
        create_date: new Date(),
        last_update: new Date(),
        excursions: [
          {
            excursion_id: 5,
            excursion_title: 'Museum Tour',
            excursion_price: 59.99,
            image_url: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400',
            create_date: new Date(),
            last_update: new Date(),
            vacation_id: 3
          },
          {
            excursion_id: 6,
            excursion_title: 'Food & Wine Tasting',
            excursion_price: 189.99,
            image_url: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=400',
            create_date: new Date(),
            last_update: new Date(),
            vacation_id: 3
          }
        ]
      }
    ];

    return of(mockVacations);
    // Uncomment when backend is ready:
    // return this.http.get<Vacation[]>(`${this.baseUrl}/vacations`);
  }

  getCountries(): Observable<Country[]> {
    // Mock data - replace with actual API call
    const mockCountries: Country[] = [
      { country_id: 1, country: 'United States', create_date: new Date(), last_update: new Date() },
      { country_id: 2, country: 'Canada', create_date: new Date(), last_update: new Date() },
      { country_id: 3, country: 'United Kingdom', create_date: new Date(), last_update: new Date() }
    ];
    return of(mockCountries);
    // return this.http.get<Country[]>(`${this.baseUrl}/countries`);
  }

  getDivisionsByCountry(countryId: number): Observable<Division[]> {
    // Mock data - replace with actual API call
    const mockDivisions: Division[] = [
      { division_id: 1, division: 'California', create_date: new Date(), last_update: new Date(), country_id: 1 },
      { division_id: 2, division: 'New York', create_date: new Date(), last_update: new Date(), country_id: 1 },
      { division_id: 3, division: 'Ontario', create_date: new Date(), last_update: new Date(), country_id: 2 }
    ];
    return of(mockDivisions.filter(d => d.country_id === countryId));
    // return this.http.get<Division[]>(`${this.baseUrl}/divisions/search/findByCountryId?countryId=${countryId}`);
  }

  checkout(purchaseData: PurchaseData): Observable<PurchaseResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // Mock response for development
    const mockResponse: PurchaseResponse = {
      orderTrackingNumber: 'TRK-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    };

    return of(mockResponse);
    // Uncomment when backend is ready:
    // return this.http.post<PurchaseResponse>(`${this.baseUrl}/checkout/purchase`, purchaseData, httpOptions);
  }
}