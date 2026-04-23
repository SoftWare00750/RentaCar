import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Let components handle 400 (validation) and 401 (auth) errors themselves
        if (error.status === 400 || error.status === 401) {
          return throwError(() => error);
        }

        if (error.status === 403) {
          this.toastr.error('You are not authorized to perform this action', 'Unauthorized');
          return throwError(() => error);
        }

        if (error.status === 404) {
          // Silently pass 404s - they're handled per-service
          return throwError(() => error);
        }

        if (error.status === 0) {
          this.toastr.error('Cannot connect to server. Please check your connection.', 'Connection Error');
        } else if (error.status >= 500) {
          this.toastr.error('Server error. Please try again later.', 'Server Error');
        }

        return throwError(() => error);
      })
    );
  }
}