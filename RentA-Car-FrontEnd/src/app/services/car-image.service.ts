import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = 'https://localhost:44388/api/';

  constructor(private httpClient: HttpClient) {this.apiUrl = environment.apiUrl; }

  getCarImages(carId:number):Observable<ListResponseModel<CarImage>>{
    return this.httpClient.get<ListResponseModel<CarImage>>(this.apiUrl + 'carImages/getimagesbycarid?carId=' + carId)
  }

  deleteImages(carImage: CarImage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'carImages/delete', carImage
    );
  }
}
