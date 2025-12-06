import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { CreditCardComponent } from './components/creditcard/creditcard.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AdminDashboardComponent } from './components/pages/admin-dashboard/admin-dashboard.component';
import { LoginGuard } from './guards/login.guard';
import { HomeComponent } from './components/home/home/home.component';
import { UserComponent } from './components/auth/user-profil/user-profil.component';
import { UsereditComponent } from './components/auth/user-profil/useredit/useredit.component';

const routes: Routes = [
  { path: "", pathMatch: "full", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "cars", component: CarComponent },
  { path: "cars/brand/:brandId", component: CarComponent },
  { path: "cars/color/:colorId", component: CarComponent },
  { path: "cars/brand/:brandId/color/:colorId", component: CarComponent },
  { path: "car/details/:carId", component: CarDetailComponent },
  { path: "cars/car-detail/:carId", component: CarDetailComponent },
  { path: "cars/filter/:brandId/:colorId", component: CarComponent },
  { path: "car/rental/:carId", component: RentalComponent, canActivate: [LoginGuard] },
  { path: "creditcard/:rental", component: CreditCardComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "user", component: UserComponent,
    children: [
      { path: "edituser", component: UsereditComponent }
    ]
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }