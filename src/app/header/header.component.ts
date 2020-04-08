import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { PageControllerService } from '../shared/services/page-controller.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isSideMenuOpen = false;
  isSticky = false;
  private sideNavTimeout = 5000;
  private sideNavTimeoutFn;
  private scrollToTimeout = 500;
  private closeTimeout = 3000;
  private closeTimeoutFn;

  constructor(private pageCtrlService: PageControllerService) { }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
  doSomething(event) {
    this.isSticky = window.pageYOffset > 20;
  }

  toggleSideNav() {
    this.isSideMenuOpen = !this.isSideMenuOpen;

    this.startTimer();
  }

  startTimer (timeout?) {
    if (this.isSideMenuOpen) {
      this.clearTimer();
      this.sideNavTimeoutFn = setTimeout(() => {
        this.isSideMenuOpen = false;
      }, timeout || this.sideNavTimeout);
    }
  }

  scrollTo(section: string, timeout: number = 0) {
    this.pageCtrlService.scrollTo(section, timeout, section === 'home' ? 0 : undefined);
  }

  clearTimer () {
    clearTimeout(this.sideNavTimeoutFn);
  }
}
