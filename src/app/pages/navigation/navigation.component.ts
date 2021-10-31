import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  scrollY: number = 0;
  aux: number = 0;
  show: boolean = true;

  @HostListener('window:scroll') onWindowScroll() {
    this.aux = this.scrollY;
    this.scrollY = window.scrollY;
    this.show = this.scrollY - this.aux <= 0 ? true : false;
  }

  constructor() { }

  ngOnInit(): void {
  }



}
