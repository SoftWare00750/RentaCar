import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;
  dataLoaded: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toasterService: ToastrService,
    private router: Router,
  ) {}

  get f() { return this.registerForm.controls; }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register() {
    this.submitted = true;
    if (this.registerForm.valid) {
      const registerModel = Object.assign({}, this.registerForm.value);
      this.authService.register(registerModel).subscribe(
        response => {
          this.toasterService.success(response.message, 'Success');
          // Auto-login after registration
          localStorage.setItem('token', response.data.token);
          this.authService.userDetailFromToken();
          this.dataLoaded = true;
          this.router.navigate(['/home']);
        },
        responseError => {
          const msg = responseError.error?.message || responseError.error || 'Registration failed';
          this.toasterService.error(msg, 'Error!');
        }
      );
    } else {
      this.toasterService.error('Please fill in all fields', 'Attention!');
    }
  }
}