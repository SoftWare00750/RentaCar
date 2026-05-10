import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { PasswordChangeModel } from '../models/passwordChangeModel';
import { RegisterModel } from '../models/register';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string;
  name: string = "";
  surname: string = "";
  userName: string = "";
  role: any;
  roles: any[] = [];
  token: any;
  isLoggedIn: boolean = false;
  userId: number;
  email: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private localStorage: LocalStorageService
  ) {
    this.apiUrl = environment.apiUrl;
  }

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      this.apiUrl + 'auth/login', loginModel
    );
  }

  register(registerModel: RegisterModel): Observable<SingleResponseModel<TokenModel>> {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      this.apiUrl + 'auth/register', registerModel
    );
  }

  changePassword(passwordChangeModel: PasswordChangeModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'auth/changepassword', passwordChangeModel
    );
  }

  logout() {
    this.localStorage.clear();
    this.onRefresh();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.localStorage.getItem('token');
  }

  userDetailFromToken() {
    this.token = this.localStorage.getItem('token');
    let decodedToken = this.jwtHelper.decodeToken(this.token);
    let name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.name = name.split(' ')[0];
    this.surname = name.split(' ')[1] || '';
    this.roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.userId = parseInt(
      decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
    );
    this.email = decodedToken['email'];
    this.userName = this.name + ' ' + this.surname;
  }

  roleCheck(roleList: string[]): boolean {
    if (this.roles !== null) {
      return roleList.some(role => this.roles.includes(role));
    }
    return false;
  }

  async onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    const currentUrl = this.router.url + '?';
    return this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false;
      this.router.navigate([this.router.url]);
    });
  }

  getCurrentUserId(): number {
    return this.userId;
  }
}