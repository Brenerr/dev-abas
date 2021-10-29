import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingComponent } from 'src/app/utils/dialog/loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  dialogLoading: MatDialogRef<LoadingComponent> | undefined;

  constructor(private dialog: MatDialog) { }

  intercept(req: HttpRequest<any>, next: HttpHandler,) {

    if (req.url.includes('http')) {
      if (!this.dialogLoading) {
        this.dialogLoading = this.dialog.open(LoadingComponent, {
          disableClose: true,
          panelClass: 'loading-dialog-container'
        })
      }
    }

    return next.handle(req).pipe(
      finalize(() => {
        if (req.url.includes('http')) {
          setTimeout(() => {
            if (this.dialogLoading) {
              this.dialogLoading.close();
              this.dialogLoading = undefined;
            }
          }, 500);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}
