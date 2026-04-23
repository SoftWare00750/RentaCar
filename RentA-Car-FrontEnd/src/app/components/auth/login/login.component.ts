import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  dataLoaded: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toasterService: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        response => {
          this.toasterService.success(response.message, 'Success');
          localStorage.setItem('token', response.data.token);
          this.authService.userDetailFromToken();
          this.dataLoaded = true;
          this.router.navigate(['/home']);
        },
        responseError => {
          const msg = responseError.error?.message || responseError.error || 'Login failed';
          this.toasterService.error(msg, 'Error!');
        }
      );
    } else {
      this.toasterService.error('Please fill in all fields', 'Attention!');
    }
  }
}