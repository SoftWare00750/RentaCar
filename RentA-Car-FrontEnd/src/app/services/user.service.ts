import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';  // ✅ Make sure this is imported
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://localhost:44388/api/';
  
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl; 
  }

  getbyid(userId: number): Observable<SingleResponseModel<User>> {  // ✅ Fixed: User type specified
    let newPath = this.apiUrl + "users/getbyid?userId=" + userId;  // ✅ Fixed typo: getbyıd → getbyid
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  updateInfos(user: User): Observable<ResponseModel> {
    let newPath = this.apiUrl + "users/updated";
    return this.httpClient.put<ResponseModel>(newPath, user);
  }
}