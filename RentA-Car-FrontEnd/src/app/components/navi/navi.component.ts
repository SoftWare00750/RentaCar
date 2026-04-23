import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  get lastName() { return this.authService.name; }
  get firstName() { return this.authService.surname; }
  get userRol() { return this.authService.role; }

  constructor(
    private authService: AuthService,
    private toasterService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.isAuthenticated()) {
      this.authService.userDetailFromToken();
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  checkAdminRole(): boolean {
    const role = this.authService.role;
    if (Array.isArray(role)) return role.includes('admin');
    return role === 'admin';
  }

  checkUserRole(): boolean {
    return this.authService.role === 'user';
  }

  logout() {
    this.authService.logout();
    this.toasterService.success('Logged out successfully', 'Success');
  }
}