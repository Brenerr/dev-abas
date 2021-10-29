import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Account } from 'src/app/core/models/Account';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  listAccounts: Account[] = [];
  displayedColumns: string[] = ['bankCode', 'agency', 'accountCode', 'remove'];
  dataSource: MatTableDataSource<Account>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getAllAccounts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllAccounts(){
    this.listAccounts = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')!) : [];
    this.dataSource = new MatTableDataSource(this.listAccounts);
  }

  removeAccount(account: Account) {
    this.listAccounts = this.listAccounts.filter(item => item.accountCode !== account.accountCode);
    localStorage.setItem('account', JSON.stringify(this.listAccounts));
    this.getAllAccounts();
  }

}
