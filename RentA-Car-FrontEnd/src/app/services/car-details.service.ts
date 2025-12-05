import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CarDetailsService {
  apiUrl="https://localhost:44388/api/";
  constructor(private httpClient:HttpClient) { this.apiUrl = environment.apiUrl;}

  getCarDetail(carId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath =this.apiUrl+"cars/getcardetail?carId="+carId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }
}
