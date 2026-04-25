import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { DashboardCars } from '../models/dashboard-cars';
import { CarStandart } from '../models/carStandart';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl + 'cars/getcardetails');
  }

  getById(carId: number): Observable<SingleResponseModel<Car>> {
    return this.httpClient.get<SingleResponseModel<Car>>(this.apiUrl + 'cars/getbyid?carId=' + carId);
  }

  addCar(car: CarStandart): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'cars/add', car);
  }

  updateCar(car: CarStandart): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'cars/update', car);
  }

  deletCar(car: CarStandart): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'cars/delete', car);
  }

  // Fix: use correct backend endpoint
  getCarsByBrand(brandId: number): Observable<ListResponseModel<Car>> {
    return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl + 'cars/getcarsbybrandid?brandId=' + brandId);
  }

  // Fix: use correct backend endpoint
  getCarsByColor(colorId: number): Observable<ListResponseModel<Car>> {
    return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl + 'cars/getcarsbycolorid?colorId=' + colorId);
  }

  // Fix: use correct backend endpoint
  getCarsBySelect(brandId: number, colorId: number): Observable<ListResponseModel<Car>> {
    return this.httpClient.get<ListResponseModel<Car>>(
      this.apiUrl + 'cars/getcarsbybrandandcolorid?brandId=' + brandId + '&colorId=' + colorId
    );
  }

  getCarDetail(carId: number): Observable<ListResponseModel<Car>> {
    return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl + 'cars/getcardetail/' + carId);
  }

  // Fix: use correct backend endpoint
  getAllCarDetail(): Observable<ListResponseModel<DashboardCars>> {
    return this.httpClient.get<ListResponseModel<DashboardCars>>(this.apiUrl + 'cars/getcardetails');
  }
}