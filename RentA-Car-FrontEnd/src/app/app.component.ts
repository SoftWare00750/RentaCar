import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
   apiUrl="https://localhost:44388/api/";
  title = 'RentACar-FrontEnd';
  
  
constructor(private httpClient: HttpClient) {
  this.apiUrl = environment.apiUrl;
}

}
