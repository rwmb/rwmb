import { Component, OnInit, AfterViewInit, ViewEncapsulation, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { TweenLite, TweenMax } from 'gsap';

import { OutlineProfileComponent } from './svg/outline-profile/outline-profile.component';
import { PirateComponent } from './svg/pirate/pirate.component';
import { BunnyComponent } from './svg/bunny/bunny.component';
import { DiverComponent } from './svg/diver/diver.component';
import { InsectComponent } from './svg/insect/insect.component';
import { drawFigure } from '../shared/util/svg-drawing-tool.util';
import { PageControllerService } from '../shared/services/page-controller.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnDestroy, AfterViewInit {
  @ViewChild('container') container: ElementRef;
  @ViewChild('aboutText') aboutText: ElementRef;
  @ViewChild('aboutImage') image: ElementRef;
  @ViewChild('pirate') pirate: PirateComponent;
  @ViewChild('bunny') bunny: BunnyComponent;
  @ViewChild('diver') diver: DiverComponent;
  @ViewChild('insect') insect: InsectComponent;
  private subscriptions: Subscription[] = [];
  showText = false;

  constructor(private pageCtrlService: PageControllerService) { }

  ngAfterViewInit() {
    this.initializeImages();
    const subscription = this.pageCtrlService.screenLoad.subscribe(() => {
      this.setDrawingCallback();
      subscription.unsubscribe();
    });
    this.subscriptions.push(subscription);
  }

  initializeImages() {
    TweenLite.to(this.image.nativeElement, 0.1, {opacity: 0});
    TweenLite.to('outline-profile', 0.1, {opacity: 0});
  }

  setDrawingCallback() {
    const subscription  = this.pageCtrlService.onScrollDown('about', -100).subscribe(() => {
      this.showPicture();
      this.showText = true;
      subscription.unsubscribe();
    });
    this.subscriptions.push(subscription);
  }

  showPicture() {
    TweenLite.to('outline-profile', 0.2, {opacity: 1});
    drawFigure('.outline-profile', 2, 0.1).then(() => {
      TweenLite.fromTo(this.image.nativeElement, 0.5, {opacity: 0}, {opacity: 1, delay: 0.25});
      TweenLite.to('outline-profile', 0.5, {opacity: 0, delay: 0.25});
    });
  }

  getAge() {
    const today = new Date().getTime();
    const birthday = new Date('02/08/1994').getTime();
    const age = new Date(today - birthday).getUTCFullYear();
    return (age - 1970);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
