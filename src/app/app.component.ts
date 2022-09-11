import { Component, AfterViewInit, ViewChild} from '@angular/core';

import { initializeApp } from "firebase/app";
import { gsap } from 'gsap';

import { LoadingScreenComponent } from './shared/loading-screen/loading-screen.component';
import { PageControllerService } from './shared/services/page-controller.service';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor (private pageCtrlService: PageControllerService) {}

  isLoading = true;
  @ViewChild('loadingComponent') loading: LoadingScreenComponent;
  @ViewChild('home') homeSection: HomeComponent;
  @ViewChild('about') aboutSection: AboutComponent;
  @ViewChild('services') servicesSection: ServicesComponent;
  @ViewChild('contact') contactSection: ContactComponent;

  ngOnInt() {
    initializeApp({
      apiKey: environment.apiKey,
      authDomain: environment.authDomain,
      projectId: environment.projectId,
    });
  }

  ngAfterViewInit() {
    if (this._window().isEdge) {
      return alert('browser not supported');
    }
    this._window().scrollTo(0, 1);
    this.setupComponentSection();
    setTimeout(() => {
      this.isLoading = false;
      gsap.to(this.loading.container.nativeElement, { duration: 0.5, x: '-100%'}).play();
      this.pageCtrlService.screenLoad.next(true);
    }, 500);
  }

  setupComponentSection(event?: any) {
    this.pageCtrlService.setPageSection('home', this.homeSection.container, 0);
    this.pageCtrlService.setPageSection('about', this.aboutSection.container, -30);
    this.pageCtrlService.setPageSection('services', this.servicesSection.container, -30);
    this.pageCtrlService.setPageSection('contact', this.contactSection.container, -10);
  }

  _window(): any {
    return window;
  }
}
