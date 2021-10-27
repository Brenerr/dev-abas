import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Bank } from 'src/app/core/models/Bank';


const DATA: Bank[] = [
  {ispb: "00000000", name: "BCO DO BRASIL S.A.", code: 1, fullName: "Banco do Brasil S.A."},
  {ispb: "00000000", name: "BCO DO BRASIL S.A.", code: 1, fullName: "Banco do Brasil S.A."},
  {ispb: "00000000", name: "BCO DO BRASIL S.A.", code: 1, fullName: "Banco do Brasil S.A."},
];

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  displayedColumns: string[] = ['ispb', 'name', 'code', 'fullName'];
  dataSource: MatTableDataSource<Bank>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    const users = DATA
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
