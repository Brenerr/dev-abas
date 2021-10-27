import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Bank } from 'src/app/core/models/Bank';
import { RegistrationComponent } from './registration/registration.component';

const DATA: Bank[] = [
  {ispb: "00000000", name: "BCO DO BRASIL S.A.", code: 1, fullName: "Banco do Brasil S.A."},
  {ispb: "00000000", name: "BCO DO BRASIL S.A.", code: 1, fullName: "Banco do Brasil S.A."},
  {ispb: "00000000", name: "BCO DO BRASIL S.A.", code: 1, fullName: "Banco do Brasil S.A."},
];

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  displayedColumns: string[] = ['ispb', 'name', 'code', 'fullName'];
  dataSource: MatTableDataSource<Bank>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog) {
    const users = DATA
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(bank: any) {
    const dialogRef = this.dialog.open(RegistrationComponent, {
      disableClose: true,
      panelClass: 'custom-dialog-container',
      maxWidth: '90vw',
      data: {
        bank
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      // this.getAll();
    });
  }

}
