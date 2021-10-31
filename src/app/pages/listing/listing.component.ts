import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Bank } from 'src/app/core/models/Bank';
import { BankService } from 'src/app/core/services/bank/bank.service';
import { RegistrationComponent } from './registration/registration.component';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  code: string = '';
  displayedColumns: string[] = ['ispb', 'name', 'code', 'fullName'];
  dataSource: MatTableDataSource<Bank>;

  focusSearch: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private bankService: BankService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getAllBanks();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(bank: Bank) {
    const dialogRef = this.dialog.open(RegistrationComponent, {
      disableClose: true,
      panelClass: 'custom-dialog-container',
      maxWidth: '90vw',
      data: {
        bank
      }
    });
  }

  getAllBanks() {
    this.bankService.getAll().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    }, err => {
      alert(err.error.message);
    });
  }

  searchCode() {
    if(this.code === '' || this.code === null) {
      this.getAllBanks();
    }
    else {
      this.bankService.getByCode(this.code).subscribe(res => {
        this.dataSource = new MatTableDataSource([res]);
        this.dataSource.paginator = this.paginator;
      }, err => {
        alert("Código não encontrado!");
        this.code = '';
        this.getAllBanks();
      });
    }
  }

}
