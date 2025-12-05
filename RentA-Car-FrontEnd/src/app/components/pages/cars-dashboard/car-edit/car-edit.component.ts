// src/app/components/car/car.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  dataLoaded: boolean = false;
  imageUrl: string = "https://localhost:44388";
  carFilter: string = "";
  errorMessage: string = "";

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["brandId"] && params["colorId"]) {
        this.getCarsBySelect(params["brandId"], params["colorId"]);
      } else if (params["colorId"]) {
        this.getCarsByColor(params["colorId"]);
      } else if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"]);
      } else {
        this.getCars();
      }
    });
  }

  getCars() {
    this.dataLoaded = false;
    this.carService.getCars().subscribe(
      response => {
        if (response.data && response.data.length > 0) {
          this.cars = response.data;
          this.dataLoaded = true;
          this.errorMessage = "";
        } else {
          this.cars = [];
          this.dataLoaded = true;
          this.errorMessage = "No cars available";
        }
      },
      error => {
        console.error('Error fetching cars:', error);
        this.dataLoaded = true;
        this.errorMessage = "Error loading cars. Please try again.";
      }
    );
  }

  getCarsByBrand(brandId: number) {
    this.dataLoaded = false;
    this.carService.getCarsByBrand(brandId).subscribe(
      response => {
        if (response.data) {
          this.cars = response.data;
          this.dataLoaded = true;
          this.errorMessage = "";
        }
      },
      error => {
        console.error('Error fetching cars by brand:', error);
        this.dataLoaded = true;
        this.errorMessage = "Error loading cars.";
      }
    );
  }

  getCarsByColor(colorId: number) {
    this.dataLoaded = false;
    this.carService.getCarsByColor(colorId).subscribe(
      response => {
        if (response.data) {
          this.cars = response.data;
          this.dataLoaded = true;
          this.errorMessage = "";
        }
      },
      error => {
        console.error('Error fetching cars by color:', error);
        this.dataLoaded = true;
        this.errorMessage = "Error loading cars.";
      }
    );
  }

  getCarsBySelect(brandId: number, colorId: number) {
    this.dataLoaded = false;
    this.carService.getCarsBySelect(brandId, colorId).subscribe(
      response => {
        if (response.data) {
          this.cars = response.data;
          this.dataLoaded = true;
          this.errorMessage = "";
        }
      },
      error => {
        console.error('Error fetching cars by filter:', error);
        this.dataLoaded = true;
        this.errorMessage = "Error loading cars.";
      }
    );
  }
}