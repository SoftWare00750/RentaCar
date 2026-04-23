export interface DashboardCars {
  carId: number;
  carName: string;
  brandName: string;
  colorName: string;
  dailyPrice: number;
  modelYear: string;
  description: string;
  brandId?: number;
  colorId?: number;
  imagePath?: string;
}