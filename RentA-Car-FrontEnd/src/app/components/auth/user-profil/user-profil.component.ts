import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  user: User;
  lastName = this.authService.name;
  firstName = this.authService.surname;
  email = this.authService.email;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createUserForm();
    this.getUser();
  }

  createUserForm() {
    this.userForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: ['']
    });
  }

  getUser() {
    if (!this.authService.userId) return;
    this.userService.getbyid(this.authService.userId).subscribe(
      response => {
        this.user = response.data;
        if (this.user) {
          this.userForm.patchValue({
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email
          });
        }
      },
      error => {
        // Silently fail - user profile may not be available
        console.warn('Could not load user profile:', error);
      }
    );
  }
}