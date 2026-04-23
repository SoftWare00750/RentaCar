import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getRental(): Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl + 'rentals/getallrentaldto');
  }

  addRental(rental: Rental): void {
    this.httpClient.post(this.apiUrl + 'rentals/add', rental).subscribe({
      error: (err) => console.error('Rental add error:', err)
    });
  }

  isRentable(rental: Rental): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'rentals/isrentable', rental);
  }
}