import { Component, HostListener, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  isNavigationBarOpen: boolean = false;
  screenWidth: number;

  constructor() {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth > 808) {
      this.isNavigationBarOpen = true;
    } else {
      console.log('here')
      this.isNavigationBarOpen = false;
    }
  }

  ngOnInit() {
  }

  toggleNavigationBar() {
    this.isNavigationBarOpen = !this.isNavigationBarOpen;
  }
}
