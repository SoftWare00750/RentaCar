import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getbyid(userId: number): Observable<SingleResponseModel<User>> {
    return this.httpClient.get<SingleResponseModel<User>>(this.apiUrl + 'users/getbyid?userId=' + userId);
  }

  updateInfos(user: User): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl + 'users/updated', user);
  }
}